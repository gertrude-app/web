import { createSignal, type Component, type JSXElement } from 'solid-js';
import cx from 'clsx';

interface Props {
  title: string;
  icon?: string;
  children: JSXElement;
}

const SidebarDropdown: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex flex-col">
      <button
        class="flex items-center justify-between hover:bg-gray-200 px-2 py-1.5 rounded-lg transition-colors duration-100"
        onClick={() => {
          setOpen(!open());
        }}
      >
        <div class="flex items-center gap-2">
          {props.icon && (
            <i data-lucide={props.icon} class="size-5 text-gray-500 shrink-0" />
          )}
          <span class="text-gray-700">{props.title}</span>
        </div>
        <div class={cx(!open() && `-rotate-90`, `transition-transform duration-100`)}>
          <i data-lucide="chevron-down" class="text-gray-500" />
        </div>
      </button>
      <div
        class={cx(
          open() ? `h-auto mb-4` : `h-0`,
          `overflow-hidden transition-[height,margin-bottom] duration-150 flex pl-4 gap-2`,
        )}
      >
        <div class="w-0.5 bg-gray-300 mt-1" />
        <div class="flex-grow">{props.children}</div>
      </div>
    </div>
  );
};

export default SidebarDropdown;
