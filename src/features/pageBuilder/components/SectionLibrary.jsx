import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Plus, Save } from 'lucide-react';
import { sectionsService } from '../../../services/sectionsService';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Button } from '../../../shared/ui/Button';

export function SectionLibrary({ onAddSection, onSave, isSaving }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: library, isLoading } = useQuery({
    queryKey: ['sections-library'],
    queryFn: sectionsService.getSectionsLibrary,
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }

  const handleAddSection = (template) => {
    // Create a new section from template
    const newSection = {
      type: template.type,
      content: template.defaultContent,
      settings: template.settings || {},
    };
    onAddSection(newSection);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('builder.sectionLibrary')}
        </h2>
        <div className="space-y-2">
          {library?.map((template) => (
            <button
              key={template.id}
              onClick={() => handleAddSection(template)}
              className="w-full text-left p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700
                       hover:border-primary-500 dark:hover:border-primary-500 transition-colors
                       bg-white dark:bg-gray-800 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {template.name[language] || template.name.en}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {template.description[language] || template.description.en}
                  </p>
                </div>
                <Plus className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Save Button at Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <Button
          onClick={onSave}
          loading={isSaving}
          icon={Save}
          className="w-full"
        >
          {isSaving ? t('common.saving') : t('common.save')}
        </Button>
      </div>
    </div>
  );
}
