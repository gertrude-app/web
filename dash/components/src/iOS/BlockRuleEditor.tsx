import { TextInput } from '@shared/components';
import React from 'react';
import { Combobox, RadioGroup } from '../Forms';

export type Props = {
  type: `app` | `address`;
  primaryValue: string;
  secondaryValue: string;
  condition: Condition;
  emit: (event: Event) => unknown;
};

export type Condition =
  | `always`
  | `whenAddressContains`
  | `whenIsBrowser`
  | `unlessAddressContains`;

export type Event =
  | { type: `setPrimaryValue`; value: string }
  | { type: `setSecondaryValue`; value: string }
  | { type: `setType`; value: `app` | `address` }
  | { type: `setCondition`; value: Condition };

const BlockRuleEditor: React.FC<Props> = ({
  type,
  primaryValue,
  secondaryValue,
  condition,
  emit,
}) => (
  <div className="p-4">
    <TextInput
      label={type === `app` ? `App bundle ID:` : `Address fragment`}
      type="text"
      placeholder="com.acme.app"
      value={primaryValue}
      setValue={() => {}}
    />
    <div className="flex gap-4">
      <RadioGroup
        options={[
          { value: `app`, display: `Block app` },
          { value: `address`, display: `Block address` },
        ]}
        selectedOption={type}
        setSelectedOption={(selected) => {}}
      />
      <Combobox
        options={[
          { value: `always`, display: `Always` },
          { value: `whenAddressContains`, display: `When address contains...` },
          { value: `whenIsBrowser`, display: `When is browser` },
          { value: `unlessAddressContains`, display: `Unless address contains...` },
        ]}
        selected={{
          value: `always`,
          display: `Always`,
        }}
        setSelected={(selected) => {}}
      />
    </div>
    {condition === `unlessAddressContains` && (
      <TextInput
        type="textarea"
        value={secondaryValue}
        setValue={(value) => {}}
        placeholder="foo.com\nbar.com"
      />
    )}
    {condition === `whenAddressContains` && (
      <TextInput
        type="text"
        value={secondaryValue}
        setValue={(value) => {}}
        placeholder="bad-site.com"
      />
    )}
  </div>
);

export default BlockRuleEditor;

/*
block app - always
block app - only when (hostname contains X)
block app - only when (flowType = browser)
block app - unless (hostname contains any of Xs) (maybe obseleted by managed settings? maybe not, used for podtrude)

block address - always
block address - only when (flowtype = browser) (???)
*/
