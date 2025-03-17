import { Component, JSX } from 'solid-js';

interface Props {
  heading?: string;
  children: JSX.Element;
}

const SidebarSection: Component<Props> = (props) => {
  return (
    <div class="flex flex-col gap-1">
      {props.heading && (
        <div class="flex items-center gap-3 ml-3 mr-2">
          <h4 class="text-xs uppercase font-semibold text-violet-800/30">
            {props.heading}
          </h4>
          <div class="flex-grow h-0.5 bg-violet-950/6 rounded-full" />
        </div>
      )}
      <div>{props.children}</div>
    </div>
  );
};

export default SidebarSection;
