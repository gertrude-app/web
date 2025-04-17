import type { Component, JSXElement } from 'solid-js';

interface Props {
  href: string;
  icon?: string;
  children: JSXElement;
}

const SidebarLink: Component<Props> = (props) => (
  <a
    class="flex items-center gap-2 hover:bg-gray-200 px-2 py-1.5 rounded-lg transition-colors duration-100 active:bg-gray-300"
    href={props.href}
  >
    {props.icon && <i data-lucide={props.icon} class="size-5 text-gray-500" />}
    <span class="text-gray-700">{props.children}</span>
  </a>
);

export default SidebarLink;
