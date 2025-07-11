import {
  daysFromNow,
  formatDate,
  isoToDateInput,
  isoToLocal,
  isoToTimeInput,
  relativeTime,
  utcToLocal,
} from '@dash/datetime';
import { EditKey } from '@dash/keys';
import { TextInput, Toggle } from '@shared/components';
import React from 'react';
import GradientIcon from '../GradientIcon';
import UserInputText from '../UserInputText';
import KeyCreationStep from './KeyCreationStep';

interface Props {
  mode: `edit` | `create`;
  expiration?: string;
  update(event: EditKey.Event): unknown;
  activeStep: EditKey.Step;
}

const ExpirationStep: React.FC<Props> = ({ mode, update, activeStep, expiration }) => (
  <KeyCreationStep
    update={update}
    mode={mode}
    lookaheadTitle="Add an optional expiration"
    activeTitle="Add an optional expiration:"
    title={
      <h2 className="font-medium text-slate-900 text-lg flex items-center space-x-2">
        <GradientIcon icon="calendar" className="mr-2" size="small" />
        <TitleText expiration={expiration} />
      </h2>
    }
    activeStep={activeStep}
    ownStep={EditKey.Step.Expiration}
  >
    <div className="flex justify-end mr-2 items-center -mt-3">
      <label className="mr-2 text-slate-600">Key expires</label>
      <Toggle
        enabled={!!expiration}
        small
        setEnabled={(enabled) =>
          update({
            type: `setExpirationDate`,
            to: enabled ? formatDate(utcToLocal(daysFromNow(7)), `dateInput`) : undefined,
          })
        }
      />
    </div>
    {expiration && (
      <div className="flex flex-col sm:flex-row">
        <TextInput
          type="date"
          value={isoToDateInput(isoToLocal(expiration))}
          setValue={(date) => update({ type: `setExpirationDate`, to: date })}
          label="Expiration date:"
          className="sm:mr-2 mb-4 sm:mb-0"
        />
        <TextInput
          type="time"
          value={isoToTimeInput(isoToLocal(expiration))}
          setValue={() => {}}
          label="Expiration time:"
          className="sm:ml-2"
        />
      </div>
    )}
  </KeyCreationStep>
);

export default ExpirationStep;

function TitleText({ expiration }: { expiration: string | undefined }): JSX.Element {
  return (
    <span>
      {expiration ? (
        <>
          Expiring <UserInputText>{relativeTime(new Date(expiration))}</UserInputText>
        </>
      ) : (
        <>
          With <UserInputText>no expiration</UserInputText>
        </>
      )}
    </span>
  );
}
