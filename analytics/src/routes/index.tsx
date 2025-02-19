import { GlassPanel, Sidebar } from '@gertrude/sentinel';
import { Component } from 'solid-js';

const Home: Component = () => {
  return (
    <Sidebar>
      <div class="p-6 relative">
        <div class="w-40 h-40 bg-red-500 absolute right-12 top-32" />
        <div class="w-40 h-30 bg-blue-500 absolute right-120 top-4" />
        <div class="w-40 h-48 bg-violet-500 absolute left-32 top-40" />
        <GlassPanel class="p-12">
          <p>lorem ipsum dolor sit</p>
        </GlassPanel>
        <GlassPanel class="p-12 mt-60">
          <p>lorem ipsum dolor sit</p>
        </GlassPanel>
      </div>
    </Sidebar>
  );
};

export default Home;
