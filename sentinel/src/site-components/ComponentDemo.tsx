import { Component, createSignal, JSX } from 'solid-js';
import cx from 'clsx';
import Select from '~/ui-lib/components/Select';

interface Props {
  stories: Array<{
    title: string;
    component: JSX.Element;
  }>;
  class?: string;
}

const ComponentDemo: Component<Props> = (props) => {
  const [shownStory, setShownStory] = createSignal(props.stories[0]?.title ?? ``);

  return (
    <div
      class={cx(
        'border border-violet-800/20 p-16 rounded-3xl max-w-3xl flex justify-center items-center min-h-72 relative',
        props.class,
      )}
    >
      <Select
        selected={shownStory()}
        options={props.stories.map((s) => ({ value: s.title, label: s.title }))}
        onSelect={setShownStory}
        class="!absolute left-3 top-3"
      />
      {props.stories.find((s) => s.title === shownStory())?.component}
      <span class="absolute -top-2.5 bg-[#F1EBFF] px-2 text-violet-800/30 font-semibold uppercase text-sm">
        Demo
      </span>
    </div>
  );
};

export default ComponentDemo;
