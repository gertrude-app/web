import { createFileRoute } from '@tanstack/solid-router';
import type { Component } from 'solid-js';

export const Route = createFileRoute(`/`)({
  component: () => <HomePage />,
});

const HomePage: Component = () => <main>hi!</main>;
