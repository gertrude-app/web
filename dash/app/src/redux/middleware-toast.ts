import toast from 'react-hot-toast';
import { capitalize } from '@shared/string';
import type { Middleware } from '@reduxjs/toolkit';
import type { MutationType } from '../hooks/query';
import { mutationFailed, mutationStarted, mutationSucceeded } from '../hooks/query';

type Toastable = { key: { toast: string }; type: MutationType };

function terms({ key: { toast: entity }, type: verb }: Toastable): {
  entity: string;
  verb: ToastVerb;
  pastTense?: string;
} {
  switch (`${verb}.${entity}`) {
    case `upsert.user`:
      return { verb: `save`, entity: `user` };
    default:
      return { verb: `update`, entity: `record` };
  }
}

// toastCrud(`save`, `user`);
// toastCrud(`delete`, `keychain`);
// toastCrud(`save`, `keychain`);
// toastCrud(`save`, `key`);
// toastCrud(`delete`, `key`);
// toastCrud(`delete`, `keychain`);
// toastCrud(`delete`, `device`);
// toastCrud(`delete`, `user`);
// toastCrud(`save`, `notification`);
// toastCrud(`delete`, `notification`);
// toastCrud(`delete`, `notification method`);
// toastCrud(`send`, `verification code`);
// toastCrud(`verify`, `confirmation code`);
// toastCrud(`approve`, `activity items`);
// toastCrud(`update`, `suspend filter request`);

function isToastable(meta: {
  key: { toast?: string };
  type: MutationType;
}): meta is Toastable {
  return true;
}

const toastMiddleware: Middleware = () => (next) => (action) => {
  if (mutationStarted.match(action) && isToastable(action.meta)) {
    toast.dismiss();
    const lol = terms(action.meta);
    const { verb, type } = action.meta.key.toast;
    toast.loading(`${capitalize(verb).replace(/e$/, ``)}ing ${type}...`);
  }

  if (mutationSucceeded.match(action) && action.payload.toast) {
    toast.dismiss();
    const { verb, type } = action.payload.toast;
    const pastTense = (() => {
      switch (verb) {
        case `update`:
        case `save`:
        case `delete`:
        case `approve`:
          return `${verb}d`;
        case `accept`:
        case `reject`:
          return `${verb}ed`;
        case `send`:
          return `sent`;
        case `verify`:
          return `verified`;
      }
    })();
    toast.success(`${capitalize(type)} ${pastTense}!`);
  }

  if (mutationFailed.match(action) && action.payload.toast) {
    toast.dismiss();
    const { verb, type } = action.payload.toast;
    toast.error(`Failed to ${verb} ${type}`, { duration: 6000 });
  }

  return next(action);
};

export default toastMiddleware;

type ToastVerb =
  | 'save'
  | 'update'
  | 'delete'
  | 'send'
  | 'verify'
  | 'approve'
  | 'reject'
  | 'accept';
