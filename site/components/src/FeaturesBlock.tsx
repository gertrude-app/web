import React from 'react';
import cx from 'classnames';

const FeaturesBlock: React.FC = () => (
  <section className="[background:radial-gradient(#ede9fe,white_70%)] px-20 py-40 flex flex-col items-center">
    <div className="grid grid-cols-3 w-full max-w-[1300px] gap-8">
      <Feature className="col-span-2">
        <h2 className="font-semibold text-3xl">Take complete control</h2>
        <p className="text-xl text-slate-500 mt-2">
          Choose exactly where your kids are allowed online, and make sure they can't go
          anywhere else. No other mac internet filter allows the same level of strict
          control.
        </p>
      </Feature>
      <Feature className="row-span-2">
        <div className="absolute w-128 h-128 [background:radial-gradient(#f5d0fe77,transparent_70%)] -bottom-52 left-0"></div>
        <div className="absolute w-128 h-128 [background:radial-gradient(#ddd6fe77,transparent_70%)] bottom-0 -right-80"></div>
        <h2 className="font-semibold text-3xl z-10">Manage on the go</h2>
        <p className="text-xl text-slate-500 mt-2 z-10">
          Add or remove sites from your own personal safelist from your phone or computer,
          wherever you are.
        </p>
      </Feature>
      <Feature> </Feature>
      <Feature>
        <h2 className="font-semibold text-3xl">Get notified</h2>
        <p className="text-xl text-slate-500 mt-2">
          Get text, email, or Slack messages when your kid needs access to a blocked site
          or requests a temporary suspension of the mac internet blocker.
        </p>
      </Feature>
      <Feature>
        <h2 className="font-semibold text-3xl">Suspend the filter</h2>
        <p className="text-xl text-slate-500 mt-2">
          Temporarily allow the whole internet, while recording screenshots of their
          activity and everything they type with a built-in mac keylogger.
        </p>
      </Feature>
      <Feature>
        <h2 className="font-semibold text-3xl">Protect the whole family</h2>
        <p className="text-xl text-slate-500 mt-2">
          Manage all your kids with one account, sharing lists of safelisted sites when it
          makes sense. Only $5/month for the whole family.
        </p>
      </Feature>
      <Feature> </Feature>
    </div>
  </section>
);

export default FeaturesBlock;

interface FeatureProps {
  children: React.ReactNode;
  className?: string;
}

const Feature: React.FC<FeatureProps> = ({ children, className }) => (
  <div
    className={cx(
      `bg-white rounded-3xl p-12 border-[0.5px] border-violet-200 relative overflow-hidden`,
      className,
    )}
  >
    {children}
  </div>
);
