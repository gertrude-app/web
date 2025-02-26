import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { clientOnly } from '@solidjs/start';

import '@fontsource-variable/nunito-sans';
import './app.css';

import SidebarLayout from '~/ui-lib/layouts/SidebarLayout';
import SidebarSection from '~/ui-lib/components/SidebarSection';
import SidebarLink from '~/ui-lib/components/SidebarLink';
import SidebarDropdown from '~/ui-lib/components/SidebarDropdown';

const HomeIcon = clientOnly(() => import(`lucide-solid/icons/home`));
const ExternalLinkIcon = clientOnly(() => import(`lucide-solid/icons/external-link`));
const QuestionMarkIcon = clientOnly(() => import(`lucide-solid/icons/circle-help`));
const SidebarIcon = clientOnly(() => import(`lucide-solid/icons/sidebar`));
const LayoutIcon = clientOnly(() => import(`lucide-solid/icons/layout-panel-left`));
const ComponentsIcon = clientOnly(() => import(`lucide-solid/icons/layout-grid`));

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <SidebarLayout content={props.children}>
            <SidebarSection>
              <SidebarLink href="/" text="Home" icon={HomeIcon} />
              <SidebarLink href="/about" text="About" icon={QuestionMarkIcon} />
              <SidebarLink
                href="https://gertrude.app"
                text="Gertrude"
                icon={ExternalLinkIcon}
              />
            </SidebarSection>
            <SidebarSection heading="UI Components">
              <SidebarDropdown text="Components" icon={ComponentsIcon}>
                <SidebarLink href="/components/card" text="Card" />
                <SidebarDropdown text="Sidebar">
                  <SidebarLink
                    href="/components/sidebar-dropdown"
                    text="SidebarDropdown"
                  />
                  <SidebarLink href="/components/sidebar-link" text="SidebarLink" />
                  <SidebarLink href="/components/sidebar-section" text="SidebarSection" />
                </SidebarDropdown>
                <SidebarLink href="/components/select" text="Select" />
                <SidebarLink href="/components/tinted-bg" text="TintedBg" />
              </SidebarDropdown>
              <SidebarDropdown text="Layouts" icon={LayoutIcon}>
                <SidebarLink
                  href="/layouts/sidebar-layout"
                  text="SidebarLayout"
                  icon={SidebarIcon}
                />
              </SidebarDropdown>
            </SidebarSection>
          </SidebarLayout>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
