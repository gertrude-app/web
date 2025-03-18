import type { Component } from 'solid-js';

interface Props {
  href: string;
  text: string;
  icon?: string;
}

const SidebarLink: Component<Props> = (props) => {
  return (
    <a
      class="flex items-center gap-2 hover:bg-gray-200 px-2 py-1.5 rounded-lg transition-colors duration-100"
      href={props.href}
    >
      {props.icon && <i data-lucide={props.icon} class="size-5 text-gray-500" />}
      <span class="text-gray-700">{props.text}</span>
    </a>
  );
};

export default SidebarLink;
