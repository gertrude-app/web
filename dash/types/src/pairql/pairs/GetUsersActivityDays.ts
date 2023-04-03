// auto-generated, do not edit

export namespace GetUsersActivityDays {
  export type Input = Array<{
    start: string;
    end: string;
  }>;

  export type Output = Array<{
    userId: UUID;
    userName: string;
    days: Array<{
      date: ISODateString;
      numApproved: number;
      totalItems: number;
    }>;
  }>;
}

// change the cy.intercept to match this output
// write a thunk in slice-users to make the getUsersActivityDays request
// handle states of thunk, builder.addCase() stuff
// add a fetchAllActivityOverviews piece to state which is a RequestState
// shove data into state.userActivityOverviews using uuid of each one

// extract datetime helpers out of story helpers and put it in shared/datetime
