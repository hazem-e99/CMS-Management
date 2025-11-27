import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../../../services/settingsService';
import { useLanguage } from '../../../contexts/LanguageContext';

export function FloatingSidebar() {
  const { language } = useLanguage();
  const { data: settingsData } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const settings = settingsData?.data || {};
  const sidebarSettings = settings.site_sidebar || {};

  const defaultPoll = {
    question: { en: 'Do you support digital transformation?', ar: 'هل تؤيد التحول الرقمي؟', ku: 'ئایا پشتگیری لە گۆڕانی دیجیتاڵی دەکەیت؟' }
  };
  
  const defaultAd = {
    title: { en: 'Voor', ar: 'إعلان', ku: 'ڕیکلام' },
    subtitle: { en: 'Reklame', ar: 'مساحة إعلانية', ku: 'شوێنی ڕیکلام' }
  };

  const pollQuestion = sidebarSettings.poll?.question?.[language] || sidebarSettings.poll?.question?.en || defaultPoll.question[language];
  const adTitle = sidebarSettings.ad?.title?.[language] || sidebarSettings.ad?.title?.en || defaultAd.title[language];
  const adSubtitle = sidebarSettings.ad?.subtitle?.[language] || sidebarSettings.ad?.subtitle?.en || defaultAd.subtitle[language];

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        
        {/* Poll Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-900 text-white p-3 text-center font-bold">
                {language === 'ar' ? 'استطلاع رأي' : language === 'ku' ? 'ڕاپرسی' : 'Poll'}
            </div>
            <div className="p-4 space-y-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                    {pollQuestion}
                </p>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input type="radio" name="poll" className="peer h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {language === 'ar' ? 'نعم، أؤيد بشدة' : language === 'ku' ? 'بەڵێ، بە توندی پشتگیری دەکەم' : 'Yes, strongly support'}
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input type="radio" name="poll" className="peer h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {language === 'ar' ? 'لا، لا أؤيد' : language === 'ku' ? 'نەخێر، پشتگیری ناکەم' : 'No, do not support'}
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input type="radio" name="poll" className="peer h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">
                            {language === 'ar' ? 'محايد' : language === 'ku' ? 'بێلایەن' : 'Neutral'}
                        </span>
                    </label>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-medium transition-colors shadow-sm">
                    {language === 'ar' ? 'تصويت' : language === 'ku' ? 'دەنگدان' : 'Vote'}
                </button>
            </div>
        </div>

        {/* Ad Widget */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 border-dashed rounded-lg h-80 flex flex-col items-center justify-center text-blue-400 dark:text-blue-500 p-4 text-center">
            <div className="w-16 h-16 mb-2 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <span className="text-2xl">📢</span>
            </div>
            <span className="text-lg font-bold block">{adTitle}</span>
            <span className="text-lg font-bold block">{adSubtitle}</span>
            <span className="text-xs mt-2 opacity-75">Ad Space Available</span>
        </div>

      </div>
    </aside>
  );
}
