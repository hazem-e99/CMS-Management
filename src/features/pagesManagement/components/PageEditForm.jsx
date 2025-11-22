import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUpdatePage, usePages } from '../hooks/usePages';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';

export function PageEditForm({ page, onSuccess, onCancel }) {
  const { t } = useTranslation();
  const { data: pages } = usePages();
  const updatePage = useUpdatePage();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      titleEn: page.title.en || '',
      titleAr: page.title.ar || '',
      titleKu: page.title.ku || '',
      slug: page.slug || '',
      parentId: page.parentId || '',
      descriptionEn: page.metadata?.description?.en || '',
      descriptionAr: page.metadata?.description?.ar || '',
      descriptionKu: page.metadata?.description?.ku || '',
      showInNav: page.metadata?.showInNav !== false,
      isPublished: page.metadata?.isPublished || false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const pageData = {
        ...page,
        title: {
          en: data.titleEn,
          ar: data.titleAr,
          ku: data.titleKu,
        },
        slug: data.slug,
        parentId: data.parentId || null,
        metadata: {
          ...page.metadata,
          description: {
            en: data.descriptionEn || '',
            ar: data.descriptionAr || '',
            ku: data.descriptionKu || '',
          },
          isPublished: data.isPublished || false,
          showInNav: data.showInNav !== false,
        },
        updatedAt: new Date().toISOString(),
      };

      await updatePage.mutateAsync({
        id: page.id,
        data: pageData,
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update page:', error);
    }
  };

  const parentPages = pages?.filter((p) => !p.parentId && p.id !== page.id) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title - English */}
      <Input
        label="Title (English)"
        {...register('titleEn', { required: 'English title is required' })}
        error={errors.titleEn?.message}
        required
      />

      {/* Title - Arabic */}
      <Input
        label="Title (Arabic)"
        {...register('titleAr', { required: 'Arabic title is required' })}
        error={errors.titleAr?.message}
        required
        dir="rtl"
      />

      {/* Title - Kurdish */}
      <Input
        label="Title (Kurdish)"
        {...register('titleKu', { required: 'Kurdish title is required' })}
        error={errors.titleKu?.message}
        required
        dir="rtl"
      />

      {/* Slug */}
      <Input
        label={t('pages.slug')}
        {...register('slug', { 
          required: 'Slug is required',
          pattern: {
            value: /^[a-z0-9-]+$/,
            message: 'Slug must contain only lowercase letters, numbers, and hyphens'
          }
        })}
        error={errors.slug?.message}
        placeholder="about-us"
        required
      />

      {/* Parent Page */}
      <Select
        label={t('pages.parent')}
        {...register('parentId')}
      >
        <option value="">{t('pages.noParent')}</option>
        {parentPages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title.en}
          </option>
        ))}
      </Select>

      {/* Description - English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (English)
        </label>
        <textarea
          {...register('descriptionEn')}
          rows={3}
          className="input w-full"
        />
      </div>

      {/* Description - Arabic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (Arabic)
        </label>
        <textarea
          {...register('descriptionAr')}
          rows={3}
          className="input w-full"
          dir="rtl"
        />
      </div>

      {/* Description - Kurdish */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (Kurdish)
        </label>
        <textarea
          {...register('descriptionKu')}
          rows={3}
          className="input w-full"
          dir="rtl"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('showInNav')}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('pages.showInNav')}
          </span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('isPublished')}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('pages.isPublished')}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={updatePage.isPending}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}
