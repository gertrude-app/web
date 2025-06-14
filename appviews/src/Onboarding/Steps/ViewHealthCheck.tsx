import React from 'react';
import Callout from '../Callout';
import ExpandableContent from '../ExpandableContent';
import * as Onboarding from '../UtilityComponents';
import assets from '../cdn-assets';

const ViewHealthCheck: React.FC = () => (
  <Onboarding.Centered className="space-x-12" direction="row">
    <div>
      <Onboarding.Heading>Admin health check</Onboarding.Heading>
      <Onboarding.Text className="mt-3 mb-8 max-w-2xl">
        One good thing to know about is the <b>Health Check Screen</b>. It’s a quick way
        to see if everything is working correctly, and sometimes can help you fix issues.
        Try it out now.
      </Onboarding.Text>
      <Callout type="info" heading="Good to know:">
        The health check screen will show a warning about having <b>zero keys.</b>
        {` `}That’s expected, since you’re just getting setup.
      </Callout>
      <Onboarding.PrimaryButton icon="fa-solid fa-arrow-right" className="mt-8">
        Found it, next
      </Onboarding.PrimaryButton>
    </div>
    <ExpandableContent
      asset={assets.img(`administrate`)}
      lessRounded
      width={758 * 0.48}
      height={556 * 0.48}
      maxWidth={700}
    />
  </Onboarding.Centered>
);

export default ViewHealthCheck;
