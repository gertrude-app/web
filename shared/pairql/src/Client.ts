import { type PqlError, type ServerPqlError, isPqlError, toClientError } from './PqlError';
import Result from './Result';

export interface ClientConfig {
  /** Function to get the API endpoint URL */
  getEndpoint: () => string;
  /** PairQL domain name (e.g., 'dashboard', 'admin') */
  domain: string;
  /** Function to get the auth token, if any */
  getToken?: () => string | undefined;
  /** Header name for auth token (default: 'X-AdminToken') */
  authHeader?: string;
  /** Extra headers to include with each request */
  extraHeaders?: () => Record<string, string>;
  /** Whether to log errors to console (default: true in non-prod) */
  logErrors?: boolean;
}

export default abstract class Client {
  protected config: ClientConfig;

  protected constructor(config: ClientConfig) {
    this.config = {
      authHeader: `X-AdminToken`,
      logErrors: true,
      ...config,
    };
  }

  protected async query<Output>(
    input: unknown,
    operation: string,
  ): Promise<Result<Output, PqlError>> {
    const headers: Record<string, string> = { 'Content-Type': `application/json` };

    if (this.config.getToken) {
      const token = this.config.getToken();
      if (token && this.config.authHeader) {
        headers[this.config.authHeader] = token;
      }
    }

    if (this.config.extraHeaders) {
      Object.assign(headers, this.config.extraHeaders());
    }

    const init: RequestInit = {
      method: `POST`,
      headers,
      body: input === undefined ? undefined : JSON.stringify(input),
    };

    try {
      const endpoint = this.config.getEndpoint();
      const url = `${endpoint}/pairql/${this.config.domain}/${operation}`;
      const res = await fetch(url, init);
      const text = await res.text();
      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch {
        return this.errorResult(`JSON parse error, body=${text}`);
      }
      if (res.status >= 300 || this.isStubbedError(json)) {
        return this.errorResult(json);
      } else {
        return Result.success(json as Output);
      }
    } catch (error) {
      return this.errorResult(error);
    }
  }

  private isStubbedError(json: unknown): boolean {
    return typeof json === `object` && json !== null && `__cyStubbedError` in json;
  }

  protected errorResult(error: unknown): Result<never, PqlError> {
    if (this.config.logErrors) {
      console.error(`PqlError`, error); // eslint-disable-line no-console
    }

    if (isPqlError(error)) {
      return Result.error(error);
    }

    // Handle server error response
    const serverError = error as ServerPqlError;
    if (typeof serverError === `object` && serverError !== null && `id` in serverError) {
      return Result.error(toClientError(serverError));
    }

    // Handle network/unknown errors
    if (`${error}`.includes(`Failed to fetch`)) {
      return Result.error<PqlError>({
        isPqlError: true,
        id: `34fbe3e3`,
        type: `clientError`,
        userMessage: `Something seems funny with the network. Are you sure you're connected to the internet?`,
        debugMessage: String(error),
      });
    }

    return Result.error<PqlError>({
      isPqlError: true,
      id: `b3162834`,
      type: `clientError`,
      debugMessage: `Unexpected error: ${error}`,
      showContactSupport: true,
    });
  }
}
