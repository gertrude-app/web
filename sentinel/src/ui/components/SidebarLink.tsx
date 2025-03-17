import { Component, JSX } from 'solid-js';
import { LucideIcon } from 'lucide-solid';

interface Props {
  href: string;
  children: JSX.Element;
  icon?: LucideIcon;
  activeWhen?: boolean;
}

const SidebarLink: Component<Props> = (props) => {
  return (
    <a
      href={props.href}
      class="flex items-center gap-2 transition-[background-color,scale] duration-100 hover:bg-violet-600/5 active:bg-violet-600/8 active:scale-98 px-2.5 py-1.5 rounded-xl select-none SidebarItem"
    >
      {props.icon && <props.icon class="w-5 h-5 text-violet-900/50" />}
      <span class="font-medium text-violet-950/70">{props.children}</span>
    </a>
  );
};

export default SidebarLink;
