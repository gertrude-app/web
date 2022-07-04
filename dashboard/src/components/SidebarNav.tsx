import React from 'react';
import Logo from '@shared/Logo';
import SidebarOption from './SidebarOption';

interface Props {
  expanded: boolean;
  setExpanded(expanded: boolean): void;
  open: boolean;
  setOpen(open: boolean): void;
}

const SidebarNav: React.FC<Props> = ({ expanded, setExpanded, open, setOpen }) => (
  <nav
    className={`bg-gradient-to-b from-violet-500 to-violet-700 -ml-80 relative z-40 ${
      open ? (expanded ? `left-80` : `left-20`) : `left-0`
    } lg:-ml-0 flex flex-col justify-between items-start overflow-hidden [transition:200ms] ${
      expanded ? `w-80` : `w-20`
    }`}
  >
    <div
      className="absolute lg:hidden right-0 top-0 p-4 cursor-pointer text-white text-opacity-50 hover:text-opacity-60"
      onClick={() => setOpen(false)}
    >
      <i className="fa fa-times text-2xl transition duration-100" />
    </div>
    <div className={`${expanded ? `p-4` : `py-4`}`}>
      <Logo
        type="inverted"
        className={`m-2 mb-10 mt-8 ${expanded ? `ml-4` : `ml-[1.2em]`}`}
        iconOnly={!expanded}
      />
      <div className="mt-5 pb-4">
        <SidebarOption icon="home" selected={false} expanded={expanded}>
          Dashboard
        </SidebarOption>
        <SidebarOption icon="shield" selected={false} expanded={expanded}>
          Digital guardians
        </SidebarOption>
        <SidebarOption icon="users" selected={true} expanded={expanded}>
          Guarded users
        </SidebarOption>
        <SidebarOption icon="key" selected={false} expanded={expanded}>
          Keychains
        </SidebarOption>
      </div>
      <div className="border-t-4 border-white border-opacity-10 pt-4">
        <SidebarOption icon="user" selected={false} expanded={expanded}>
          Profile
        </SidebarOption>
        <SidebarOption icon="cog" selected={false} expanded={expanded}>
          Settings
        </SidebarOption>
      </div>
    </div>
    <div
      className={`items-center justify-start px-6 w-80 ${
        expanded ? `py-5 px-6` : `h-16 pl-8`
      } self-stretch bg-black bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition duration-100 hidden lg:flex`}
      onClick={() => setExpanded(!expanded)}
    >
      <i
        className={`fas fa-chevron-${
          expanded ? `left mr-3` : `right`
        } text-2xl text-white text-opacity-60`}
      />
      <h2
        className={`font-bold text-xl text-white text-opacity-80 min-w-40 ${
          expanded ? `block` : `hidden`
        }`}
      >
        Collapse sidebar
      </h2>
    </div>
  </nav>
);

export default SidebarNav;