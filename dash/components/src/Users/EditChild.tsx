import { type PlainTimeWindow, type RuleSchedule } from '@dash/types';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import { Button, Label, TextInput, Toggle } from '@shared/components';
import { inflect } from '@shared/string';
import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import type {
  BlockedApp,
  ConfirmableEntityAction,
  RequestState,
  Subcomponents,
  SuccessOutput,
} from '@dash/types';
import type { UserKeychainSummary as Keychain } from '@dash/types';
import EmptyState from '../EmptyState';
import TimeInput from '../Forms/TimeInput';
import KeychainCard from '../Keychains/KeychainCard';
import { ConfirmDeleteEntity } from '../Modal';
import PageHeading from '../PageHeading';
import AddDeviceInstructions from './AddDeviceInstructions';
import AddKeychainDrawer from './AddKeychainDrawer';
import BlockedAppCard from './BlockedAppCard';
import Computer from './Computer';
import ConnectDeviceModal from './ConnectDeviceModal';

interface Props {
  id: string;
  isNew: boolean;
  name: string;
  setName(name: string): unknown;
  keyloggingEnabled: boolean;
  setKeyloggingEnabled(enabled: boolean): unknown;
  screenshotsEnabled: boolean;
  setScreenshotsEnabled(enabled: boolean): unknown;
  screenshotsResolution: number;
  setScreenshotsResolution(resolution: number): unknown;
  screenshotsFrequency: number;
  setScreenshotsFrequency(frequency: number): unknown;
  showSuspensionActivity: boolean;
  setShowSuspensionActivity(show: boolean): unknown;
  setDowntimeEnabled(enabled: boolean): unknown;
  downtimeEnabled: boolean;
  setDowntime(window: PlainTimeWindow): unknown;
  downtime: PlainTimeWindow;
  removeKeychain(id: UUID): unknown;
  keychains: Keychain[];
  devices: Subcomponents<typeof Computer>;
  deleteUser: ConfirmableEntityAction<void>;
  startAddDevice(): unknown;
  dismissAddDevice(): unknown;
  deleteDevice: ConfirmableEntityAction;
  addDeviceRequest?: RequestState<{ code: number }>;
  saveButtonDisabled: boolean;
  onSave(): unknown;
  onAddKeychainClicked(): unknown;
  onSelectKeychainToAdd(keychain: Keychain): unknown;
  onConfirmAddKeychain(): unknown;
  onDismissAddKeychain(): unknown;
  addingKeychain?: Keychain | null;
  fetchSelectableKeychainsRequest?: RequestState<{ own: Keychain[]; public: Keychain[] }>;
  keychainSchedule?: RuleSchedule;
  setAddingKeychainSchedule(schedule?: RuleSchedule): unknown;
  setAssignedKeychainSchedule(id: UUID, schedule?: RuleSchedule): unknown;
  blockedApps?: BlockedApp[];
  newBlockedAppIdentifier: string;
  updateNewBlockedAppIdentifier(identifier: string): unknown;
  addNewBlockedApp(): unknown;
  removeBlockedApp(id: UUID): unknown;
  setBlockedAppSchedule(id: UUID, schedule?: RuleSchedule): unknown;
  onRequestPublicKeychain(searchQuery: string, description: string): unknown;
  requestPublicKeychainRequest: RequestState<SuccessOutput>;
}

