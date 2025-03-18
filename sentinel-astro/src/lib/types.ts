export type SidebarItem =
  | { type: 'link'; href: string; text: string; icon?: string }
  | { type: 'dropdown'; text: string; icon?: string; items: SidebarItem[] };
