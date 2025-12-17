// auto-generated, do not edit
export type ClientAuth = `none` | `child` | `parent` | `superAdmin`;

export interface ServerPqlError {
  version: number;
  id: string;
  requestId: string;
  type: `notFound` | `badRequest` | `serverError` | `unauthorized` | `loggedOut`;
  userMessage?: string;
  userAction?: string;
  debugMessage: string;
  entityName?: string;
  showContactSupport: boolean;
  dashboardTag?:
    | `magicLinkTokenNotFound`
    | `slackVerificationFailed`
    | `emailAlreadyVerified`;
  appTag?: `userTokenNotFound` | `connectionCodeNotFound` | `iosDeviceTokenNotFound`;
  statusCode: number;
}