const EditChild: React.FC<Props> = ({
  isNew,
  name,
  id,
  setName,
  keyloggingEnabled,
  setKeyloggingEnabled,
  screenshotsEnabled,
  setScreenshotsEnabled,
  screenshotsResolution,
  setScreenshotsResolution,
  screenshotsFrequency,
  setScreenshotsFrequency,
  showSuspensionActivity,
  setShowSuspensionActivity,
  removeKeychain,
  keychains,
  devices,
  deleteDevice,
  deleteUser,
  saveButtonDisabled,
  onSave,
  dismissAddDevice,
  addDeviceRequest,
  startAddDevice,
  onAddKeychainClicked,
  onSelectKeychainToAdd,
  onDismissAddKeychain,
  fetchSelectableKeychainsRequest,
  addingKeychain,
  onConfirmAddKeychain,
  downtimeEnabled,
  setDowntimeEnabled,
  downtime,
  setDowntime,
  keychainSchedule,
  setAddingKeychainSchedule,
  setAssignedKeychainSchedule,
  blockedApps,
  newBlockedAppIdentifier,
  updateNewBlockedAppIdentifier,
  addNewBlockedApp,
  removeBlockedApp,
  setBlockedAppSchedule,
  onRequestPublicKeychain,
  requestPublicKeychainRequest,
}) => {
  if (isNew) {
    return (
      <div className="-my-6 md:-my-7 py-6 md:py-7 min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col">
        <PageHeading icon="user-plus">Add a child</PageHeading>
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col gap-2 flex-grow max-w-2xl">
            <Label htmlFor="name" className="text-xl ml-6 md:ml-9">
              Child&rsquo;s name:
            </Label>
            <input
              className="border-[0.5px] border-slate-200 shadow text-2xl md:text-3xl lg:text-4xl px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl placeholder:text-slate-200 outline-none outline-transparent outline-offset-0 focus:outline-2 focus:outline-violet-500 transition duration-200 focus:shadow-md font-medium text-slate-800 placeholder:font-normal"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              data-test="user-name"
              autoFocus
            />
          </div>
        </div>
        <footer className="flex flex-col sm:flex-row justify-end gap-4">
          <Button size="large" type="link" color="tertiary" to="/children">
            Cancel
          </Button>
          <Button
            size="large"
            type="button"
            color="primary"
            onClick={onSave}
            disabled={saveButtonDisabled}
          >
            Save child
          </Button>
        </footer>
      </div>
    );
  }
  return (
    <div className="relative max-w-3xl">
      <ConnectDeviceModal
        request={addDeviceRequest}
        dismissAddDevice={dismissAddDevice}
      />
      <AddKeychainDrawer
        request={fetchSelectableKeychainsRequest}
        onSelect={onSelectKeychainToAdd}
        onDismiss={onDismissAddKeychain}
        onConfirm={onConfirmAddKeychain}
        selected={addingKeychain ?? undefined}
        existingKeychains={keychains}
        userName={name}
        schedule={keychainSchedule}
        setSchedule={setAddingKeychainSchedule}
        onRequestPublicKeychain={onRequestPublicKeychain}
        requestPublicKeychainRequest={requestPublicKeychainRequest}
      />
      <ConfirmDeleteEntity
        type="connection to computer"
        action={deleteDevice}
        text="Are you sure you want to delete the connection between this child and this computer?"
      />
      <ConfirmDeleteEntity type="user" action={deleteUser} />
      {devices.length > 0 && <PageHeading icon={`cog`}>Child settings</PageHeading>}
      <div className="mt-8">
        {devices.length === 0 && (
          <div className="-mt-6 bg-white rounded-3xl p-6 sm:p-8 shadow border-[0.5px] border-slate-200">
            <AddDeviceInstructions
              userName={name}
              userId={id}
              startAddDevice={startAddDevice}
            />
          </div>
        )}
        {devices.length > 0 && (
          <>
            <TextInput
              type="text"
              label="Name:"
              testId="user-name"
              value={name}
              setValue={setName}
              className="max-w-xl"
            />
            <h2 className="mt-5 text-lg font-bold text-slate-700">
              {devices.length} {inflect(`computer`, devices.length)}:
            </h2>
            <div className="flex flex-col max-w-3xl -mx-2 xs:mx-0">
              {devices.map((computer) => (
                <div key={computer.id} className="flex items-center mt-3">
                  <Computer
                    modelTitle={computer.modelTitle}
                    modelIdentifier={computer.modelIdentifier}
                    id={computer.id}
                    deviceId={computer.deviceId}
                    name={computer.name}
                    status={computer.status}
                    className="flex-grow mr-1 xs:mr-3"
                  />
                  <button
                    onClick={() => deleteDevice.start(computer.id)}
                    className="transition-colors duration-100 flex justify-center items-center w-6 xs:w-10 h-6 xs:h-10 rounded-full hover:bg-slate-200/50 cursor-pointer text-slate-500 hover:text-red-500"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              ))}
              <button
                onClick={startAddDevice}
                className="mt-5 text-violet-700 font-medium px-7 py-2 rounded-lg hover:bg-violet-100 self-end transition-colors duration-100"
              >
                <i className="fa fa-plus mr-2" />
                Add a computer
              </button>
            </div>

            {/* monitoring */}
            <div className="mt-4 max-w-3xl">
              <h2 className="text-lg font-bold text-slate-700">Monitoring</h2>
              <div className="flex justify-between items-center bg-slate-100 mt-3 p-4 sm:p-6 rounded-xl">
                <div className="mr-3">
                  <h3 className="font-medium text-slate-700 leading-tight">
                    Enable keylogging
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Sends reports of all keystrokes to your review
                  </p>
                </div>
                <Toggle enabled={keyloggingEnabled} setEnabled={setKeyloggingEnabled} />
              </div>
              <div
                className={`bg-slate-100 mt-3 p-4 sm:p-6 rounded-xl overflow-hidden relative`}
              >
                <div className="flex justify-between items-center">
                  <div className="mr-3">
                    <h3 className="font-medium text-slate-700 leading-tight">
                      Enable screenshots
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Periodically take a screenshot and upload for your review
                    </p>
                  </div>
                  <Toggle
                    enabled={screenshotsEnabled}
                    setEnabled={setScreenshotsEnabled}
                  />
                </div>
                <div
                  className={cx(
                    `flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 mt-5`,
                    screenshotsEnabled || `hidden`,
                  )}
                >
                  <TextInput
                    type="positiveInteger"
                    label="Resolution"
                    value={String(screenshotsResolution)}
                    setValue={(num) => setScreenshotsResolution(Number(num))}
                    unit="pixels"
                  />
                  <TextInput
                    type="positiveInteger"
                    label="Frequency"
                    value={String(screenshotsFrequency)}
                    setValue={(num) => setScreenshotsFrequency(Number(num))}
                    unit="seconds"
                  />
                </div>
              </div>
              <div
                className={cx(
                  `flex justify-between items-center mt-3 p-6 bg-slate-100 rounded-xl transition-opacity duration-300`,
                  !(screenshotsEnabled || keyloggingEnabled) && `!hidden`,
                )}
              >
                <div className="mr-3">
                  <h3 className="font-medium text-slate-700 leading-tight">
                    Emphasize filter suspension activity
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Visually highlight activity that is recorded while filter is suspended
                  </p>
                </div>
                <Toggle
                  enabled={showSuspensionActivity}
                  setEnabled={setShowSuspensionActivity}
                />
              </div>
            </div>

            {/* downtime */}
            <div className="mt-12 max-w-3xl">
              <h2 className="text-lg font-bold text-slate-700">Downtime</h2>
              <div
                className={`bg-slate-100 mt-3 p-4 sm:p-6 rounded-xl overflow-hidden relative`}
              >
                <div className="flex justify-between items-center">
                  <div className="mr-3">
                    <h3 className="font-medium text-slate-700 leading-tight">
                      Enable downtime
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Completely restrict all internet access during specified hours
                    </p>
                  </div>
                  <Toggle enabled={downtimeEnabled} setEnabled={setDowntimeEnabled} />
                </div>
                <div
                  className={cx(
                    `flex justify-center items-center mt-4 bg-white rounded-xl p-4 gap-4 flex-col sm:flex-row md:flex-col md+:flex-row border-[0.5px] border-slate-200 shadow shadow-slate-300/50`,
                    downtimeEnabled || `hidden`,
                  )}
                >
                  <span className="text-slate-500 font-medium">From</span>
                  <TimeInput
                    time={downtime.start}
                    setTime={(start) => setDowntime({ ...downtime, start })}
                  />
                  <span className="text-slate-500 font-medium">to</span>
                  <TimeInput
                    time={downtime.end}
                    setTime={(end) => setDowntime({ ...downtime, end })}
                  />
                </div>
              </div>
            </div>
            {/* /downtime */}

            {/* blocked apps */}
            {blockedApps && (
              <div className="mt-12 max-w-3xl mb-12">
                <h2 className="text-lg font-bold text-slate-700">Blocked apps{` `}</h2>
                {blockedApps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-100 mt-2 rounded-2xl shadow-inner">
                    <NoSymbolIcon className="w-8 h-8 text-slate-300" strokeWidth={2} />
                    <h3 className="text-lg font-semibold text-slate-700 mt-2 mb-1">
                      No blocked apps
                    </h3>
                    <p className="text-slate-500 text-sm text-center">
                      Read more about what blocked apps are{` `}
                      <Link
                        to="https://gertrude.app/docs/block-mac-apps"
                        className="text-blue-500 font-medium underline"
                      >
                        here.
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="gap-1.5 my-2 flex flex-col">
                    {blockedApps.map((app) => (
                      <BlockedAppCard
                        app={app}
                        setSchedule={(schedule) =>
                          setBlockedAppSchedule(app.id, schedule)
                        }
                        onDelete={() => removeBlockedApp(app.id)}
                      />
                    ))}
                  </div>
                )}
                <form
                  className="flex gap-2 mt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addNewBlockedApp();
                  }}
                >
                  <TextInput
                    key={`new-blocked-app-${blockedApps.length}`}
                    type="text"
                    value={newBlockedAppIdentifier}
                    setValue={updateNewBlockedAppIdentifier}
                    placeholder="App name or bundle id"
                  />
                  <Button
                    size="small"
                    className="whitespace-nowrap"
                    color="secondary"
                    type="submit"
                    disabled={!newBlockedAppIdentifier}
                  >
                    <i className="fa fa-plus mr-2" />
                    Add
                  </Button>
                </form>
              </div>
            )}
            {/* /blocked apps */}

            {/* keychains */}
            <div className="mt-12 max-w-3xl">
              <h2 className="text-lg font-bold text-slate-700 mb-2">Keychains</h2>
              <div className="py-3 flex flex-col space-y-4">
                {keychains.length === 0 ? (
                  <EmptyState
                    heading={`No keychains`}
                    secondaryText={`By default, all internet access is blocked for this child until you assign a keychain.`}
                    icon={`key`}
                    buttonText={`Add keychain`}
                    action={onAddKeychainClicked}
                  />
                ) : (
                  <>
                    {keychains.map((keychain) => (
                      <KeychainCard
                        mode="assigned_to_child"
                        keychainId={keychain.id}
                        schedule={keychain.schedule}
                        key={keychain.id}
                        name={keychain.name}
                        description={keychain.description}
                        numKeys={keychain.numKeys}
                        isPublic={keychain.isPublic}
                        onRemove={() => removeKeychain(keychain.id)}
                        setSchedule={(schedule) =>
                          setAssignedKeychainSchedule(keychain.id, schedule)
                        }
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={onAddKeychainClicked}
                      color="secondary"
                      className="xs:self-end"
                    >
                      <i className="fa fa-plus mr-2" />
                      Add keychain
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div
          className={cx(
            `flex mt-8 justify-end border-slate-200 *pt-8 space-x-5`,
            devices.length > 0 && `pt-8 border-t-2`,
          )}
        >
          <Button type="button" onClick={deleteUser.start} color="warning">
            Delete child
          </Button>
          {devices.length > 0 && (
            <Button
              className="ScrollTop"
              type="button"
              disabled={saveButtonDisabled}
              onClick={onSave}
              color="primary"
            >
              Save child
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditChild;
