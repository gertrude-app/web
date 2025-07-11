'use client';

import { isoToDateInput } from '@shared/datetime';
import cx from 'classnames';
import React, { useId, useState } from 'react';
import Label from './Label';

type CommonProps = {
  label?: string;
  optional?: boolean;
  value: string;
  setValue(value: string): unknown;
  autoFocus?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  testId?: string;
};

type TextAreaProps = {
  rows?: number;
  noResize?: boolean;
};

type InputProps = {
  unit?: string;
  prefix?: string;
};

type InputType =
  | `email`
  | `text`
  | `url`
  | `positiveInteger`
  | `password`
  | `date`
  | `time`;

type Props =
  | ({ type: InputType } & InputProps & CommonProps)
  | ({ type: `textarea` } & TextAreaProps & CommonProps);

const TextInput: React.FC<Props> = ({
  label,
  optional,
  value,
  setValue,
  required = false,
  autoFocus = false,
  placeholder,
  className,
  disabled,
  name,
  testId,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const id = useId();
  const Element = isInput(props) ? `input` : `textarea`;
  return (
    <div className={cx(`flex flex-col space-y-1 w-full`, className)}>
      {(label || optional) && (
        <div className="flex flex-row justify-between items-center">
          {label && <Label htmlFor={id}>{label}</Label>}
          {optional && (
            <span className="text-violet-500/80 font-medium translate-y-px text-sm antialiased italic">
              *optional
            </span>
          )}
        </div>
      )}
      <div className="flex shadow-sm rounded-xl">
        {isInput(props) && props.prefix && (
          <div className="hidden xs:flex justify-center items-center p-3 bg-slate-50 dark:bg-slate-700/50 border border-r-0 dark:border-slate-700 rounded-l-xl">
            <h3 className="text-slate-500 dark:text-slate-400">{props.prefix}</h3>
          </div>
        )}
        <Element
          id={id}
          type={props.type === `positiveInteger` ? `number` : props.type}
          value={localValue}
          required={!!required}
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          {...(testId ? { 'data-test': testId } : {})}
          {...(props.type === `url`
            ? { autoCapitalize: `none`, autoCorrect: `off` }
            : {})}
          // passwords must be len > 4
          {...(props.type === `password` ? { minLength: 4 } : {})}
          // all date inputs must be in the future (for now, at least)
          {...(props.type === `date`
            ? { min: isoToDateInput(new Date().toISOString()) }
            : {})}
          // textarea "rows"
          {...(isInput(props) ? {} : { rows: props.rows })}
          onChange={(e) => {
            const value = e.target.value;
            setLocalValue(value);
            if (props.type !== `positiveInteger` || isPositiveInteger(value)) {
              setValue(value);
            }
          }}
          className={cx(
            `py-3 px-4 flex-grow w-12`,
            `border border-slate-200 rounded-xl`,
            `transition-[border-color,ring-color] duration-150`,
            `text-slate-600 placeholder:text-slate-400/90 placeholder:antialiased`,
            `ring-0 ring-slate-200 outline-none focus:shadow-md focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1`,
            `dark:bg-slate-700/20 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-white`,
            !isInput(props) && props.noResize && `resize-none`,
            isInput(props) && props.unit && `rounded-r-none`,
            isInput(props) && props.prefix && `xs:rounded-l-none`,
          )}
        />
        {isInput(props) && props.unit && (
          <div className="flex justify-center items-center p-3 bg-slate-50 dark:bg-slate-700/50 border border-l-0 dark:border-slate-700 rounded-r-xl">
            <h3 className="text-slate-500 dark:text-slate-400">{props.unit}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;

// helpers

function isPositiveInteger(value: string): boolean {
  return (
    value.match(/^[0-9]+$/) !== null &&
    Number.isInteger(Number(value)) &&
    Number(value) >= 0
  );
}

function isInput(props: { type: Props[`type`] }): props is {
  type: InputType;
} & InputProps {
  return props.type !== `textarea`;
}
