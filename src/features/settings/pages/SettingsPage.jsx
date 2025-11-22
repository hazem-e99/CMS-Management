import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../../services/settingsService';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Settings, Save, Image, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function SettingsPage() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  // Fetch settings
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const settings = settingsData?.data || {};

  // Local state for form
  const [formData, setFormData] = useState({
    logo: settings.logo || { url: '', alt: { en: '', ar: '', ku: '' } },
    siteName: settings.siteName || { en: '', ar: '', ku: '' },
    footer: settings.footer || {
      phones: [],
      email: '',
      address: { en: '', ar: '', ku: '' },
      socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '' },
    },
    copyright: settings.copyright || { en: '', ar: '', ku: '' },
  });

  // Update form data when settings load
  useState(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData({
        logo: settings.logo || { url: '', alt: { en: '', ar: '', ku: '' } },
        siteName: settings.siteName || { en: '', ar: '', ku: '' },
        footer: settings.footer || {
          phones: [],
          email: '',
          address: { en: '', ar: '', ku: '' },
          socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '' },
        },
        copyright: settings.copyright || { en: '', ar: '', ku: '' },
      });
    }
  }, [settings]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: settingsService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      alert('Settings updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const addPhone = () => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        phones: [...formData.footer.phones, ''],
      },
    });
  };

  const removePhone = (index) => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        phones: formData.footer.phones.filter((_, i) => i !== index),
      },
    });
  };

  const updatePhone = (index, value) => {
    const newPhones = [...formData.footer.phones];
    newPhones[index] = value;
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        phones: newPhones,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Logo Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Image className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.logoSettings')}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.logoUrl')}
              </label>
              <input
                type="url"
                value={formData.logo.url}
                onChange={(e) => setFormData({
                  ...formData,
                  logo: { ...formData.logo, url: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/logo.png"
              />
            </div>

            {formData.logo.url && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.preview')}:</p>
                <img 
                  src={formData.logo.url} 
                  alt="Logo preview" 
                  className="h-16 object-contain"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.altText')} ({t('settings.english')})
                </label>
                <input
                  type="text"
                  value={formData.logo.alt.en}
                  onChange={(e) => setFormData({
                    ...formData,
                    logo: { ...formData.logo, alt: { ...formData.logo.alt, en: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.altText')} ({t('settings.arabic')})
                </label>
                <input
                  type="text"
                  value={formData.logo.alt.ar}
                  onChange={(e) => setFormData({
                    ...formData,
                    logo: { ...formData.logo, alt: { ...formData.logo.alt, ar: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('settings.altText')} ({t('settings.kurdish')})
                </label>
                <input
                  type="text"
                  value={formData.logo.alt.ku}
                  onChange={(e) => setFormData({
                    ...formData,
                    logo: { ...formData.logo, alt: { ...formData.logo.alt, ku: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Site Name */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('settings.siteName')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.english')}
              </label>
              <input
                type="text"
                value={formData.siteName.en}
                onChange={(e) => setFormData({
                  ...formData,
                  siteName: { ...formData.siteName, en: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.arabic')}
              </label>
              <input
                type="text"
                value={formData.siteName.ar}
                onChange={(e) => setFormData({
                  ...formData,
                  siteName: { ...formData.siteName, ar: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.kurdish')}
              </label>
              <input
                type="text"
                value={formData.siteName.ku}
                onChange={(e) => setFormData({
                  ...formData,
                  siteName: { ...formData.siteName, ku: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('settings.footerSettings')}</h2>
          
          <div className="space-y-6">
            {/* Phone Numbers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-primary-600" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.phoneNumbers')}
                </label>
              </div>
              {formData.footer.phones.map((phone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+964 750 123 4567"
                  />
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    {t('settings.remove')}
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPhone}
                className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                {t('settings.addPhone')}
              </button>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-primary-600" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.email')}
                </label>
              </div>
              <input
                type="email"
                value={formData.footer.email}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: { ...formData.footer, email: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="info@example.com"
              />
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.address')}
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.footer.address.en}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: { ...formData.footer, address: { ...formData.footer.address, en: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('settings.english')}
                />
                <input
                  type="text"
                  value={formData.footer.address.ar}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: { ...formData.footer, address: { ...formData.footer.address, ar: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('settings.arabic')}
                  dir="rtl"
                />
                <input
                  type="text"
                  value={formData.footer.address.ku}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: { ...formData.footer, address: { ...formData.footer.address, ku: e.target.value } }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('settings.kurdish')}
                  dir="rtl"
                />
              </div>
            </div>

            {/* Social Media */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('settings.socialMedia')}
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <input
                    type="url"
                    value={formData.footer.socialMedia.facebook}
                    onChange={(e) => setFormData({
                      ...formData,
                      footer: { ...formData.footer, socialMedia: { ...formData.footer.socialMedia, facebook: e.target.value } }
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Facebook URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-sky-500" />
                  <input
                    type="url"
                    value={formData.footer.socialMedia.twitter}
                    onChange={(e) => setFormData({
                      ...formData,
                      footer: { ...formData.footer, socialMedia: { ...formData.footer.socialMedia, twitter: e.target.value } }
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Twitter URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <input
                    type="url"
                    value={formData.footer.socialMedia.instagram}
                    onChange={(e) => setFormData({
                      ...formData,
                      footer: { ...formData.footer, socialMedia: { ...formData.footer.socialMedia, instagram: e.target.value } }
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Instagram URL"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <input
                    type="url"
                    value={formData.footer.socialMedia.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      footer: { ...formData.footer, socialMedia: { ...formData.footer.socialMedia, linkedin: e.target.value } }
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="LinkedIn URL"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('settings.copyrightText')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.english')}
              </label>
              <input
                type="text"
                value={formData.copyright.en}
                onChange={(e) => setFormData({
                  ...formData,
                  copyright: { ...formData.copyright, en: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.arabic')}
              </label>
              <input
                type="text"
                value={formData.copyright.ar}
                onChange={(e) => setFormData({
                  ...formData,
                  copyright: { ...formData.copyright, ar: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.kurdish')}
              </label>
              <input
                type="text"
                value={formData.copyright.ku}
                onChange={(e) => setFormData({
                  ...formData,
                  copyright: { ...formData.copyright, ku: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {updateMutation.isPending ? t('common.saving') : t('common.saveChanges')}
          </button>
        </div>
      </form>
    </div>
  );
}
