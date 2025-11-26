import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Image, Video, Palette, Layout } from 'lucide-react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

export function ContentEditor({ section, onUpdate, onClose, onSave }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('content'); // content, style, settings
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [content, setContent] = useState(section.content || {});
  const [settings, setSettings] = useState(section.settings || {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave();
        onClose();
      } catch (error) {
        console.error('Failed to save:', error);
        alert('Failed to save changes. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      onClose();
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'ku', name: 'کوردی' },
  ];

  const tabs = [
    { id: 'content', name: 'Content', icon: Layout },
    { id: 'style', name: 'Style', icon: Palette },
  ];

  const handleContentChange = (lang, field, value) => {
    const newContent = {
      ...content,
      [lang]: {
        ...content[lang],
        [field]: value,
      },
    };
    setContent(newContent);
    onUpdate({ content: newContent });
  };

  const handleArrayItemChange = (lang, arrayName, index, field, value) => {
    const newContent = { ...content };
    if (!newContent[lang]) newContent[lang] = {};
    if (!newContent[lang][arrayName]) newContent[lang][arrayName] = [];
    
    const newArray = [...newContent[lang][arrayName]];
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    };
    
    newContent[lang][arrayName] = newArray;
    setContent(newContent);
    onUpdate({ content: newContent });
  };

  const handleSettingsChange = (field, value) => {
    const newSettings = {
      ...settings,
      [field]: value,
    };
    setSettings(newSettings);
    onUpdate({ settings: newSettings });
  };

  const renderContentFields = () => {
    const lang = activeLanguage;
    const langContent = content[lang] || {};

    // Normalize section type to lowercase for comparison (same as SectionRenderer)
    const sectionType = (section.type || '').toLowerCase().replace('section', '');

    switch (sectionType) {
      case 'hero':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Subtitle"
              value={langContent.subtitle || ''}
              onChange={(e) => handleContentChange(lang, 'subtitle', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Button Text"
              value={langContent.buttonText || ''}
              onChange={(e) => handleContentChange(lang, 'buttonText', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Button Link"
              value={langContent.buttonLink || ''}
              onChange={(e) => handleContentChange(lang, 'buttonLink', e.target.value)}
            />
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={langContent.description || ''}
                onChange={(e) => handleContentChange(lang, 'description', e.target.value)}
                rows={3}
                className="input w-full"
                dir={lang !== 'en' ? 'rtl' : 'ltr'}
              />
            </div>
            <Input
              label="Button Text"
              value={langContent.buttonText || ''}
              onChange={(e) => handleContentChange(lang, 'buttonText', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Button Link"
              value={langContent.buttonLink || ''}
              onChange={(e) => handleContentChange(lang, 'buttonLink', e.target.value)}
            />
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Features
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = [
                      ...(langContent.features || []),
                      { icon: '⚡', title: '', description: '' }
                    ];
                    handleContentChange(lang, 'features', newFeatures);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Feature
                </button>
              </div>
              {langContent.features?.map((feature, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = langContent.features.filter((_, i) => i !== idx);
                      handleContentChange(lang, 'features', newFeatures);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Remove feature"
                  >
                    ✕
                  </button>
                  <Input
                    label={`Feature ${idx + 1} - Icon (Emoji)`}
                    value={feature.icon || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'features', idx, 'icon', e.target.value)}
                    placeholder="⚡"
                  />
                  <Input
                    label="Title"
                    value={feature.title || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'features', idx, 'title', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                  <Input
                    label="Description"
                    value={feature.description || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'features', idx, 'description', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Testimonials
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newTestimonials = [
                      ...(langContent.testimonials || []),
                      { content: '', name: '', role: '', avatar: '' }
                    ];
                    handleContentChange(lang, 'testimonials', newTestimonials);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Testimonial
                </button>
              </div>
              {langContent.testimonials?.map((testimonial, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const newTestimonials = langContent.testimonials.filter((_, i) => i !== idx);
                      handleContentChange(lang, 'testimonials', newTestimonials);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Remove testimonial"
                  >
                    ✕
                  </button>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Content
                    </label>
                    <textarea
                      value={testimonial.content || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'testimonials', idx, 'content', e.target.value)}
                      rows={2}
                      className="input w-full text-sm"
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <Input
                    label="Name"
                    value={testimonial.name || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'testimonials', idx, 'name', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                  <Input
                    label="Role"
                    value={testimonial.role || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'testimonials', idx, 'role', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                  <Input
                    label="Avatar URL"
                    value={testimonial.avatar || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'testimonials', idx, 'avatar', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Images
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newImages = [
                      ...(langContent.images || []),
                      { url: '', caption: '' }
                    ];
                    handleContentChange(lang, 'images', newImages);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Image
                </button>
              </div>
              {langContent.images?.map((image, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = langContent.images.filter((_, i) => i !== idx);
                      handleContentChange(lang, 'images', newImages);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Remove image"
                  >
                    ✕
                  </button>
                  <Input
                    label={`Image ${idx + 1} - URL`}
                    value={image.url || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'images', idx, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                  <Input
                    label="Caption"
                    value={image.caption || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'images', idx, 'caption', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  FAQs
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newFaqs = [
                      ...(langContent.faqs || []),
                      { question: '', answer: '' }
                    ];
                    handleContentChange(lang, 'faqs', newFaqs);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add FAQ
                </button>
              </div>
              {langContent.faqs?.map((faq, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const newFaqs = langContent.faqs.filter((_, i) => i !== idx);
                      handleContentChange(lang, 'faqs', newFaqs);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Remove FAQ"
                  >
                    ✕
                  </button>
                  <Input
                    label="Question"
                    value={faq.question || ''}
                    onChange={(e) => handleArrayItemChange(lang, 'faqs', idx, 'question', e.target.value)}
                    dir={lang !== 'en' ? 'rtl' : 'ltr'}
                  />
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Answer
                    </label>
                    <textarea
                      value={faq.answer || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'faqs', idx, 'answer', e.target.value)}
                      rows={2}
                      className="input w-full text-sm"
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'image-text-left':
      case 'imagetextleft':
      case 'image-text-right':
      case 'imagetextright':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={langContent.description || ''}
                onChange={(e) => handleContentChange(lang, 'description', e.target.value)}
                rows={4}
                className="input w-full text-sm"
                dir={lang !== 'en' ? 'rtl' : 'ltr'}
              />
            </div>
            <Input
              label="Image URL"
              value={langContent.imageUrl || ''}
              onChange={(e) => handleContentChange(lang, 'imageUrl', e.target.value)}
              placeholder="https://..."
            />
            <Input
              label="Image Alt Text"
              value={langContent.imageAlt || ''}
              onChange={(e) => handleContentChange(lang, 'imageAlt', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Button Text"
              value={langContent.buttonText || ''}
              onChange={(e) => handleContentChange(lang, 'buttonText', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Button Link"
              value={langContent.buttonLink || ''}
              onChange={(e) => handleContentChange(lang, 'buttonLink', e.target.value)}
            />
          </div>
        );

      case 'pricing-table':
      case 'pricingtable':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <Input
              label="Subtitle"
              value={langContent.subtitle || ''}
              onChange={(e) => handleContentChange(lang, 'subtitle', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pricing Plans
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newPlans = [
                      ...(langContent.plans || []),
                      {
                        name: '',
                        price: '',
                        period: '/month',
                        features: [],
                        buttonText: 'Get Started',
                        buttonLink: '#',
                        highlighted: false,
                      }
                    ];
                    handleContentChange(lang, 'plans', newPlans);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Plan
                </button>
              </div>
              {langContent.plans?.map((plan, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const newPlans = langContent.plans.filter((_, i) => i !== idx);
                      handleContentChange(lang, 'plans', newPlans);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    title="Remove plan"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2">
                    <Input
                      label={`Plan ${idx + 1} - Name`}
                      value={plan.name || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'name', e.target.value)}
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                    />
                    <label className="flex items-center gap-1 text-xs whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={plan.highlighted || false}
                        onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'highlighted', e.target.checked)}
                        className="rounded"
                      />
                      Highlight
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Price"
                      value={plan.price || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'price', e.target.value)}
                    />
                    <Input
                      label="Period"
                      value={plan.period || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'period', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Features (one per line)
                    </label>
                    <textarea
                      value={plan.features?.join('\n') || ''}
                      onChange={(e) => {
                        const features = e.target.value.split('\n').filter(f => f.trim());
                        handleArrayItemChange(lang, 'plans', idx, 'features', features);
                      }}
                      rows={4}
                      className="input w-full text-sm"
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Button Text"
                      value={plan.buttonText || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'buttonText', e.target.value)}
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                    />
                    <Input
                      label="Button Link"
                      value={plan.buttonLink || ''}
                      onChange={(e) => handleArrayItemChange(lang, 'plans', idx, 'buttonLink', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data-table':
      case 'datatable':
        return (
          <div className="space-y-4">
            <Input
              label="Title"
              value={langContent.title || ''}
              onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
              dir={lang !== 'en' ? 'rtl' : 'ltr'}
            />
            
            {/* Table Headers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Column Headers
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newHeaders = [...(langContent.headers || []), ''];
                    const newRows = (langContent.rows || []).map(row => [...row, '']);
                    const newContent = {
                      ...langContent,
                      headers: newHeaders,
                      rows: newRows,
                    };
                    handleContentChange(lang, null, newContent);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Column
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {langContent.headers?.map((header, idx) => (
                  <div key={idx} className="relative">
                    <Input
                      label={`Column ${idx + 1}`}
                      value={header}
                      onChange={(e) => {
                        const newHeaders = [...langContent.headers];
                        newHeaders[idx] = e.target.value;
                        handleContentChange(lang, 'headers', newHeaders);
                      }}
                      dir={lang !== 'en' ? 'rtl' : 'ltr'}
                    />
                    {langContent.headers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newHeaders = langContent.headers.filter((_, i) => i !== idx);
                          const newRows = langContent.rows.map(row => row.filter((_, i) => i !== idx));
                          const newContent = {
                            ...langContent,
                            headers: newHeaders,
                            rows: newRows,
                          };
                          handleContentChange(lang, null, newContent);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-xs hover:bg-red-700 flex items-center justify-center"
                        title="Remove column"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Table Rows
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newRow = new Array(langContent.headers?.length || 1).fill('');
                    const newRows = [...(langContent.rows || []), newRow];
                    handleContentChange(lang, 'rows', newRows);
                  }}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                >
                  + Add Row
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {langContent.rows?.map((row, rowIdx) => (
                  <div key={rowIdx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => {
                        const newRows = langContent.rows.filter((_, i) => i !== rowIdx);
                        handleContentChange(lang, 'rows', newRows);
                      }}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-700 text-sm font-medium"
                      title="Remove row"
                    >
                      ✕
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {row.map((cell, cellIdx) => (
                        <Input
                          key={cellIdx}
                          label={langContent.headers?.[cellIdx] || `Col ${cellIdx + 1}`}
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...langContent.rows];
                            newRows[rowIdx][cellIdx] = e.target.value;
                            handleContentChange(lang, 'rows', newRows);
                          }}
                          dir={lang !== 'en' ? 'rtl' : 'ltr'}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No editor available for this section type.
            </p>
          </div>
        );
    }
  };

  const renderStyleFields = () => {
    const backgroundType = settings.backgroundType || 'color'; // 'color' or 'media'

    const handleBackgroundTypeChange = (type) => {
      const newSettings = { ...settings, backgroundType: type };
      
      // Clear opposite type settings
      if (type === 'color') {
        newSettings.backgroundImage = '';
        newSettings.backgroundVideo = '';
        newSettings.backgroundOverlay = false;
      } else {
        // Keep backgroundColor for text contrast but mark as media type
      }
      
      setSettings(newSettings);
      onUpdate({ settings: newSettings });
    };

    return (
      <div className="space-y-4">
        {/* Background Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleBackgroundTypeChange('color')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                backgroundType === 'color'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <Palette className="h-4 w-4 mx-auto mb-1" />
              <span className="text-xs font-medium">Solid Color</span>
            </button>
            <button
              type="button"
              onClick={() => handleBackgroundTypeChange('media')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                backgroundType === 'media'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <Image className="h-4 w-4 mx-auto mb-1" />
              <span className="text-xs font-medium">Image/Video</span>
            </button>
          </div>
        </div>

        {/* Background Color (always show for text contrast) */}
        {backgroundType === 'color' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.backgroundColor || '#ffffff'}
                onChange={(e) => handleSettingsChange('backgroundColor', e.target.value)}
                className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600"
              />
              <Input
                value={settings.backgroundColor || '#ffffff'}
                onChange={(e) => handleSettingsChange('backgroundColor', e.target.value)}
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}

        {/* Background Media */}
        {backgroundType === 'media' && (
          <>
            {/* Background Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Image className="h-4 w-4" />
                Background Image
              </label>
              
              {/* Toggle between URL and Upload */}
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => handleSettingsChange('backgroundImageMode', 'url')}
                  className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
                    (settings.backgroundImageMode || 'url') === 'url'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => handleSettingsChange('backgroundImageMode', 'upload')}
                  className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
                    settings.backgroundImageMode === 'upload'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  Upload File
                </button>
              </div>

              {(settings.backgroundImageMode || 'url') === 'url' ? (
                <Input
                  value={settings.backgroundImage || ''}
                  onChange={(e) => {
                    const newSettings = {
                      ...settings,
                      backgroundImage: e.target.value,
                    };
                    if (e.target.value) {
                      newSettings.backgroundVideo = '';
                    }
                    setSettings(newSettings);
                    onUpdate({ settings: newSettings });
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const newSettings = {
                            ...settings,
                            backgroundImage: reader.result,
                            backgroundVideo: '',
                          };
                          setSettings(newSettings);
                          onUpdate({ settings: newSettings });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100
                      dark:file:bg-primary-900/20 dark:file:text-primary-300
                      dark:hover:file:bg-primary-900/30"
                  />
                  {settings.backgroundImage && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✓ Image uploaded
                    </p>
                  )}
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to use video instead
              </p>
            </div>

            {/* Background Video */}
            {!settings.backgroundImage && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Video className="h-4 w-4" />
                  Background Video
                </label>
                
                {/* Toggle between URL and Upload */}
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => handleSettingsChange('backgroundVideoMode', 'url')}
                    className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
                      (settings.backgroundVideoMode || 'url') === 'url'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSettingsChange('backgroundVideoMode', 'upload')}
                    className={`flex-1 px-3 py-1.5 text-xs rounded border transition-colors ${
                      settings.backgroundVideoMode === 'upload'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {(settings.backgroundVideoMode || 'url') === 'url' ? (
                  <Input
                    value={settings.backgroundVideo || ''}
                    onChange={(e) => {
                      const newSettings = {
                        ...settings,
                        backgroundVideo: e.target.value,
                      };
                      setSettings(newSettings);
                      onUpdate({ settings: newSettings });
                    }}
                    placeholder="https://example.com/video.mp4"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const newSettings = {
                              ...settings,
                              backgroundVideo: reader.result,
                            };
                            setSettings(newSettings);
                            onUpdate({ settings: newSettings });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-sm text-gray-500 dark:text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-50 file:text-primary-700
                        hover:file:bg-primary-100
                        dark:file:bg-primary-900/20 dark:file:text-primary-300
                        dark:hover:file:bg-primary-900/30"
                    />
                    {settings.backgroundVideo && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        ✓ Video uploaded
                      </p>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  MP4 format recommended
                </p>
              </div>
            )}

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.backgroundOverlay !== false}
                  onChange={(e) => handleSettingsChange('backgroundOverlay', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Enable Dark Overlay (improves text readability)
                </span>
              </label>
            </div>

            {settings.backgroundOverlay !== false && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Overlay Opacity: {settings.overlayOpacity || 0.5}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.overlayOpacity || 0.5}
                  onChange={(e) => handleSettingsChange('overlayOpacity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </>
        )}

        {/* Text Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Text Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={settings.textColor || '#000000'}
              onChange={(e) => handleSettingsChange('textColor', e.target.value)}
              className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600"
            />
            <Input
              value={settings.textColor || '#000000'}
              onChange={(e) => handleSettingsChange('textColor', e.target.value)}
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Spacing */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Padding Top
            </label>
            <Input
              value={settings.paddingTop || '64px'}
              onChange={(e) => handleSettingsChange('paddingTop', e.target.value)}
              placeholder="64px"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Padding Bottom
            </label>
            <Input
              value={settings.paddingBottom || '64px'}
              onChange={(e) => handleSettingsChange('paddingBottom', e.target.value)}
              placeholder="64px"
            />
          </div>
        </div>

        {/* Section-specific settings */}
        {section.type === 'hero' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minimum Height
            </label>
            <Input
              value={settings.minHeight || '500px'}
              onChange={(e) => handleSettingsChange('minHeight', e.target.value)}
              placeholder="500px"
            />
          </div>
        )}

        {(section.type === 'features' || section.type === 'gallery') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Columns (Desktop)
            </label>
            <select
              value={settings.columns || 3}
              onChange={(e) => handleSettingsChange('columns', parseInt(e.target.value))}
              className="input w-full"
            >
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('builder.editContent')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Section Type */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Section Type: {section.type}
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language Tabs (only for content tab) */}
      {activeTab === 'content' && (
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLanguage(lang.code)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  activeLanguage === lang.code
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Fields */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' ? renderContentFields() : renderStyleFields()}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={handleSave} className="w-full" loading={isSaving}>
          {onSave ? 'Save' : 'Done'}
        </Button>
      </div>
    </div>
  );
}
