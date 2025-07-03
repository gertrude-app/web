import { ApiErrorMessage, Loading, PageHeading } from '@dash/components';
import React from 'react';
import { useParams } from 'react-router-dom';
// import Current from '../../environment';
import { Key, useQuery } from '../../hooks';

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
  return (
    <PageHeading icon="phone" className="mb-4">
      {data.childName}’s {data.deviceType}
    </PageHeading>
  );
};

export default IOSDevice;
