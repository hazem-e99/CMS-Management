import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicPagesService } from '../../../services/publicPagesService';
import { SectionRenderer } from '../../pageBuilder/components/SectionRenderer';
import { useLanguage } from '../../../contexts/LanguageContext';
import { transformComponentsToSections } from '../../pageBuilder/utils/transformers';

export function PublicPage() {
  const { slug, childSlug } = useParams();
  const { language } = useLanguage();
  
  // Determine which slug to use
  const pageSlug = childSlug || slug;

  const { data: page, isLoading, error } = useQuery({
    queryKey: ['publicPage', pageSlug],
    queryFn: () => publicPagesService.getPageBySlug(pageSlug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'جاري التحميل...' : language === 'ku' ? 'بارکردن...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {language === 'ar' ? 'الصفحة غير موجودة' : language === 'ku' ? 'پەڕە نەدۆزرایەوە' : 'Page Not Found'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {language === 'ar' ? 'العودة للرئيسية' : language === 'ku' ? 'گەڕانەوە بۆ سەرەتا' : 'Go Home'}
          </a>
        </div>
      </div>
    );
  }

  const getPageTitle = (p) => {
    if (!p) return '';
    
    // Try API format (nameEn, nameAr, nameKu)
    const apiName = p[`name${language.charAt(0).toUpperCase() + language.slice(1)}`];
    if (apiName) return apiName;
    
    // Fallback to nameEn
    if (p.nameEn) return p.nameEn;
    
    // Try title object format
    if (p.title) {
      if (typeof p.title === 'object') {
        return p.title[language] || p.title.en || '';
      }
      return p.title;
    }
    
    // Try name object format
    if (p.name) {
      if (typeof p.name === 'object') {
        return p.name[language] || p.name.en || '';
      }
      return p.name;
    }
    
    return '';
  };

  // Transform components to sections
  const sections = transformComponentsToSections(page.components || []);

  // If page has no sections, show a default message
  if (sections.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">
            {getPageTitle(page)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ar'
              ? 'هذه الصفحة قيد الإنشاء. يرجى المحاولة مرة أخرى لاحقاً.'
              : language === 'ku'
              ? 'ئەم پەڕەیە لە ژێر دروستکردندایە. تکایە دواتر هەوڵ بدەوە.'
              : 'This page is under construction. Please check back later.'}
          </p>
        </div>
      </div>
    );
  }

  // Render page sections
  return (
    <div className="min-h-screen">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
