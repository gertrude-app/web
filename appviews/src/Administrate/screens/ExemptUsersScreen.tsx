import { Button } from '@shared/components';
import cx from 'classnames';
import React from 'react';
import type { Failable } from '../../lib/failable';
import type { AppEvent, ExemptableUser } from '../administrate-store';
import ErrorBlock from '../../ErrorBlock';

interface Props {
  users?: Failable<ExemptableUser[]>;
  emit(event: AppEvent): unknown;
}

const ExemptUsersScreen: React.FC<Props> = ({ users, emit }) => {
  if (!users) {
    return null;
  }
  if (users.case === `error`) {
    return (
      <div className="p-6">
        <ErrorBlock
          title="Unexpected error"
          button={{
            text: `Check health`,
            icon: `fa-heart-pulse`,
            action: () => emit({ case: `gotoScreenClicked`, screen: `healthCheck` }),
          }}
        >
          Check health, or contact support if the problem persists.
        </ErrorBlock>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between border-b p-4 border-slate-200 sticky bg-white dark:border-slate-800 dark:bg-slate-900 top-0">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Exempt users
        </h2>
      </header>
      <main className="p-4 flex-grow flex flex-col relative">
        <div className="mr-4">
          <p className="text-slate-500 dark:text-slate-400">
            Gertrude’s network filter has to make decisions about whether to allow or deny
            network requests from every user on this computer. For maximum internet
            safety, it defaults to blocking all requests for users that it doesn’t have
            rules for. If this computer has another user or users who should have
            unrestricted internet access (like a parent’s admin account on a shared
            computer), you can make that user{` `}
            <strong className="text-slate-700 dark:text-slate-200">
              exempt from filtering
            </strong>
            {` `}
            by selecting the user name below.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            <strong className="text-slate-700 dark:text-slate-200">Please note:</strong>
            {` `}
            any user that is exempt from filtering should have a password enabled that is
            unknown to any individual subject to filtering, or else they would be able to
            log in to that user at any time and also have unrestricted internet access.
          </p>
        </div>
        <ul className="mt-4 space-y-1 flex-grow ml-8 mr-16">
          {users.value.map((user) => (
            <ExemptUser
              key={user.id}
              name={user.name}
              isExempt={user.isExempt}
              isAdmin={user.isAdmin}
              onToggle={() =>
                emit({
                  case: `setUserExemption`,
                  userId: user.id,
                  enabled: !user.isExempt,
                })
              }
            />
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <Button
            type="button"
            onClick={() => emit({ case: `administrateOSUserAccountsClicked` })}
            color="secondary"
            size="medium"
            className=""
          >
            Administrate user accounts
            <i className="fa-solid fa-arrow-right ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

interface ExemptUserProps {
  name: string;
  isExempt: boolean;
  onToggle(): unknown;
  isAdmin?: boolean;
}

export const ExemptUser: React.FC<ExemptUserProps> = ({
  name,
  isExempt,
  isAdmin,
  onToggle,
}) => (
  <div
    onClick={onToggle}
    className={cx(`flex items-center justify-start rounded-xl px-2 py-1.5 pl-4`)}
  >
    <button
      className={cx(
        `w-5 h-5 rounded-full border-slate-300 dark:border-slate-700 border mr-4 flex justify-center items-center hover:scale-105 transition-[transform,border-color,border,background-color] duration-100`,
        isExempt && `bg-violet-500 !border-violet-500 dark:border-violet-500`,
      )}
    >
      <i className="fa-solid fa-check text-white dark:text-slate-900 text-xs" />
    </button>
    <div className="flex justify-between items-center space-x-2 flex-grow">
      <div className="flex items-center">
        <h3 className="font-bold dark:text-white grow mr-3">{name}</h3>
        {isAdmin && (
          <span className="text-fuchsia-500 dark:text-fuchsia-800 font-medium uppercase text-xs bg-fuchsia-100 dark:bg-fuchsia-400 rounded-full px-2 py-0">
            admin
          </span>
        )}
      </div>
      <span className="pr-2 ml-4 text-violet-500 dark:text-violet-400">
        {isExempt ? (
          <>
            Exempt&mdash;<em>unrestricted</em> internet access
          </>
        ) : (
          <>
            Unknown user&mdash;<em>no</em> internet access
          </>
        )}
      </span>
    </div>
  </div>
);

export default ExemptUsersScreen;
