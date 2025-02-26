import { Component, createSignal } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import cx from 'clsx';
import Card from './Card';
import { effect } from 'solid-js/web';

const ChevronIcon = clientOnly(() => import(`lucide-solid/icons/chevron-down`));

interface Props<T> {
  selected: T;
  options: Array<{ value: T; label: string }>;
  onSelect: (value: T) => void;
  class?: string;
}

export default function Select<T extends string = string>(
  props: Props<T>,
): ReturnType<Component<Props<T>>> {
  const [open, setOpen] = createSignal(false);

  effect(() => {
    if (open()) {
      document.addEventListener('click', () => setOpen(false), {
        once: true,
        passive: true,
      });
    }
  });

  return (
    <div class={cx('relative', props.class)}>
      <Card
        class={cx(
          'px-3 py-1 flex items-center gap-2 cursor-default select-none w-44 justify-between transition-scale duration-100',
          props.options.length <= 1
            ? `opacity-60 !cursor-not-allowed`
            : `group active:scale-98`,
        )}
        onClick={() => {
          if (props.options.length > 1) {
            setOpen(!open());
          }
        }}
      >
        <div class="text-violet-950/60 group-hover:text-violet-950/80 font-medium transition-colors duration-100 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {props.selected}
        </div>
        <ChevronIcon
          class={cx(
            'w-5 h-5 text-violet-950/40 group-hover:text-violet-950/60 transition-colors duration-100 shrink-0',
          )}
        />
      </Card>
      <Card
        class={cx(
          '!absolute left-0 top-10 w-44 p-1.5 flex flex-col',
          open()
            ? `transition-[opacity,translate] duration-150`
            : `opacity-0 pointer-events-none -translate-y-2`,
        )}
      >
        {props.options.map((o) => (
          <button
            onClick={() => {
              props.onSelect(o.value);
              setOpen(false);
            }}
            class={cx(
              'text-left hover:bg-violet-600/5 text-violet-950/80 px-2 py-2 rounded-[10px] active:bg-violet-600/10 active:scale-98 transition-[background-color,transform] duration-100 leading-[1.1rem]',
              o.value === props.selected && `font-medium bg-violet-600/5`,
            )}
          >
            {o.label}
          </button>
        ))}
      </Card>
    </div>
  );
}
