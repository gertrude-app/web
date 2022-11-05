import cx from 'classnames';
import React, { useState } from 'react';
import { Combobox as HeadlessCombobox } from '@headlessui/react';

interface Props<Value extends string = string> {
  options: Array<{ value: Value; display: string }>;
  selected: { value: Value; display: string };
  setSelected(selected: Value): void;
}

function Combobox<Value extends string = string>({
  options,
  selected,
  setSelected,
}: Props<Value>): JSX.Element {
  const [query, setQuery] = useState(``);
  const filteredOptions =
    query === ``
      ? options
      : options.filter((option) => {
          return option.display.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <HeadlessCombobox
      as="div"
      value={selected}
      onChange={(option: { value: Value }) => setSelected(option.value)}
    >
      <div className="relative mt-1 rounded-lg border">
        <HeadlessCombobox.Input
          className="w-full rounded-lg bg-white py-3 pl-4 pr-10 shadow border-none outline-none focus:ring-indigo-500 focus:ring-2 focus:ring-offset-1 sm:text-md transition duration-100"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: { display: string }) => option.display}
        />
        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 focus:outline-none hover:bg-gray-50">
          <i
            className="fa-solid fa-chevron-down h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </HeadlessCombobox.Button>

        {filteredOptions.length > 0 && (
          <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <HeadlessCombobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  cx(
                    `relative cursor-pointer select-none py-2 pl-3 pr-9`,
                    active ? `bg-violet-700 text-white` : `text-gray-900`,
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={cx(`block truncate`, selected && `font-semibold`)}>
                      {option.display}
                    </span>

                    {selected && (
                      <span
                        className={cx(
                          `absolute inset-y-0 right-0 flex items-center pr-4`,
                          active ? `text-white` : `text-indigo-600`,
                        )}
                      >
                        <i
                          className="fa-solid fa-check h-5 w-5 bg-pink-500"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )}
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        )}
      </div>
    </HeadlessCombobox>
  );
}

export default Combobox;