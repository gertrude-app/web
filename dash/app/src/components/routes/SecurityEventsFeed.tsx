import cx from 'classnames';
import { PageHeading } from '@dash/components';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SecurityEventsFeed } from '@dash/types';
import { Key, useQuery } from '../../hooks';
import Current from '../../environment';
// import { Key, useQuery } from '../../hooks';
// import Current from '../../environment';
// import { ApiErrorMessage, Loading } from '@dash/components';

const SecurityEventsFeed: React.FC = () => (
  // const getFeed = useQuery(Key.securityEventsFeed, Current.api.securityEventsFeed);
  //
  // if (getFeed.isPending) {
  //   return <Loading />;
  // }
  //
  // if (getFeed.isError) {
  //   return <ApiErrorMessage error={getFeed.error} />;
  // }
  //
  // const feed = getFeed.data;

  <div>
    <PageHeading icon={`shield`}>Security Events</PageHeading>
    <ul className="mt-12 flex flex-col">
      {feed.map((event) => (
        <SecurityEvent event={event} />
      ))}
    </ul>
  </div>
);

export default SecurityEventsFeed;

const SecurityEvent: React.FC<{ event: SecurityEventsFeed.Output[number] }> = ({
  event,
}) => {
  const whenItHappened = new Date(event.createdAt);
  const [explanationExpanded, setExplanationExpanded] = useState(false);
  const [where, setWhere] = useState<{
    city: string;
    region: string;
    country_code: string;
  } | null>(null);

  const childId = event.case === `child` ? event.childId : ``;
  const deviceId = event.case === `child` ? event.deviceId : ``;
  const childQuery = useQuery(Key.user(childId), () => Current.api.getUser(childId));
  const deviceQuery = useQuery(Key.device(deviceId), () =>
    Current.api.getDevice(deviceId),
  );

  useEffect(() => {
    if (event.case === `admin` && event.ipAddress) {
      fetch(`https://ipapi.co/${event.ipAddress}/json/`)
        .then((res) => res.json())
        .then(setWhere);
    }
  }, [event]);

  return (
    <li className="flex group">
      <div className="flex flex-col items-end pb-12 w-20 xs:w-24 shrink-0">
        <span className="text-xs text-slate-500">
          {whenItHappened.toLocaleTimeString(`en-US`, {
            hour: `numeric`,
            minute: `numeric`,
          })}
        </span>
        <span className="text-xs xs:text-sm text-slate-600 font-medium">
          {whenItHappened.toLocaleDateString(`en-US`, { dateStyle: `medium` })}
        </span>
      </div>
      <div className="ml-4 pl-4 pb-12 group-last:pb-0 border-l border-slate-300 flex flex-col items-start">
        <div className="mb-2 flex items-center">
          <span
            className={cx(
              `rounded-full text-xs xs:text-sm font-medium w-14 flex justify-center`,
              {
                'bg-indigo-200 text-indigo-800': event.case === `admin`,
                'bg-fuchsia-200 text-fuchsia-800': event.case === `child`,
              },
            )}
          >
            {event.case}
          </span>
          {childQuery.data && deviceQuery.data && (
            <span className="ml-1.5 text-xs xs:text-sm text-slate-500">
              <Link
                to={`/children/${childQuery.data.id}`}
                className="font-medium text-slate-700"
              >
                {childQuery.data.name}
              </Link>
              {` `}
              on{` `}
              <Link
                to={`/computers/${deviceQuery.data.id}`}
                className="font-medium text-slate-700"
              >
                {deviceQuery.data.name}
              </Link>
            </span>
          )}
          {where && where.city && (
            <span className="ml-1.5 text-xs xs:text-sm text-slate-500">
              from {where.city}, {where.region}, {where.country_code}
            </span>
          )}
        </div>
        <h3 className="xs:text-lg font-medium">{event.event}</h3>
        {event.detail && (
          <p className="text-slate-600 text-sm xs:text-base">{event.detail}</p>
        )}
        <button
          className="flex border border-slate-500 rounded-full items-center py-1 px-2 gap-2 mt-2 hover:bg-slate-100 transition-colors duration-200 select-none"
          onClick={() => setExplanationExpanded(!explanationExpanded)}
        >
          <span className="text-xs text-slate-800 font-medium">Explanation</span>
          <ChevronRightIcon
            className={cx(
              `w-3.5 text-slate-500 transition-transform duration-200`,
              explanationExpanded && `rotate-90`,
            )}
            strokeWidth={2.5}
          />
        </button>
        <p
          className={cx(
            `max-w-xl mt-2 text-xs xs:text-sm text-slate-600 transition-all duration-300`,
            explanationExpanded ? `h-28 lg:h-20 opacity-100` : `h-0 opacity-0 blur-sm`,
          )}
        >
          {event.explanation}
        </p>
      </div>
    </li>
  );
};

