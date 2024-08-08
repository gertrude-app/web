import cx from 'classnames';
import { EmptyState, PageHeading } from '@dash/components';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SecurityEventsFeed } from '@dash/types';
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
    {feed.length === 0 && (
      <EmptyState
        className="mt-8"
        heading={`No security events to show`}
        secondaryText={`No potentially dangerous activity has occured within the last 14 days.`}
        icon={`shield`}
        buttonText={`Monitor activity`}
        buttonIcon="binoculars"
        action={``}
      />
    )}
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
        <div className="mb-2 flex flex-col md+:flex-row items-start md+:items-center">
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
          {event.case === `child` && (
            <span className="ml-1.5 text-xs xs:text-sm text-slate-500">
              <Link
                to={`/children/${event.childId}`}
                className="font-medium text-slate-700 hover:underline"
              >
                {event.childName}
              </Link>
              {` `}
              on{` `}
              <Link
                to={`/computers/${event.deviceId}`}
                className="font-medium text-slate-700 hover:underline"
              >
                {event.deviceName}
              </Link>
            </span>
          )}
          {where && where.city && (
            <>
              <span className="md+:ml-1.5 text-xs xs:text-sm text-slate-500 mt-1 md+:mt-0">
                from {where.city}, {where.region}, {where.country_code}
              </span>
              <span className="text-sm mx-1 text-slate-400 hidden md+:block">•</span>
            </>
          )}
          {event.case === `admin` && event.ipAddress && (
            <Link
              to={`https://whatismyipaddress.com/ip/${event.ipAddress}`}
              className={cx(
                `text-indigo-500 text-sm font-semibold underline mt-1 md+:mt-0`,
                (!where || !where.city) && `md+:ml-2`,
              )}
            >
              {event.ipAddress}
            </Link>
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
    createdAt: `2024-08-02T18:44:50Z`,
    event: `Successful login`,
    id: `8a3de672-8e72-47ea-a1a2-fece9a848a7a`,
    case: `admin`,
    detail: `using email/password`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
  },
  {
    case: `admin`,
    id: `24c68fa8-8f1c-4cf8-84e4-333681815a9f`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    event: `Successful login`,
    detail: `using email/password`,
    createdAt: `2024-08-01T20:11:10Z`,
  },
  {
    case: `admin`,
    createdAt: `2024-08-01T19:19:35Z`,
    id: `ad2600b6-6058-4f7a-9bab-2794515e25ba`,
    explanation: `This event occurs when the monitoring level for a child is decreased by a parent. It should be investigated if the monitoring level is decreased without your knowledge.`,
    detail: `child: Win, screenshots frequency decreased`,
    event: `Child monitoring decreased`,
  },
  {
    createdAt: `2024-08-01T16:13:55Z`,
    case: `child`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    id: `4919005b-d0f7-4307-b623-e37b954a1933`,
    childName: `Harriet`,
    deviceName: `Old Gray`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    event: `Filter suspension expired`,
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
  },
  {
    case: `child`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    id: `5a66f543-6acd-493b-96cf-e070bd0ac5e0`,
    deviceName: `Old Gray`,
    event: `Filter suspended remotely`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    detail: `for 20 min`,
    explanation: `This event occurs when a parent account accepts a request to suspend the filter. As long as the parent accepted the request, this event is normal.`,
    createdAt: `2024-08-01T15:53:55Z`,
    childName: `Harriet`,
  },
  {
    explanation: `This event occurs when a filter suspension ends after the scheduled time. It does not represent a safety risk.`,
    deviceName: `Old Gray`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    case: `child`,
    id: `4b21505c-717c-459e-a6cb-5153034cb532`,
    event: `Filter suspension expired`,
    childName: `Harriet`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    createdAt: `2024-08-01T00:29:47Z`,
  },
  {
    detail: `for 20 min`,
    case: `child`,
    createdAt: `2024-08-01T00:09:47Z`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    explanation: `This event occurs when a parent account accepts a request to suspend the filter. As long as the parent accepted the request, this event is normal.`,
    event: `Filter suspended remotely`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    deviceName: `Old Gray`,
    childName: `Harriet`,
    id: `85218e5c-7f52-488f-8708-6422218f8a77`,
  },
  {
    deviceName: `Old Gray`,
    case: `child`,
    id: `0be8b4fe-20a0-4b59-8a15-d8da4668cbee`,
    createdAt: `2024-08-01T00:08:47Z`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    detail: `at 2024-07-30 19:18:11 +0000`,
    explanation: `This event occurs when an upgrade to the Gertrude app finishes successfully. It is normal, but should be infrequent.`,
    childName: `Harriet`,
    event: `App update succeeded`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
  {
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    detail: `replace (at 2024-07-30 19:18:11 +0000)`,
    explanation: `This event occurs whenever some action or process within Gertrude happens that requests a change to the state of the system extension (filter). It should be investigated if the request is to stop or uninstall the extension without it immediately being restarted or replaced.`,
    deviceName: `Old Gray`,
    childName: `Harriet`,
    id: `a080e544-b67a-4343-92b4-5397560b634b`,
    case: `child`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    event: `System extension change requested`,
    createdAt: `2024-08-01T00:08:47Z`,
  },
  {
    deviceName: `Rachel's mini`,
    id: `54cf3115-fa84-4acb-962a-628ad4446318`,
    case: `child`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    childId: `31d9d4d9-326c-43c2-bd34-77737e7d8961`,
    childName: `Rachel`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    createdAt: `2024-07-31T22:27:41Z`,
    event: `App launched`,
  },
  {
    event: `Admin notification deleted`,
    explanation: `This event occurs when a parent deletes a notification from the parents admin site. It should be investigated if a notification was deleted without your knowledge.`,
    case: `admin`,
    createdAt: `2024-07-31T20:01:29Z`,
    id: `f12db4c3-47b2-44a3-8ede-abfb87c5dd5a`,
  },
  {
    id: `8c296f7e-704a-4705-bc82-5a19765ebb8d`,
    createdAt: `2024-07-31T19:59:31Z`,
    event: `Child keychains changed`,
    explanation: `This event occurs when a parent changes which keychains are assigned to a child. Should be investigated if the change was not made by you.`,
    detail: `child: Monitored`,
    case: `admin`,
  },
  {
    event: `Child keychains changed`,
    createdAt: `2024-07-31T19:58:50Z`,
    case: `admin`,
    explanation: `This event occurs when a parent changes which keychains are assigned to a child. Should be investigated if the change was not made by you.`,
    id: `e5587e86-844a-4b53-bf11-cabebb3e5f45`,
  },
  {
    explanation: `This event occurs when a new key is created and added to a keychain by a parent, either manually or by accepting an unlock request.`,
    createdAt: `2024-07-31T19:48:44Z`,
    event: `Key created`,
    id: `f3cb2c94-5e7f-4d9b-8426-bfa9197a844e`,
    case: `admin`,
    detail: `key opening any subdomain of sobad.com for all web browsers added to keychain Ebird`,
  },
  {
    case: `admin`,
    explanation: `This event occurs when a new key is created and added to a keychain by a parent, either manually or by accepting an unlock request.`,
    createdAt: `2024-07-31T19:47:17Z`,
    detail: `keychain=Ebird, key=any subdomain of verybad.com for all web browsers`,
    event: `Key created`,
    id: `883c6baf-f6a0-4f19-bf1d-2030831dc1d7`,
  },
  {
    case: `admin`,
    id: `179acfe9-6997-4479-8874-033157906db3`,
    createdAt: `2024-07-31T19:28:45Z`,
    explanation: `This event occurs when the monitoring level for a child is decreased by a parent. It should be investigated if the monitoring level is decreased without your knowledge.`,
    event: `Child monitoring decreased`,
    detail: `name: Harriet, screenshots resolution decreased`,
  },
  {
    event: `Child deleted`,
    case: `admin`,
    createdAt: `2024-07-31T19:19:37Z`,
    detail: `name: Bob`,
    explanation: `This event occurs when a parent deletes a child from the Gertrude parents admin site. It should occur very rarely, when a child is no longer being protected. Should be investigated if it happened without your knowledge.`,
    id: `0d745753-b9f8-4f9c-af88-87c2b83903c6`,
  },
  {
    id: `c9549ce6-1a93-4d4e-b456-215032731a4b`,
    explanation: `This event occurs when an parent creates a new child from the Gertrude parents admin site. It should occur very rarely, usually during account setup or when starting protection for a child. Should be investigated if it happened without your knowledge.`,
    case: `admin`,
    createdAt: `2024-07-31T19:19:25Z`,
    detail: `name: Bob`,
    event: `New child added`,
  },
  {
    id: `e2bba4fc-8240-4489-9c28-e718c40898e2`,
    case: `admin`,
    explanation: `This event occurs when a parent deletes a child from the Gertrude parents admin site. It should occur very rarely, when a child is no longer being protected. Should be investigated if it happened without your knowledge.`,
    createdAt: `2024-07-31T19:16:34Z`,
    event: `Child deleted`,
    detail: `name: Franny`,
  },
  {
    event: `Password changed`,
    id: `200cda88-a7b9-4c0f-8561-98ccfa4ebc8c`,
    case: `admin`,
    explanation: `This event occurs when a parent changes their password for the parents admin site. Should be investigated if you did not change your password.`,
    createdAt: `2024-07-31T19:04:34Z`,
  },
  {
    explanation: `This event occurs when a parent requests a password reset for the parents admin site. Should be investigated if you did not request a password reset.`,
    createdAt: `2024-07-31T19:04:23Z`,
    case: `admin`,
    event: `Password reset requested`,
    id: `c01743af-ec2c-4e38-afdc-109025300d0f`,
  },
  {
    event: `Password reset requested`,
    explanation: `This event occurs when a parent requests a password reset for the parents admin site. Should be investigated if you did not request a password reset.`,
    createdAt: `2024-07-31T19:02:20Z`,
    case: `admin`,
    id: `85db0ba9-7691-422e-82c9-e6b3e5db542b`,
  },
  {
    event: `Successful login`,
    detail: `using magic link`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    createdAt: `2024-07-31T18:57:01Z`,
    id: `7412851f-70fd-40ce-86dc-d9dca65cd236`,
    case: `admin`,
  },
  {
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    childId: `46ce42cd-608f-489b-aece-b32ebdfc3304`,
    id: `9946bd25-4b6d-4d41-abef-3f6c80cd4d91`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    deviceName: `Rachel's mini`,
    event: `App launched`,
    createdAt: `2024-07-31T18:51:09Z`,
    childName: `Huck`,
    case: `child`,
  },
  {
    deviceName: `Rachel's mini`,
    childName: `Rachel`,
    deviceId: `f092265d-6bc8-454d-b4ef-2cf4474740b4`,
    createdAt: `2024-07-31T18:50:22Z`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    case: `child`,
    id: `19a66255-cfe4-4022-a838-368cd4e82ce5`,
    childId: `31d9d4d9-326c-43c2-bd34-77737e7d8961`,
    event: `App launched`,
  },
  {
    detail: `using email/password`,
    event: `Failed login`,
    explanation: `This event occurs whenever a parent fails to log into the parents admin website, usually from an incorrect password. Should be investigated if you do not recognize the failed attempt as your own.`,
    case: `admin`,
    createdAt: `2024-07-31T18:38:00Z`,
    id: `e365ffad-1084-4047-802c-3ad0e8e85202`,
  },
  {
    case: `admin`,
    createdAt: `2024-07-31T18:37:19Z`,
    explanation: `This event occurs whenever a parent successfully logs into the parents admin website. Should be investigated if you do not recognize the successful login as your own.`,
    event: `Successful login`,
    detail: `using email/password`,
    id: `f7a4c613-cf75-4ccf-a261-3b51c5ac8e71`,
  },
  {
    event: `App launched`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    explanation: `This event occurs when the Gertrude app is launched. Only investigate it if seems to be occuring more than expected.`,
    id: `86a109b9-9a01-4cdc-b19c-9d3640ba257b`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    deviceName: `Old Gray`,
    childName: `Harriet`,
    createdAt: `2024-07-30T19:18:10Z`,
    case: `child`,
  },
  {
    detail: `from installedButNotRunning to installedAndRunning`,
    id: `877d031a-477f-4773-b77f-9e6ec031a47e`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
    case: `child`,
    childName: `Harriet`,
    event: `System extension state changed`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    createdAt: `2024-07-30T19:18:10Z`,
    deviceName: `Old Gray`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
  },
  {
    deviceName: `Old Gray`,
    explanation: `This event occurs when the system extension (filter) state has changed. It should be investigated if the state remains uninstalled or stopped.`,
    id: `6445ec82-181e-4636-bca6-a070e039ab36`,
    childId: `140e19ee-4700-449f-bf8b-759ba5fa6a76`,
    event: `System extension state changed`,
    childName: `Harriet`,
    case: `child`,
    detail: `from installedAndRunning to installedButNotRunning`,
    createdAt: `2024-07-30T19:18:10Z`,
    deviceId: `c3056024-4448-4cd9-9c95-18dc33970cd3`,
  },
];
