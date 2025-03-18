import type { Component } from 'solid-js';
import { ChevronDown, ChevronLeft, createIcons, ExternalLink, PanelLeft } from 'lucide';

const ImportIcons: Component = () => {
  createIcons({ icons: { ChevronLeft, ChevronDown, ExternalLink, PanelLeft } });
  return null;
};

export default ImportIcons;
