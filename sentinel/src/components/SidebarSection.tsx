import type { Component, JSXElement } from 'solid-js';

interface Props {
  title?: string;
  children: JSXElement;
}

const SidebarSection: Component<Props> = (props) => (
  <div class="flex flex-col gap-1">
    {props.title && (
      <div class="flex items-center gap-3">
        <h3 class="text-gray-400/80 uppercase font-semibold text-[10px]">
          {props.title}
        </h3>
        <div class="flex-grow h-0.5 bg-gray-200" />
      </div>
    )}
    <div class="-mx-2">{props.children}</div>
  </div>
);

export default SidebarSection;
