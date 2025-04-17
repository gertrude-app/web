import type { Component, JSXElement } from 'solid-js';

interface Props {
  logo: string;
  children: JSXElement;
}

const Sidebar: Component<Props> = (props) => (
  <nav class="w-68 flex flex-col p-2 h-[calc(100vh-16px)] fixed">
    <div class="flex h-8 justify-between items-center">
      <img src={props.logo} alt="Logo" class="h-full" />
      <button class="hover:bg-gray-200 flex justify-center items-center rounded-lg transition-colors duration-100 cursor-pointer active:bg-gray-300/60 py-1.5 pr-1.5 group">
        <i
          data-lucide="chevron-left"
          class="text-gray-500 shrink-0 w-0 group-hover:w-7 transition-[width] duration-100"
        ></i>
        <i data-lucide="panel-left" class="text-gray-500 shrink-0"></i>
      </button>
    </div>
    <div class="mt-10 flex flex-col gap-8 flex-grow">{props.children}</div>
  </nav>
);

export default Sidebar;
