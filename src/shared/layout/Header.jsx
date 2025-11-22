import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, availableLanguages } = useLanguage();

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

          {/* Right side - Theme and Language toggles */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         px-4 py-2 pr-8 rounded-md border border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang]}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'dark' ? Sun : Moon}
              aria-label={t('theme.toggle')}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
