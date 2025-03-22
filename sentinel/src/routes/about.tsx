import { createFileRoute } from '@tanstack/solid-router';
import type { Component } from 'solid-js';

export const Route = createFileRoute(`/about`)({
  component: () => <AboutPage />,
});

const AboutPage: Component = () => <div>Hello "/about"!</div>;
