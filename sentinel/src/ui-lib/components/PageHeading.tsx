import { Component, JSX } from 'solid-js';

interface Props {
  children: JSX.Element;
  subheading?: string;
}

const PageHeading: Component<Props> = (props) => {
  return (
    <div>
      <h1 class="text-4xl font-nunito font-bold mt-6">{props.children}</h1>
      {props.subheading && (
        <h2 class="mt-0.5 text-violet-950/70 tracking-wide">{props.subheading}</h2>
      )}
    </div>
  );
};

export default PageHeading;
