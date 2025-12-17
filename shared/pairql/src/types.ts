import type { PqlError } from './PqlError';

export type Domain = `dashboard` | `admin`;

/** UUID string type alias */
export type UUID = string;
/** ISO 8601 date string type alias */
export type ISODateString = string;

/**
 * Hook called before each request. Receives the mutable RequestInit (after body is set)
 * and the auth requirement. Mutate init.headers in place to add headers.
 * Return null on success, or a PqlError to abort the request.
 */
export type PrepareRequest<Auth> = (init: RequestInit, auth: Auth) => PqlError | null;

export interface CodegenPair {
  pair: string;
  fetcher: string;
}

export interface CodegenOutput {
  shared: Record<string, string>;
  pairs: Record<string, CodegenPair>;
}
