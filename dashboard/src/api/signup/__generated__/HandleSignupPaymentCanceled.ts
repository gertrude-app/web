/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StringInput } from './../../../../../components/src/shared/dashboard/types/GraphQL';

// ====================================================
// GraphQL mutation operation: HandleSignupPaymentCanceled
// ====================================================

export interface HandleSignupPaymentCanceled_response {
  __typename: 'GenericResponse';
  success: boolean;
}

export interface HandleSignupPaymentCanceled {
  response: HandleSignupPaymentCanceled_response;
}

export interface HandleSignupPaymentCanceledVariables {
  input: StringInput;
}
