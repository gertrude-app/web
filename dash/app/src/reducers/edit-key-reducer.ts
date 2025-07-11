import { isoFromDateInput } from '@dash/datetime';
import { EditKey, domain } from '@dash/keys';

export default function reducer(state: EditKey.State, action: EditKey.Event): void {
  if (action.type === `nextStepClicked`) {
    switch (state.activeStep) {
      case EditKey.Step.SetKeyType:
        state.activeStep =
          state.keyType === `app`
            ? EditKey.Step.AppKey_ChooseApp
            : EditKey.Step.WebsiteKey_SetAddress;
        return;
      case EditKey.Step.AppKey_ChooseApp:
        state.activeStep = EditKey.Step.AppKey_SetAppScope;
        break;
      case EditKey.Step.WebsiteKey_SetAddress:
        state.activeStep = EditKey.Step.WebsiteKey_SetAppScope;
        return;
      case EditKey.Step.WebsiteKey_Advanced_ChooseApp:
      case EditKey.Step.AppKey_Advanced_SetAddress: // fallthrough
        state.activeStep = EditKey.Step.Expiration;
        return;
      case EditKey.Step.AppKey_SetAppScope:
        state.activeStep = EditKey.Step.Expiration;
        return;
      case EditKey.Step.WebsiteKey_SetAppScope:
        state.activeStep =
          state.addressScope === `singleApp`
            ? EditKey.Step.WebsiteKey_Advanced_ChooseApp
            : EditKey.Step.Expiration;
        return;
      case EditKey.Step.Expiration:
        state.activeStep = EditKey.Step.Comment;
        return;
      default:
        return;
    }
  }

  if (action.type === `prevStepClicked`) {
    switch (state.activeStep) {
      case EditKey.Step.AppKey_ChooseApp:
        state.activeStep = EditKey.Step.SetKeyType;
        return;
      case EditKey.Step.WebsiteKey_SetAppScope:
        state.activeStep = EditKey.Step.WebsiteKey_SetAddress;
        return;
      case EditKey.Step.WebsiteKey_SetAddress:
        state.activeStep = EditKey.Step.SetKeyType;
        return;
      case EditKey.Step.Expiration:
        if (state.keyType === `website`) {
          state.activeStep =
            state.addressScope === `singleApp`
              ? EditKey.Step.WebsiteKey_Advanced_ChooseApp
              : EditKey.Step.WebsiteKey_SetAppScope;
        } else {
          state.activeStep =
            state.appScope === `address`
              ? EditKey.Step.AppKey_Advanced_SetAddress
              : EditKey.Step.AppKey_SetAppScope;
        }
        return;
      case EditKey.Step.Comment:
        state.activeStep = EditKey.Step.Expiration;
        return;
      default:
        return;
    }
  }

  switch (action.type) {
    case `setKeyType`:
      state.keyType = action.to;
      break;

    case `setKeychainId`:
      state.keychainId = action.to;
      break;

    case `setAppSlug`:
      state.appSlug = action.to;
      break;

    case `setAppScope`:
      state.appScope = action.to;
      break;

    case `setAddressScope`:
      state.addressScope = action.to;
      break;

    case `setAppIdentificationType`:
      state.appIdentificationType = action.to;
      break;

    case `setAppBundleId`:
      state.appBundleId = action.to;
      break;

    case `setAddress`:
      state.address = action.to;
      break;

    case `setShowAdvancedAddressOptions`:
      state.showAdvancedAddressOptions = action.to;
      break;

    case `setShowAdvancedAddressScopeOptions`:
      state.showAdvancedAddressScopeOptions = action.to;
      if (action.to === false && state.addressScope === `singleApp`) {
        state.addressScope = `webBrowsers`;
      }
      break;

    case `setAddressType`:
      if (state.addressType === action.to) {
        break;
      }
      state.addressType = action.to;
      if (state.unlockRequestAddress) {
        if (action.to === `strict`) {
          state.address = domain.hostname(state.unlockRequestAddress) ?? state.address;
        } else if (action.to === `standard`) {
          state.address = domain.registrable(state.unlockRequestAddress) ?? state.address;
        }
      }
      break;

    case `setExpirationDate`:
      if (action.to) {
        state.expiration = isoFromDateInput(action.to, state.expiration);
      } else {
        state.expiration = undefined;
      }
      break;

    case `setExpirationTime`:
      if (state.expiration) {
        const [date] = state.expiration.split(`T`);
        state.expiration = `${date}T${action.to}:00.000Z`;
      }
      break;

    case `setComment`:
      state.comment = action.to;
      break;

    case `inactiveStepClicked`:
      if (!state.isNew && action.step === state.activeStep) {
        // allow the user to go back to "all collapsed" state when EDITING
        state.activeStep = EditKey.Step.None;
      } else {
        state.activeStep = action.step;
      }
      break;

    default:
      break;
  }
}
