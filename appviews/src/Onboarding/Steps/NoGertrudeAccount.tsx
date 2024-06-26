import React from 'react';
import QRCode from '../QRCode';
import * as Onboarding from '../UtilityComponents';

const NoGertrudeAccount: React.FC = () => (
  <Onboarding.Centered direction="row" className="ml-2 space-x-4">
    <div>
      <Onboarding.Heading>No problem, let’s make one!</Onboarding.Heading>
      <Onboarding.Text className="mt-4 max-w-lg">
        We recommend you <b>sign up on your phone,</b> instead of this computer.{` `}
        <b>Aim your phone’s camera</b> at the QR code and it will take you to the signup
        page.
      </Onboarding.Text>
      <Onboarding.Text className="mt-3 max-w-lg">
        Once you’ve verified your email, come back here and click to continue.
      </Onboarding.Text>
      <Onboarding.ButtonGroup
        primary="Done, I have a Gertrude account now"
        secondary={{ text: `I don’t want an account, quit...`, shadow: true }}
        className="mt-6 max-w-md"
      />
    </div>
    <QRCode url="gertrude.app/start" />
  </Onboarding.Centered>
);

export default NoGertrudeAccount;
