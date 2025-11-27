import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { publicPagesService } from '../../../services/publicPagesService';
import { settingsService } from '../../../services/settingsService';
import { API_CONFIG } from '../../../api/config';
import { Menu, X, ChevronDown, Sun, Moon, Globe, LogIn } from 'lucide-react';

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
  const headerSettings = settings.site_header || {};
  
  // Default values
  const defaultInstituteName = { en: 'Institute for People and Politics', ar: 'معهد الشعب والسياسة', ku: 'پەیمانگەی گەل و سیاسەت' };
  const defaultSlogan = { en: 'Your future starts today', ar: 'مستقبلك يبدأ اليوم', ku: 'داهاتووت ئەمڕۆ دەست پێ دەکات' };
  
  const getImageUrl = (url) => {
    if (!url) return '/logo.png';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    
    // Remove /api from the end of baseURL if present
    const baseUrl = API_CONFIG.baseURL.endsWith('/api') 
      ? API_CONFIG.baseURL.slice(0, -4) 
      : API_CONFIG.baseURL;
      
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const instituteName = headerSettings.instituteName || defaultInstituteName;
  const slogan = headerSettings.slogan || defaultSlogan;
  const logoUrl = getImageUrl(headerSettings.logo?.url);

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

  const getItemTitle = (item) => {
    if (!item) return '';
    
    // Try API format (nameEn, nameAr, nameKu)
    const apiName = item[`name${language.charAt(0).toUpperCase() + language.slice(1)}`];
    if (apiName) return apiName;
    
    // Fallback to nameEn
    if (item.nameEn) return item.nameEn;
    
    // Try title object format (for backward compatibility)
    if (item.title) {
      if (typeof item.title === 'object') {
        return item.title[language] || item.title.en || '';
      }
      return item.title;
    }
    
    // Try name object format
    if (item.name) {
      if (typeof item.name === 'object') {
        return item.name[language] || item.name.en || '';
      }
      return item.name;
    }
    
    return '';
  };

  return (
    <>
      {/* 1. Top Strip: Toggles Only */}
      <div className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-800 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8">
            
            {/* Login Link */}
            <Link 
              to="/login" 
              className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title={language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'دخول' : 'Login'}</span>
            </Link>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                onClick={toggleTheme}
                className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span>{theme === 'dark' ? (language === 'ar' ? 'وضع النهار' : 'Light Mode') : (language === 'ar' ? 'وضع الليل' : 'Dark Mode')}</span>
                </button>

                {/* Language Selector */}
                <div className="relative group z-50">
                <button className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Globe className="h-3.5 w-3.5" />
                    <span className="uppercase">{language}</span>
                    <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full end-0 mt-1 w-28 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                    {languages.map((lang) => (
                        <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`block w-full text-start px-3 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            language === lang.code ? 'text-primary-600 font-bold bg-primary-50 dark:bg-primary-900/10' : 'text-gray-600 dark:text-gray-300'
                        }`}
                        >
                        {lang.label}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. Header: Logo & Text */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Right Side (Start in RTL): Institute Name */}
                <div className="text-center md:text-start order-2 md:order-1">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {instituteName[language] || instituteName.en}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {instituteName[language] || instituteName.en}
                    </p>
                </div>

                {/* Center: Slogan */}
                <div className="text-center order-3 md:order-2 hidden md:block">
                    <p className="text-lg font-medium text-primary-600 dark:text-primary-400 italic">
                        {slogan[language] || slogan.en}
                    </p>
                </div>

                {/* Left Side (End in RTL): Logo */}
                <div className="order-1 md:order-3">
                    <Link to="/" className="block">
                        <img 
                        src={logoUrl} 
                        alt="PGS Logo" 
                        className="h-16 md:h-20 object-contain"
                        />
                    </Link>
                </div>

            </div>
        </div>
      </div>

      {/* 3. Main Navbar: Navigation Menu */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            
            {/* Desktop Menu (Centered) */}
            <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                {menu?.map((item) => {
                    const children = item.pages || item.children || [];
                    return (
                    <div key={item.id} className="relative group">
                        {children.length > 0 ? (
                        <>
                            <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            {getItemTitle(item)}
                            <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                            <div className="absolute top-full start-0 mt-0 w-56 bg-white dark:bg-gray-800 rounded-b-md shadow-lg border-t-2 border-primary-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="py-2">
                                {children.map((child) => (
                                <Link
                                    key={child.id}
                                    to={`/${item.slug || item.nameEn?.toLowerCase()}/${child.slug || child.nameEn?.toLowerCase()}`}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 transition-colors"
                                >
                                    {getItemTitle(child)}
                                </Link>
                                ))}
                            </div>
                            </div>
                        </>
                        ) : (
                        <Link
                            to={`/${item.slug || item.nameEn?.toLowerCase()}`}
                            className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                            {getItemTitle(item)}
                        </Link>
                        )}
                    </div>
                    );
                })}
                </div>
            </div>

            {/* Mobile Menu Button (Visible only on mobile) */}
            <div className="md:hidden flex items-center justify-between w-full">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'القائمة' : 'Menu'}
                </span>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t dark:border-gray-700">
              {menu?.map((item) => {
                const children = item.pages || item.children || [];
                return (
                  <div key={item.id}>
                    {children.length > 0 ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-sm font-medium">{getItemTitle(item)}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openDropdown === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openDropdown === item.id && (
                          <div className="bg-gray-50 dark:bg-gray-900">
                            {children.map((child) => (
                              <Link
                                key={child.id}
                                to={`/${item.slug || item.nameEn?.toLowerCase()}/${child.slug || child.nameEn?.toLowerCase()}`}
                                className="block px-8 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {getItemTitle(child)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={`/${item.slug || item.nameEn?.toLowerCase()}`}
                        className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {getItemTitle(item)}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
