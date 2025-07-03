import { ApiErrorMessage, Loading, PageHeading } from '@dash/components';
import { RadioGroup, SelectableListItem } from '@dash/components';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import Current from '../../environment';
import { Key, useQuery } from '../../hooks';

const WEB_POLICY_OPTIONS: { value: string; display: string }[] = [
  { value: `blockAllExcept`, display: `Only Approved Websites` },
  { value: `blockAdultAnd`, display: `Limit Adult Websites Plus Blocklist` },
  { value: `blockAdult`, display: `Limit Adult Websites` },
  { value: `blockAll`, display: `Block everything` },
  { value: `allowAll`, display: `Unrestricted` },
];

type WebPolicy =
  | `allowAll`
  | `blockAdult`
  | `blockAdultAnd`
  | `blockAllExcept`
  | `blockAll`;

const IOSDevice: React.FC = () => {
  const { deviceId: id = `` } = useParams<{ deviceId: string }>();
  const data = {
    childName: `Harriet`,
    deviceType: `iPhone`,
    osVersion: `17.0.1`,
    blockGroups: {
      '1': `GIFs`,
      '2': `Apple Maps images`,
      '3': `AI features`,
      '4': `App store images`,
      '5': `Spotlight`,
      '6': `Ads`,
      '7': `WhatsApp`,
      '8': `apple.com`,
    },
    disabledBlockGroups: [`7`],
    webPolicy: `blockAllExcept`,
    webPolicyDomains: [`apple.com`, `google.com`],
  };

  // Local state for toggling block groups
  const [disabledBlockGroups, setDisabledBlockGroups] = useState<string[]>([
    ...data.disabledBlockGroups,
  ]);
  // Local state for web policy
  const [webPolicy, setWebPolicy] = useState<WebPolicy>(data.webPolicy as WebPolicy);

  const handleToggle = (groupId: string): void => {
    setDisabledBlockGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId],
    );
  };

  return (
    <div>
      <PageHeading icon="phone" className="mb-4">
        {data.childName}’s {data.deviceType}
      </PageHeading>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto mb-8">
        <h2 className="font-bold text-lg mb-4">Block Groups</h2>
        <div className="space-y-2">
          {Object.entries(data.blockGroups).map(([id, name]) => (
            <SelectableListItem
              key={id}
              title={name}
              description={``}
              selected={!disabledBlockGroups.includes(id)}
              onClick={() => handleToggle(id)}
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
        <h2 className="font-bold text-lg mb-4">Web Content Filter Policy</h2>
        <RadioGroup
          options={WEB_POLICY_OPTIONS}
          selectedOption={webPolicy}
          setSelectedOption={(val: string) => setWebPolicy(val as WebPolicy)}
        />
      </div>
    </div>
  );
};

export default IOSDevice;
