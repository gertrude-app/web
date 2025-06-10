// auto-generated, do not edit

export namespace ParentOverviews {
  export type Input = void;

  export type Output = Array<{
    email: string;
    numKids: number;
    numKeychains: number;
    numNotifications: number;
    signupDate: ISODateString;
    subscriptionStatus:
      | 'pendingEmailVerification'
      | 'trialing'
      | 'trialExpiringSoon'
      | 'overdue'
      | 'paid'
      | 'unpaid'
      | 'pendingAccountDeletion'
      | 'complimentary';
  }>;
}
