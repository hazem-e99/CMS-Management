import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { publicPagesService } from '../../../services/publicPagesService';
import { settingsService } from '../../../services/settingsService';
import { Menu, X, ChevronDown, Sun, Moon, Globe } from 'lucide-react';

export function PublicNavbar() {
  const { language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: menu } = useQuery({
    queryKey: ['navigationMenu'],
    queryFn: publicPagesService.getNavigationMenu,
  });

  const { data: settingsData } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const settings = settingsData?.data || {};
  const logo = settings.logo || {};
  const siteName = settings.siteName || { en: 'PGS', ar: 'PGS', ku: 'PGS' };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'ku', label: 'کوردی' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {logo.url ? (
              <img 
                src={logo.url} 
                alt={logo.alt?.[language] || siteName[language]} 
                className="h-10 object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {siteName[language] || siteName.en}
              </span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {menu?.map((item) => (
              <div key={item.id} className="relative group">
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <span>{item.title[language] || item.title.en}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full start-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/${item.slug}/${child.slug}`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            {child.title[language] || child.title.en}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={`/${item.slug}`}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {item.title[language] || item.title.en}
                  </Link>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>
              <div className="absolute top-full end-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-700">
            {menu?.map((item) => (
              <div key={item.id}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span>{item.title[language] || item.title.en}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.id && (
                      <div className="bg-gray-50 dark:bg-gray-900">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/${item.slug}/${child.slug}`}
                            className="block px-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.title[language] || child.title.en}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={`/${item.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title[language] || item.title.en}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Theme & Language */}
            <div className="mt-4 pt-4 border-t dark:border-gray-700 px-4 space-y-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
