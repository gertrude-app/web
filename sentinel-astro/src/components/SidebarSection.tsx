import type { Component } from 'solid-js';
import type { SidebarItem } from '../lib/types';
import SidebarLink from './SidebarLink';
import SidebarDropdown from './SidebarDropdown';

interface Props {
  title?: string;
  items: SidebarItem[];
}

const SidebarSection: Component<Props> = (props) => {
  return (
    <div class="flex flex-col gap-1">
      {props.title && (
        <div class="flex items-center gap-3">
          <h3 class="text-gray-400/80 uppercase font-medium text-xs">{props.title}</h3>
          <div class="flex-grow h-0.5 bg-gray-200" />
        </div>
      )}
      <div class="-mx-2">
        {props.items.map((item) =>
          item.type === 'link' ? (
            <SidebarLink href={item.href} text={item.text} icon={item.icon} />
          ) : (
            <SidebarDropdown title={item.text} items={item.items} icon={item.icon} />
          ),
        )}
      </div>
    </div>
  );
};

export default SidebarSection;
