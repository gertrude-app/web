import { createIcons, icons } from 'lucide';
import type { Component } from 'solid-js';

const LoadIcons: Component = () => {
  createIcons({ icons });
  return null;
};

export default LoadIcons;
