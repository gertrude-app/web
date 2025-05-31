import type { Component, JSXElement } from 'solid-js';
import Sidebar from '../components/Sidebar';

interface Props {
  logo: string;
  content: JSXElement;
  children: JSXElement;
}

const SidebarNavLayout: Component<Props> = (props) => (
  <div class="flex min-h-screen bg-gray-100 p-2">
    <Sidebar logo={props.logo}>{props.children}</Sidebar>
    <main class="flex-grow bg-white shadow-md rounded-lg p-8 shadow-gray-300/40 ml-71">
      {props.content}
    </main>
  </div>
);

export default SidebarNavLayout;
