import { Component } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';

export const Route = createFileRoute('/')({
  component: () => <Home />,
});

const Home: Component = () => {
  return (
    <div class="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
};
