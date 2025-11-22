import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../../contexts/LanguageContext';
import { publicPagesService } from '../../../services/publicPagesService';
import { Mail, Phone, MapPin } from 'lucide-react';

export function PublicFooter() {
  const { language } = useLanguage();
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: publicPagesService.getSiteSettings,
  });

  if (!settings) return null;

  const footer = settings.footer;
  const address = footer.address[language] || footer.address.en;
  const copyright = settings.copyright[language] || settings.copyright.en;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'اتصل بنا' : language === 'ku' ? 'پەیوەندیمان پێوە بکە' : 'Contact Us'}
            </h3>
            <div className="space-y-3">
              {footer.phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${phone}`} className="hover:text-primary-400 transition-colors">
                    {phone}
                  </a>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${footer.email}`} className="hover:text-primary-400 transition-colors">
                  {footer.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : language === 'ku' ? 'بەستەرە خێراکان' : 'Quick Links'}
            </h3>
            <div className="space-y-2">
              <a href="/pgs-academy" className="block hover:text-primary-400 transition-colors">
                {language === 'ar' ? 'أكاديمية PGS' : language === 'ku' ? 'ئەکادیمیای PGS' : 'PGS Academy'}
              </a>
              <a href="/community" className="block hover:text-primary-400 transition-colors">
                {language === 'ar' ? 'المجتمع' : language === 'ku' ? 'کۆمەڵگا' : 'Community'}
              </a>
              <a href="/surveys" className="block hover:text-primary-400 transition-colors">
                {language === 'ar' ? 'استطلاعات إلكترونية' : language === 'ku' ? 'ڕاپرسییە ئەلیکترۆنییەکان' : 'Online Surveys'}
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'عن PGS' : language === 'ku' ? 'دەربارەی PGS' : 'About PGS'}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'ar'
                ? 'نحن ملتزمون بتطوير القيادة وبناء المجتمع من خلال التعليم والمشاركة.'
                : language === 'ku'
                ? 'ئێمە پابەندین بە گەشەپێدانی سەرکردایەتی و بنیاتنانی کۆمەڵگا لە ڕێگەی پەروەردە و بەشداریکردن.'
                : 'We are committed to developing leadership and building community through education and engagement.'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
