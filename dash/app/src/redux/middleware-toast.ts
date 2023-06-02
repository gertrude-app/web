import toast from 'react-hot-toast';
import { capitalize } from '@shared/string';
import type { Middleware } from '@reduxjs/toolkit';
import { mutationFailed, mutationStarted, mutationSucceeded } from '../hooks/query';

const toastMiddleware: Middleware = () => (next) => (action) => {
  if (mutationStarted.match(action) && action.payload.toast) {
    toast.dismiss();
    const { verb, type } = action.payload.toast;
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
