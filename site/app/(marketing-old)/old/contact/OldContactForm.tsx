'use client';

import { useState } from 'react';
import cx from 'classnames';
import { TextInput, Logo, Button, Loading } from '@shared/components';
import Turnstile from 'react-turnstile';
import type { NextPage } from 'next';
import ContactStatusMessage from './ContactStatusMessage';
import * as env from '@/lib/env';

const ContactForm: NextPage = () => {
  const [state, setState] = useState<'idle' | 'ongoing' | 'failed' | 'succeeded'>(`idle`);
  const [name, setName] = useState(``);
  const [emailAddress, setEmailAddress] = useState(``);
  const [subject, setSubject] = useState(``);
  const [message, setMessage] = useState(``);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const { formsEndpoint, turnstileSitekey } = env.getPublicVars();

  return (
    <section className="bg-gradient-to-b from-violet-500 to-fuchsia-500 flex-grow flex flex-col justify-center items-center px-6 pt-8 sm:pt-16 pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl flex flex-col sm:flex-row overflow-hidden relative w-full sm:w-auto sm:space-x-6">
        <div className="sm:w-56 md:w-72 mb-6 sm:mb-0 space-y-2">
          <h1 className="text-2xl font-inter text-slate-900">Contact us</h1>
          {state === `ongoing` && (
            <div className="hidden sm:block sm:pt-8">
              <Loading />
            </div>
          )}
          {state === `failed` && (
            <ContactStatusMessage
              type="error"
              heading="Uh oh!"
              message="Something went wrong. Please refresh the page and try again."
            />
          )}
          {state === `succeeded` && (
            <ContactStatusMessage
              type="success"
              heading="Got it!"
              message="Thanks for your message. We'll usually respond within one business day or sooner."
            />
          )}
          <Logo iconOnly size={400} className="absolute -left-28 -bottom-24 opacity-20" />
        </div>
        <form
          className={cx(
            `sm:w-72 md:w-96 space-y-5 flex flex-col`,
            state !== `idle` && `hidden sm:flex`,
          )}
          name="contact"
          onSubmit={(event) => {
            event.preventDefault();
            if (!turnstileToken) {
              setState(`failed`);
              return;
            }
            const params = new URLSearchParams();
            params.append(`form`, `contact`);
            params.append(`name`, name);
            params.append(`email`, emailAddress);
            params.append(`subject`, subject);
            params.append(`message`, message);
            params.append(`turnstileToken`, turnstileToken);
            setState(`ongoing`);
            try {
              window
                .fetch(formsEndpoint, {
                  method: `POST`,
                  headers: { 'Content-Type': `application/x-www-form-urlencoded` },
                  body: params.toString(),
                })
                .then(() => setState(`succeeded`))
                .catch(() => setState(`failed`));
            } catch {
              setState(`failed`);
            }
          }}
        >
          <TextInput
            type="text"
            label="Name"
            name="name"
            autoFocus
            required
            placeholder="Your name"
            value={name}
            setValue={setName}
          />
          <TextInput
            type="email"
            name="email_address"
            label="Email address"
            required
            placeholder="you@example.com"
            value={emailAddress}
            setValue={setEmailAddress}
          />
          <TextInput
            type="text"
            name="subject"
            label="Subject"
            required
            value={subject}
            setValue={setSubject}
          />
          <TextInput
            type="textarea"
            label="Message"
            name="message"
            required
            rows={4}
            value={message}
            setValue={setMessage}
          />
          <Turnstile
            sitekey={turnstileSitekey}
            refreshExpired="auto"
            onVerify={setTurnstileToken}
          />
          <Button
            className="self-end relative z-10"
            type="submit"
            color="secondary"
            disabled={state === `ongoing` || state === `succeeded`}
            size="large"
          >
            <i aria-hidden className="fa-solid fa-arrow-right mr-3" />
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
