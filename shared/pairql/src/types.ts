export type Env = `dev` | `staging` | `prod`;
export type Domain = `dashboard` | `admin`;

export interface DomainConfig {
  domain: Domain;
  clientName: string;
  codegenEndpoint: string;
  authHeader: string;
  getToken: () => string | undefined;
}

export interface CodegenPair {
  pair: string;
  fetcher: string;
}

export interface CodegenOutput {
  shared: Record<string, string>;
  pairs: Record<string, CodegenPair>;
}
