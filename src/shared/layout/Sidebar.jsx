import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Layout, ClipboardList, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/cn';

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'nav.pages', href: '/pages', icon: FileText },
  { name: 'nav.surveys', href: '/surveys', icon: ClipboardList },
];

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6">
            <Layout className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </span>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      )}
                    />
                    {t(item.name)}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar - simplified for now */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center">
          <Layout className="h-6 w-6 text-primary-600" />
          <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </span>
        </div>
      </div>
    </>
  );
}
