import { Component, JSX } from 'solid-js';
import cx from 'clsx';
import BgImage from '../../assets/bg.png';

interface Props {
  children: JSX.Element;
  class?: string;
}

const TintedBg: Component<Props> = (props) => (
  <div
    style={{
      'background-image': `url(${BgImage})`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
    }}
    class={cx(`relative [&>*]:relative [&>*]:z-10`, props.class)}
  >
    <div class="!absolute !z-0 w-full h-full left-0 top-0 bg-white/85" />
    {props.children}
  </div>
);

export default TintedBg;
