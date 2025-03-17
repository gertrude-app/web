import { Component, JSX } from 'solid-js';
import TintedBg from '../components/TintedBg';
import Card from '../components/Card';

interface Props {
  children: JSX.Element;
  content: JSX.Element;
}

const SidebarLayout: Component<Props> = (props) => {
  return (
    <TintedBg class="min-h-screen flex">
      <Card class="w-72 flex flex-col p-3 m-4 gap-8 shrink-0">{props.children}</Card>
      <main class="flex-grow pt-4 px-8">{props.content}</main>
    </TintedBg>
  );
};

export default SidebarLayout;
