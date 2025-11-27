import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../../contexts/LanguageContext';
import { settingsService } from '../../../services/settingsService';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function PublicFooter() {
  const { language } = useLanguage();
  const { data: settingsData } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const settings = settingsData?.data || {};
  const footerSettings = settings.site_footer || {};
  
  // Default footer data
  const defaultFooter = {
    phones: ['+964 750 123 4567', '+964 750 765 4321'],
    email: 'info@pgs.krd',
    address: {
        en: 'Erbil, Kurdistan Region, Iraq',
        ar: 'أربيل، إقليم كردستان، العراق',
        ku: 'هەولێر، هەرێمی کوردستان، عێراق'
    },
    copyright: {
        en: `© ${new Date().getFullYear()} PGS. All rights reserved.`,
        ar: `© ${new Date().getFullYear()} PGS. جميع الحقوق محفوظة.`,
        ku: `© ${new Date().getFullYear()} PGS. هەموو مافەکان پارێزراون.`
    }
  };

  const phones = footerSettings.phones || defaultFooter.phones;
  const email = footerSettings.email || defaultFooter.email;
  const address = footerSettings.address?.[language] || footerSettings.address?.en || defaultFooter.address[language];
  const copyright = footerSettings.copyright?.[language] || footerSettings.copyright?.en || defaultFooter.copyright[language];

  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Phones */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ar' ? 'أرقام الهاتف' : language === 'ku' ? 'ژمارە تەلەفۆنەکان' : 'Phone Numbers'}
            </h3>
            <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
              {phones?.map((phone, idx) => (
                <a key={idx} href={`tel:${phone}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors dir-ltr">
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : language === 'ku' ? 'ئیمەیڵ' : 'Email Address'}
            </h3>
            {email && (
                <a href={`mailto:${email}`} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {email}
                </a>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ar' ? 'العنوان' : language === 'ku' ? 'ناونیشان' : 'Location'}
            </h3>
            {address && (
                <p className="text-gray-600 dark:text-gray-300 max-w-xs">
                  {address}
                </p>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