const feed: SecurityEventsFeed.Output = [
  {
    ipAddress: `127.0.0.1`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    id: `24c68fa8-8f1c-4cf8-84e4-333681815a9f`,
    createdAt: `2024-08-01T20:11:10Z`,
    detail: `using email/password`,
    case: `admin`,
    event: `Successful login`,
  },
  {
    explanation: `This event occurs when the monitoring level for a child is decreased by a parent. It should be investigated if the monitoring level is decreased without your knowledge.`,
    ipAddress: `76.188.113.48`,
    createdAt: `2024-08-01T19:19:35Z`,
    case: `admin`,
    event: `Child monitoring decreased`,
    id: `ad2600b6-6058-4f7a-9bab-2794515e25ba`,
    detail: `child: Win, screenshots frequency decreased`,
  },
  {
    event: `Filter suspension expired`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    case: `child`,
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
    id: `4919005b-d0f7-4307-b623-e37b954a1933`,
    createdAt: `2024-08-01T16:13:55Z`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
  {
    id: `5a66f543-6acd-493b-96cf-e070bd0ac5e0`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    detail: `for 20 min`,
    case: `child`,
    event: `Filter suspended remotely`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    explanation: `This event occurs when a parent account accepts a request to suspend the filter. As long as the parent accepted the request, this event is normal.`,
    createdAt: `2024-08-01T15:53:55Z`,
  },
  {
    id: `4b21505c-717c-459e-a6cb-5153034cb532`,
    case: `child`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    createdAt: `2024-08-01T00:29:47Z`,
    event: `Filter suspension expired`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
  },
  {
    case: `child`,
    detail: `for 20 min`,
    id: `85218e5c-7f52-488f-8708-6422218f8a77`,
    createdAt: `2024-08-01T00:09:47Z`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    event: `Filter suspended remotely`,
    explanation: `This event occurs when a parent account accepts a request to suspend the filter. As long as the parent accepted the request, this event is normal.`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
  {
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    detail: `at 2024-07-30 19:18:11 +0000`,
    case: `child`,
    event: `App update succeeded`,
    explanation: `This event occurs when an upgrade to the Gertrude app finishes successfully. It is normal, but should be infrequent.`,
    id: `0be8b4fe-20a0-4b59-8a15-d8da4668cbee`,
    createdAt: `2024-08-01T00:08:47Z`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
  {
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    explanation: `This event occurs whenever some action or process within Gertrude happens that requests a change to the state of the system extension (filter). It should be investigated if the request is to stop or uninstall the extension without it immediately being restarted or replaced.`,
    id: `a080e544-b67a-4343-92b4-5397560b634b`,
    detail: `replace (at 2024-07-30 19:18:11 +0000)`,
    case: `child`,
    createdAt: `2024-08-01T00:08:47Z`,
    event: `System extension change requested`,
  },
  {
    id: `54cf3115-fa84-4acb-962a-628ad4446318`,
    childId: `31d9d4d9-326c-43c2-bd34-77737e7d8961`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    createdAt: `2024-07-31T22:27:41Z`,
    event: `App launched`,
    case: `child`,
  },
  {
    id: `f12db4c3-47b2-44a3-8ede-abfb87c5dd5a`,
    explanation: `This event occurs when a parent deletes a notification from the parents admin site. It should be investigated if a notification was deleted without your knowledge.`,
    case: `admin`,
    event: `Admin notification deleted`,
    createdAt: `2024-07-31T20:01:29Z`,
  },
  {
    case: `admin`,
    event: `Child keychains changed`,
    ipAddress: `76.188.113.48`,
    id: `8c296f7e-704a-4705-bc82-5a19765ebb8d`,
    createdAt: `2024-07-31T19:59:31Z`,
    explanation: `This event occurs when a parent changes which keychains are assigned to a child. Should be investigated if the change was not made by you.`,
    detail: `child: Monitored`,
  },
  {
    ipAddress: `76.188.113.48`,
    id: `e5587e86-844a-4b53-bf11-cabebb3e5f45`,
    createdAt: `2024-07-31T19:58:50Z`,
    event: `Child keychains changed`,
    case: `admin`,
    explanation: `This event occurs when a parent changes which keychains are assigned to a child. Should be investigated if the change was not made by you.`,
  },
  {
    createdAt: `2024-07-31T19:48:44Z`,
    event: `Key created`,
    explanation: `This event occurs when a new key is created and added to a keychain by a parent, either manually or by accepting an unlock request.`,
    id: `f3cb2c94-5e7f-4d9b-8426-bfa9197a844e`,
    detail: `key opening any subdomain of sobad.com for all web browsers added to keychain Ebird`,
    case: `admin`,
    ipAddress: `76.188.113.48`,
  },
  {
    case: `admin`,
    event: `Key created`,
    detail: `keychain=Ebird, key=any subdomain of verybad.com for all web browsers`,
    explanation: `This event occurs when a new key is created and added to a keychain by a parent, either manually or by accepting an unlock request.`,
    id: `883c6baf-f6a0-4f19-bf1d-2030831dc1d7`,
    createdAt: `2024-07-31T19:47:17Z`,
  },
  {
    ipAddress: `76.188.113.48`,
    detail: `name: Harriet, screenshots resolution decreased`,
    id: `179acfe9-6997-4479-8874-033157906db3`,
    explanation: `This event occurs when the monitoring level for a child is decreased by a parent. It should be investigated if the monitoring level is decreased without your knowledge.`,
    case: `admin`,
    event: `Child monitoring decreased`,
    createdAt: `2024-07-31T19:28:45Z`,
  },
  {
    detail: `name: Bob`,
    case: `admin`,
    explanation: `This event occurs when a parent deletes a child from the Gertrude parents admin site. It should occur very rarely, when a child is no longer being protected. Should be investigated if it happened without your knowledge.`,
    createdAt: `2024-07-31T19:19:37Z`,
    id: `0d745753-b9f8-4f9c-af88-87c2b83903c6`,
    event: `Child deleted`,
  },
  {
    id: `c9549ce6-1a93-4d4e-b456-215032731a4b`,
    detail: `name: Bob`,
    ipAddress: `76.188.113.48`,
    explanation: `This event occurs when an parent creates a new child from the Gertrude parents admin site. It should occur very rarely, usually during account setup or when starting protection for a child. Should be investigated if it happened without your knowledge.`,
    event: `New child added`,
    createdAt: `2024-07-31T19:19:25Z`,
    case: `admin`,
  },
  {
    explanation: `This event occurs when a parent deletes a child from the Gertrude parents admin site. It should occur very rarely, when a child is no longer being protected. Should be investigated if it happened without your knowledge.`,
    case: `admin`,
    ipAddress: `76.188.113.48`,
    createdAt: `2024-07-31T19:16:34Z`,
    id: `e2bba4fc-8240-4489-9c28-e718c40898e2`,
    event: `Child deleted`,
    detail: `name: Franny`,
  },
  {
    id: `200cda88-a7b9-4c0f-8561-98ccfa4ebc8c`,
    case: `admin`,
    event: `Password changed`,
    createdAt: `2024-07-31T19:04:34Z`,
    explanation: `This event occurs when a parent changes their password for the parents admin site. Should be investigated if you did not change your password.`,
  },
  {
    explanation: `This event occurs when a parent requests a password reset for the parents admin site. Should be investigated if you did not request a password reset.`,
    case: `admin`,
    createdAt: `2024-07-31T19:04:23Z`,
    id: `c01743af-ec2c-4e38-afdc-109025300d0f`,
    event: `Password reset requested`,
  },
  {
    event: `Password reset requested`,
    createdAt: `2024-07-31T19:02:20Z`,
    explanation: `This event occurs when a parent requests a password reset for the parents admin site. Should be investigated if you did not request a password reset.`,
    ipAddress: `76.188.113.48`,
    case: `admin`,
    id: `85db0ba9-7691-422e-82c9-e6b3e5db542b`,
  },
  {
    detail: `using magic link`,
    id: `7412851f-70fd-40ce-86dc-d9dca65cd236`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    createdAt: `2024-07-31T18:57:01Z`,
    event: `Successful login`,
    case: `admin`,
  },
  {
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    event: `App launched`,
    childId: `46ce42cd-608f-489b-aece-b32ebdfc3304`,
    createdAt: `2024-07-31T18:51:09Z`,
    case: `child`,
    id: `9946bd25-4b6d-4d41-abef-3f6c80cd4d91`,
  },
  {
    id: `19a66255-cfe4-4022-a838-368cd4e82ce5`,
    childId: `31d9d4d9-326c-43c2-bd34-77737e7d8961`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    case: `child`,
    createdAt: `2024-07-31T18:50:22Z`,
    event: `App launched`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
  },
  {
    case: `admin`,
    detail: `using email/password`,
    ipAddress: `76.188.113.48`,
    explanation: `This event occurs whenever a parent fails to log into the parents admin website, usually from an incorrect password. Should be investigated if you do not recognize the failed attempt as your own.`,
    id: `e365ffad-1084-4047-802c-3ad0e8e85202`,
    createdAt: `2024-07-31T18:38:00Z`,
    event: `Failed login`,
  },
  {
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    detail: `using email/password`,
    createdAt: `2024-07-31T18:37:19Z`,
    case: `admin`,
    event: `Successful login`,
    ipAddress: `76.188.113.48`,
    id: `f7a4c613-cf75-4ccf-a261-3b51c5ac8e71`,
  },
  {
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    event: `App launched`,
    createdAt: `2024-07-30T19:18:10Z`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    case: `child`,
    id: `86a109b9-9a01-4cdc-b19c-9d3640ba257b`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
  {
    id: `877d031a-477f-4773-b77f-9e6ec031a47e`,
    event: `System extension state changed`,
    case: `child`,
    detail: `from installedButNotRunning to installedAndRunning`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    createdAt: `2024-07-30T19:18:10Z`,
  },
  {
    detail: `from installedAndRunning to installedButNotRunning`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    id: `6445ec82-181e-4636-bca6-a070e039ab36`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    case: `child`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
    createdAt: `2024-07-30T19:18:10Z`,
    event: `System extension state changed`,
  },
  {
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
    createdAt: `2024-07-25T14:01:35Z`,
    case: `child`,
    event: `Filter suspension expired`,
    id: `b339aa67-a76d-46de-b4e5-8312a66406b2`,
  },
  {
    createdAt: `2024-07-25T13:00:57Z`,
    detail: `for 60 min`,
    id: `1660d4ea-9673-4fa8-8036-b3292fc3bbec`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    explanation: `This event occurs when a filter suspension is granted from the computer by a admin-privileged user. If a parent did not authenticate, this represents the child suspending the filter themselves.`,
    event: `Filter suspension granted by admin`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    case: `child`,
  },
  {
    id: `189a634e-6698-47f3-ba5e-1981138bc2bf`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    event: `App update succeeded`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    createdAt: `2024-07-22T21:15:50Z`,
    explanation: `This event occurs when an upgrade to the Gertrude app finishes successfully. It is normal, but should be infrequent.`,
    case: `child`,
  },
  {
    id: `1f04c066-11a0-46aa-900d-8ec59ac5a477`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    explanation: `This event occurs whenever some action or process within Gertrude happens that requests a change to the state of the system extension (filter). It should be investigated if the request is to stop or uninstall the extension without it immediately being restarted or replaced.`,
    createdAt: `2024-07-22T21:15:50Z`,
    event: `System extension change requested`,
    case: `child`,
    detail: `replace`,
  },
  {
    id: `56e211b2-58de-4ef0-8825-43fe0df4d367`,
    createdAt: `2024-07-22T21:15:48Z`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
    event: `System extension state changed`,
    case: `child`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    detail: `from installedButNotRunning to installedAndRunning`,
  },
  {
    event: `App launched`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    createdAt: `2024-07-22T21:15:48Z`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    case: `child`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    id: `46df1d34-cbc2-440a-acc4-fdb1cc6e0035`,
  },
  {
    case: `child`,
    childId: `0d1548a9-a5b9-408a-8034-8dc5cb225169`,
    id: `ff0269a9-dc64-470f-badb-db91bdbe9bc7`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
    createdAt: `2024-07-22T21:15:48Z`,
    deviceId: `80d1275f-a04d-4347-b8b8-e462e64e8ebc`,
    detail: `from installedAndRunning to installedButNotRunning`,
    event: `System extension state changed`,
  },
  {
    case: `child`,
    createdAt: `2024-07-20T15:50:47Z`,
    childId: `46ce42cd-608f-489b-aece-b32ebdfc3304`,
    id: `f712d283-740f-4228-80ef-0fad4f636ec0`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    detail: `for 1 hr 59 min`,
    explanation: `This event occurs when a parent account accepts a request to suspend the filter. As long as the parent accepted the request, this event is normal.`,
    event: `Filter suspended remotely`,
  },
  {
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
    id: `b066e5f2-1665-4216-8ac1-39ef75fbf8df`,
    childId: `46ce42cd-608f-489b-aece-b32ebdfc3304`,
    case: `child`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    createdAt: `2024-07-20T15:47:28Z`,
    event: `Filter suspension expired`,
  },
  {
    detail: `for 60 min`,
    explanation: `This event occurs when a filter suspension is granted from the computer by a admin-privileged user. If a parent did not authenticate, this represents the child suspending the filter themselves.`,
    case: `child`,
    id: `20e21f84-c01b-4c0b-a99c-07d67032f8a9`,
    childId: `46ce42cd-608f-489b-aece-b32ebdfc3304`,
    event: `Filter suspension granted by admin`,
    createdAt: `2024-07-20T14:47:28Z`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
  },
];
