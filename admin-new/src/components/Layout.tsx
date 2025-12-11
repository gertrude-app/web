import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();

  const navLinks = [
    { to: `/`, label: `Dashboard` },
    { to: `/parents`, label: `Parents` },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-violet-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">
                Gertrude Admin
              </Link>
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? `bg-violet-800 text-white`
                        : `text-violet-100 hover:bg-violet-600`
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-violet-100 hover:text-white hover:bg-violet-600 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
