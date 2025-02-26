import { Component, createSignal } from 'solid-js';
import ComponentDemo from '~/site-components/ComponentDemo';
import PageHeading from '~/ui-lib/components/PageHeading';
import Select from '~/ui-lib/components/Select';

type Size = 'Extra small' | 'Small' | 'Medium' | 'Large' | 'Extra large';

const SelectPage: Component = () => {
  const [size, setSize] = createSignal<Size>('Medium');

  return (
    <div>
      <PageHeading subheading="A simple menu for selecting from various options.">
        Select
      </PageHeading>
      <ComponentDemo
        stories={[
          {
            title: 'Multiple options',
            component: (
              <Select
                selected={size()}
                onSelect={setSize}
                options={[
                  { value: 'Extra small', label: 'Extra small' },
                  { value: 'Small', label: 'Small' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Large', label: 'Large' },
                  { value: 'Extra large', label: 'Extra large' },
                ]}
              />
            ),
          },
          {
            title: 'Only one option',
            component: (
              <Select
                selected={size()}
                onSelect={setSize}
                options={[{ value: 'Medium', label: 'Medium' }]}
              />
            ),
          },
        ]}
        class="mt-8"
      />
    </div>
  );
};

export default SelectPage;
