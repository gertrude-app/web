import { children, Component, createSignal, JSX } from 'solid-js';
import cx from 'clsx';
import { LucideIcon, ChevronRightIcon } from 'lucide-solid';

interface Props {
  text: string;
  children: JSX.Element;
  icon?: LucideIcon;
}

const SidebarDropdown: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false);

  const resolved = children(() => props.children);

  return (
    <div class="flex flex-col SidebarItem">
      <button
        class="flex justify-between items-center transition-[background-color,scale] duration-100 hover:bg-violet-600/5 active:bg-violet-600/8 active:scale-98 px-2.5 py-1.5 rounded-xl select-none"
        onClick={() => setOpen(!open())}
      >
        <div class="flex items-center gap-2">
          {props.icon && <props.icon class={cx('w-5 h-5 text-violet-900/50')} />}
          <span class="font-medium text-violet-950/70">{props.text}</span>
        </div>
        <ChevronRightIcon
          class={cx(
            'w-5 h-5 text-violet-900/50 transition-transform duration-150',
            open() && 'rotate-90',
          )}
        />
      </button>
      <div
        class={cx(
          'flex relative pl-4.75 gap-2 transition-[height,padding] duration-200 overflow-hidden',
          open() ? `h-auto pb-4` : `h-0 pb-0`,
        )}
      >
        <div class="w-[1.5px] bg-violet-800/10 mb-1" />
        <div class="flex flex-col flex-grow">
          {resolved.toArray().map((child, i) => (
            <div
              class={cx(
                'transition-[opacity,filter,translate] duration-300',
                !open() && `opacity-0 blur -translate-x-2`,
              )}
              style={{ 'transition-delay': `${i * 20}ms` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDropdown;
