import { Component, JSX } from 'solid-js';
import cx from 'clsx';

interface Props {
  children: JSX.Element;
  class?: string;
  // FIXME: this should probably just pass along all props that can be applied to a div; alternatively, there could be an option to be rendered as a button
  // see `Solid.JSX.IntrinsicElements` in this example: https://tanstack.com/router/latest/docs/framework/solid/guide/custom-link#basic-example
  onClick?: (event: MouseEvent) => void;
}

const Card: Component<Props> = (props) => {
  return (
    <div
      class={cx(
        'relative [&>*]:relative [&>*]:z-10 rounded-2xl shadow-lg shadow-violet-950/4 backdrop-blur-[60px]',
        props.class,
      )}
      onClick={props.onClick}
    >
      <div class="!absolute !z-0 w-full h-full left-0 top-0 bg-gradient-to-b from-white/80 to-white/50 rounded-2xl" />
      <div class="!absolute !z-0 w-[calc(100%-2px)] h-[calc(100%-4px)] left-[1px] top-[2.5px] bg-gradient-to-b from-[#EE92FF]/6 to-[#EE92FF]/2 rounded-[14px]" />

      {props.children}
    </div>
  );
};

export default Card;
