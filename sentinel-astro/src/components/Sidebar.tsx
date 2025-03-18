import type { Component } from 'solid-js';
import type { SidebarItem } from '../lib/types';
import SidebarSection from './SidebarSection';
import SidebarSpacer from './SidebarSpacer';

interface Props {
  logo: string;
  items: Array<
    | {
        type: 'section';
        title?: string;
        contents: SidebarItem[];
      }
    | {
        type: 'spacer';
      }
  >;
}

const Sidebar: Component<Props> = (props) => {
  return (
    <nav class="w-68 flex flex-col p-2">
      <div class="flex h-10 justify-between items-center">
        <img src={props.logo} alt="Logo" class="h-full" />
        <button class="hover:bg-gray-200 flex justify-center items-center rounded-lg transition-colors duration-100 cursor-pointer active:bg-gray-300/60 py-1.5 pr-1.5 group">
          <i
            data-lucide="chevron-left"
            class="text-gray-500 shrink-0 w-0 group-hover:w-7 transition-[width] duration-100"
          ></i>
          <i data-lucide="panel-left" class="text-gray-500 shrink-0"></i>
        </button>
      </div>
      <div class="mt-6 flex flex-col gap-8 flex-grow">
        {props.items.map((item) =>
          item.type === 'section' ? (
            <SidebarSection title={item.title} items={item.contents} />
          ) : (
            <SidebarSpacer />
          ),
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
