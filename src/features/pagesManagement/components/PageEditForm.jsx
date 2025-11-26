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
      nameEn: page.nameEn || page.title?.en || '',
      nameAr: page.nameAr || page.title?.ar || '',
      nameKu: page.nameKu || page.title?.ku || '',
      slug: page.slug || '',
      categoryId: page.categoryId || '',
      descriptionEn: page.descriptionEn || page.metadata?.description?.en || '',
      descriptionAr: page.descriptionAr || page.metadata?.description?.ar || '',
      descriptionKu: page.descriptionKu || page.metadata?.description?.ku || '',
      metaTitleEn: page.metaTitleEn || '',
      metaTitleAr: page.metaTitleAr || '',
      metaTitleKu: page.metaTitleKu || '',
      metaDescriptionEn: page.metaDescriptionEn || '',
      metaDescriptionAr: page.metaDescriptionAr || '',
      metaDescriptionKu: page.metaDescriptionKu || '',
      isPublished: page.isPublished || false,
      isHomepage: page.isHomepage || false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const pageData = {
        id: page.id,
        categoryId: parseInt(data.categoryId) || page.categoryId,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        nameKu: data.nameKu,
        slug: data.slug,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        descriptionKu: data.descriptionKu || null,
        metaTitleEn: data.metaTitleEn || null,
        metaTitleAr: data.metaTitleAr || null,
        metaTitleKu: data.metaTitleKu || null,
        metaDescriptionEn: data.metaDescriptionEn || null,
        metaDescriptionAr: data.metaDescriptionAr || null,
        metaDescriptionKu: data.metaDescriptionKu || null,
        isPublished: data.isPublished || false,
        isHomepage: data.isHomepage || false,
      };

      await updatePage.mutateAsync(pageData);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update page:', error);
      alert('Failed to update page: ' + (error.message || 'Unknown error'));
    }
  };

  // Get all pages for parent selection (categories)
  const parentPages = pages?.filter((p) => p.id !== page.id) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name - English */}
      <Input
        label="Page Name (English)"
        {...register('nameEn', { required: 'English name is required' })}
        error={errors.nameEn?.message}
        required
      />

      {/* Name - Arabic */}
      <Input
        label="Page Name (Arabic)"
        {...register('nameAr', { required: 'Arabic name is required' })}
        error={errors.nameAr?.message}
        required
        dir="rtl"
      />

      {/* Name - Kurdish */}
      <Input
        label="Page Name (Kurdish)"
        {...register('nameKu', { required: 'Kurdish name is required' })}
        error={errors.nameKu?.message}
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

      {/* Category */}
      <Select
        label="Category"
        {...register('categoryId', { required: 'Category is required' })}
        error={errors.categoryId?.message}
        required
      >
        <option value="">Select a category</option>
        {parentPages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nameEn || p.title?.en || `Page ${p.id}`}
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

      {/* Meta Title - English */}
      <Input
        label="Meta Title (English)"
        {...register('metaTitleEn')}
        placeholder="SEO title for English"
      />

      {/* Meta Description - English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Meta Description (English)
        </label>
        <textarea
          {...register('metaDescriptionEn')}
          rows={2}
          className="input w-full"
          placeholder="SEO description for English"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('isHomepage')}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Set as Homepage
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
