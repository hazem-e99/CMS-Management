import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const { user, logout } = useAuth();

  const languageNames = {
    en: 'English',
    ar: 'العربية',
    ku: 'کوردی',
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - could add breadcrumbs here */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {/* Page title will be set by individual pages */}
            </h1>
          </div>

          {/* Right side - User info, Theme and Language toggles */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            {user && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.email || user.userName || 'Admin'}
                </span>
              </div>
            )}

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         px-4 py-2 pe-8 rounded-md border border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang]}
                  </option>
                ))}
              </select>
              <Globe className="absolute end-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? Sun : Moon}
              aria-label={t('theme.toggle')}
            />

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              icon={LogOut}
              aria-label="Logout"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
