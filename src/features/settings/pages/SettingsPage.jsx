import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../../services/settingsService';
import { mediaService } from '../../../services/mediaService';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Settings, Save, LayoutTemplate, Type, Image, Phone, Mail, MapPin, Megaphone, ListChecks, Upload } from 'lucide-react';

export default function SettingsPage() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('header');
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch settings
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const settings = settingsData?.data || {};

  // Default States
  const defaultHeader = {
    instituteName: { en: 'Institute for People and Politics', ar: 'معهد الشعب والسياسة', ku: 'پەیمانگەی گەل و سیاسەت' },
    slogan: { en: 'Your future starts today', ar: 'مستقبلك يبدأ اليوم', ku: 'داهاتووت ئەمڕۆ دەست پێ دەکات' },
    logo: { url: '/logo.png', alt: { en: 'PGS Logo', ar: 'شعار PGS', ku: 'لۆگۆی PGS' } }
  };

  const defaultFooter = {
    phones: ['+964 750 123 4567', '+964 750 765 4321'],
    email: 'info@pgs.krd',
    address: { en: 'Erbil, Kurdistan Region, Iraq', ar: 'أربيل، إقليم كردستان، العراق', ku: 'هەولێر، هەرێمی کوردستان، عێراق' },
    copyright: { en: '© 2024 PGS. All rights reserved.', ar: '© 2024 PGS. جميع الحقوق محفوظة.', ku: '© 2024 PGS. هەموو مافەکان پارێزراون.' }
  };

  const defaultSidebar = {
    poll: {
      question: { en: 'Do you support digital transformation?', ar: 'هل تؤيد التحول الرقمي؟', ku: 'ئایا پشتگیری لە گۆڕانی دیجیتاڵی دەکەیت؟' },
      isActive: true
    },
    ad: {
      title: { en: 'Voor', ar: 'إعلان', ku: 'ڕیکلام' },
      subtitle: { en: 'Reklame', ar: 'مساحة إعلانية', ku: 'شوێنی ڕیکلام' },
      isActive: true
    }
  };

  // Local state for form
  const [formData, setFormData] = useState({
    site_header: defaultHeader,
    site_footer: defaultFooter,
    site_sidebar: defaultSidebar
  });

  // Update form data when settings load
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData({
        site_header: { ...defaultHeader, ...settings.site_header },
        site_footer: { ...defaultFooter, ...settings.site_footer },
        site_sidebar: { ...defaultSidebar, ...settings.site_sidebar },
        // Keep IDs if they exist
        site_header_id: settings.site_header_id,
        site_footer_id: settings.site_footer_id,
        site_sidebar_id: settings.site_sidebar_id
      });
    }
  }, [settings]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: settingsService.updateSettings,
    onSuccess: async () => {
      // Invalidate and refetch to ensure we have the latest data
      await queryClient.invalidateQueries(['settings']);
      await queryClient.refetchQueries(['settings']);
      alert(language === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      alert(language === 'ar' ? 'فشل حفظ الإعدادات' : 'Failed to update settings');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await mediaService.uploadMedia(file, 'Site Logo', 'Logo');
      if (result.success && result.data?.fileUrl) {
        updateField('site_header', 'logo', 'url', result.data.fileUrl);
        alert(language === 'ar' ? 'تم رفع الشعار بنجاح' : 'Logo uploaded successfully');
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert(language === 'ar' ? 'فشل رفع الشعار' : 'Failed to upload logo');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Helper to update nested state
  const updateField = (section, field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: subField ? {
          ...prev[section][field],
          [subField]: value
        } : value
      }
    }));
  };

  const updateArrayField = (section, field, index, value) => {
    const newArray = [...formData[section][field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'header', label: language === 'ar' ? 'رأس الصفحة (Header)' : 'Header', icon: LayoutTemplate },
    { id: 'footer', label: language === 'ar' ? 'تذييل الصفحة (Footer)' : 'Footer', icon: LayoutTemplate },
    { id: 'sidebar', label: language === 'ar' ? 'الشريط الجانبي (Sidebar)' : 'Sidebar', icon: ListChecks },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          <Save className="w-5 h-5" />
          {updateMutation.isPending 
            ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
            : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/10'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* HEADER SETTINGS */}
        {activeTab === 'header' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Institute Name */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'اسم المعهد' : 'Institute Name'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['en', 'ar', 'ku'].map(lang => (
                  <div key={lang}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang}</label>
                    <input
                      type="text"
                      value={formData.site_header.instituteName[lang]}
                      onChange={(e) => updateField('site_header', 'instituteName', lang, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      dir={lang === 'en' ? 'ltr' : 'rtl'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'الشعار اللفظي (Slogan)' : 'Slogan'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['en', 'ar', 'ku'].map(lang => (
                  <div key={lang}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang}</label>
                    <input
                      type="text"
                      value={formData.site_header.slogan[lang]}
                      onChange={(e) => updateField('site_header', 'slogan', lang, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      dir={lang === 'en' ? 'ltr' : 'rtl'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold">{language === 'ar' ? 'الشعار (Logo)' : 'Logo'}</h2>
                </div>
                <label className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {isUploading 
                    ? (language === 'ar' ? 'جاري الرفع...' : 'Uploading...') 
                    : (language === 'ar' ? 'رفع صورة' : 'Upload Image')}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
                  <input
                    type="text"
                    value={formData.site_header.logo.url}
                    onChange={(e) => updateField('site_header', 'logo', 'url', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    dir="ltr"
                  />
                </div>
                {formData.site_header.logo.url && (
                    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex justify-center">
                        <img src={formData.site_header.logo.url} alt="Preview" className="h-16 object-contain" />
                    </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER SETTINGS */}
        {activeTab === 'footer' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Phones */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'أرقام الهاتف' : 'Phone Numbers'}</h2>
              </div>
              <div className="space-y-3">
                {formData.site_footer.phones.map((phone, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => updateArrayField('site_footer', 'phones', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      dir="ltr"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h2>
              </div>
              <input
                type="email"
                value={formData.site_footer.email}
                onChange={(e) => updateField('site_footer', 'email', null, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                dir="ltr"
              />
            </div>

            {/* Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'العنوان' : 'Address'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['en', 'ar', 'ku'].map(lang => (
                  <div key={lang}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang}</label>
                    <input
                      type="text"
                      value={formData.site_footer.address[lang]}
                      onChange={(e) => updateField('site_footer', 'address', lang, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                      dir={lang === 'en' ? 'ltr' : 'rtl'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SIDEBAR SETTINGS */}
        {activeTab === 'sidebar' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Poll */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'استطلاع الرأي' : 'Poll Widget'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['en', 'ar', 'ku'].map(lang => (
                  <div key={lang}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang}</label>
                    <textarea
                      value={formData.site_sidebar.poll.question[lang]}
                      onChange={(e) => updateField('site_sidebar', 'poll', 'question', { ...formData.site_sidebar.poll.question, [lang]: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 h-24 resize-none"
                      dir={lang === 'en' ? 'ltr' : 'rtl'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ad */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'الإعلان' : 'Ad Widget'}</h2>
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['en', 'ar', 'ku'].map(lang => (
                    <div key={lang}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang} Title</label>
                        <input
                        type="text"
                        value={formData.site_sidebar.ad.title[lang]}
                        onChange={(e) => updateField('site_sidebar', 'ad', 'title', { ...formData.site_sidebar.ad.title, [lang]: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        dir={lang === 'en' ? 'ltr' : 'rtl'}
                        />
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['en', 'ar', 'ku'].map(lang => (
                    <div key={lang}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase">{lang} Subtitle</label>
                        <input
                        type="text"
                        value={formData.site_sidebar.ad.subtitle[lang]}
                        onChange={(e) => updateField('site_sidebar', 'ad', 'subtitle', { ...formData.site_sidebar.ad.subtitle, [lang]: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        dir={lang === 'en' ? 'ltr' : 'rtl'}
                        />
                    </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
