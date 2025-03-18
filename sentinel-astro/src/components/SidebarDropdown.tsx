import { createSignal, type Component } from 'solid-js';
import cx from 'clsx';
import type { SidebarItem } from '../lib/types';
import SidebarLink from './SidebarLink';

interface Props {
  title: string;
  icon?: string;
  items: SidebarItem[];
}

const SidebarDropdown: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(true);

  return (
    <div class="flex flex-col">
      <button
        class="flex items-center justify-between hover:bg-gray-200 px-2 py-1.5 rounded-lg transition-colors duration-100"
        onClick={() => setOpen(!open())}
      >
        <div class="flex items-center gap-2">
          {props.icon && (
            <i data-lucide={props.icon} class="size-5 text-gray-500 shrink-0" />
          )}
          <span class="text-gray-700">{props.title}</span>
        </div>
        <div class={cx(!open() && `-rotate-90`, 'transition-transform duration-100')}>
          <i data-lucide="chevron-down" />
        </div>
      </button>
      <div
        class={cx(
          open() ? 'h-auto mb-4' : 'h-0',
          'overflow-hidden transition-[height,margin-bottom] duration-150',
        )}
      >
        {props.items.map((item) =>
          item.type === 'link' ? (
            <SidebarLink text={item.text} href={item.href} icon={item.icon} />
          ) : (
            <SidebarDropdown title={item.text} items={item.items} icon={item.icon} />
          ),
        )}
      </div>
    </div>
  );
};

export default SidebarDropdown;
