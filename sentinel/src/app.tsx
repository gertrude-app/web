import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { clientOnly } from '@solidjs/start';
import './app.css';
import '@fontsource-variable/nunito-sans';
import SidebarLayout from './ui/layouts/SidebarLayout';
import SidebarSection from './ui/components/SidebarSection';
import SidebarLink from './ui/components/SidebarLink';
import SidebarDropdown from './ui/components/SidebarDropdown';

const HomeIcon = clientOnly(() => import(`lucide-solid/icons/home`));
const ExternalLinkIcon = clientOnly(() => import(`lucide-solid/icons/external-link`));
const QuestionMarkIcon = clientOnly(() => import(`lucide-solid/icons/circle-help`));
const SquareIcon = clientOnly(() => import(`lucide-solid/icons/square`));
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
                <SidebarLink
                  href="/components/glass-panel"
                  text="GlassPanel"
                  icon={SquareIcon}
                />
                <SidebarLink
                  href="/components/sidebar-dropdown"
                  text="SidebarDropdown"
                  icon={SquareIcon}
                />
                <SidebarLink
                  href="/components/sidebar-link"
                  text="SidebarLink"
                  icon={SquareIcon}
                />
                <SidebarLink
                  href="/components/sidebar-section"
                  text="SidebarSection"
                  icon={SquareIcon}
                />
                <SidebarLink
                  href="/components/tinted-bg"
                  text="TintedBg"
                  icon={SquareIcon}
                />
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
