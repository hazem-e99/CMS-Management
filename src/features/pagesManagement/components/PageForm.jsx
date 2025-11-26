import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';

export function PageForm({ onCancel, initialData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: categoriesResponse } = useCategories();
  const categories = categoriesResponse?.data || [];
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      titleEn: '',
      titleAr: '',
      titleKu: '',
      slug: '',
      categoryId: '',
      descriptionEn: '',
      descriptionAr: '',
      descriptionKu: '',
      metaTitleEn: '',
      metaTitleAr: '',
      metaTitleKu: '',
      metaDescriptionEn: '',
      metaDescriptionAr: '',
      metaDescriptionKu: '',
      isPublished: false,
      isHomepage: false,
    },
  });

  // Auto-generate slug from English title
  const titleEn = watch('titleEn');
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return slug;
  };

  const onSubmit = (data) => {
    // Navigate to Page Builder with form data in state
    navigate('/admin/pages/builder/new', {
      state: {
        pageData: {
          categoryId: parseInt(data.categoryId) || null,
          nameEn: data.titleEn,
          nameAr: data.titleAr,
          nameKu: data.titleKu,
          descriptionEn: data.descriptionEn || '',
          descriptionAr: data.descriptionAr || '',
          descriptionKu: data.descriptionKu || '',
          slug: data.slug,
          metaTitleEn: data.metaTitleEn || data.titleEn,
          metaTitleAr: data.metaTitleAr || data.titleAr,
          metaTitleKu: data.metaTitleKu || data.titleKu,
          metaDescriptionEn: data.metaDescriptionEn || data.descriptionEn,
          metaDescriptionAr: data.metaDescriptionAr || data.descriptionAr,
          metaDescriptionKu: data.metaDescriptionKu || data.descriptionKu,
          isPublished: data.isPublished || false,
          isHomepage: data.isHomepage || false,
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Basic Information
        </h3>

        {/* Category */}
        <Select
          label="Category"
          {...register('categoryId', { required: 'Category is required' })}
          error={errors.categoryId?.message}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nameEn || category.nameAr || category.nameKu}
            </option>
          ))}
        </Select>

        {/* Title - English */}
        <Input
          label="Page Title (English)"
          {...register('titleEn', { 
            required: 'English title is required',
            minLength: { value: 2, message: 'Title must be at least 2 characters' },
            maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
          })}
          error={errors.titleEn?.message}
          placeholder="About Us"
          required
        />

        {/* Title - Arabic */}
        <Input
          label="Page Title (Arabic)"
          {...register('titleAr', { 
            required: 'Arabic title is required',
            minLength: { value: 2, message: 'Title must be at least 2 characters' },
            maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
          })}
          error={errors.titleAr?.message}
          placeholder="من نحن"
          required
          dir="rtl"
        />

        {/* Title - Kurdish */}
        <Input
          label="Page Title (Kurdish)"
          {...register('titleKu', { 
            required: 'Kurdish title is required',
            minLength: { value: 2, message: 'Title must be at least 2 characters' },
            maxLength: { value: 100, message: 'Title must not exceed 100 characters' }
          })}
          error={errors.titleKu?.message}
          placeholder="دەربارەی ئێمە"
          required
          dir="rtl"
        />

        {/* Slug */}
        <Input
          label="URL Slug"
          {...register('slug', { 
            required: 'Slug is required',
            maxLength: { value: 200, message: 'Slug must not exceed 200 characters' },
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: 'Slug must contain only lowercase letters, numbers, and hyphens'
            }
          })}
          error={errors.slug?.message}
          placeholder="about-us"
          helperText="URL-friendly version of the page name"
          required
        />

        {/* Description - English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (English)
          </label>
          <textarea
            {...register('descriptionEn')}
            rows={3}
            className="input w-full"
            placeholder="Brief description of the page..."
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
            placeholder="وصف مختصر للصفحة..."
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
            placeholder="پێناسەیەکی کورت بۆ پەڕەکە..."
          />
        </div>
      </div>

      {/* SEO Settings Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          SEO Settings
        </h3>

        {/* Meta Title - English */}
        <Input
          label="Meta Title (English)"
          {...register('metaTitleEn', {
            maxLength: { value: 60, message: 'Meta title should not exceed 60 characters' }
          })}
          error={errors.metaTitleEn?.message}
          placeholder="Leave empty to use page title"
          helperText="Recommended: 50-60 characters"
        />

        {/* Meta Title - Arabic */}
        <Input
          label="Meta Title (Arabic)"
          {...register('metaTitleAr', {
            maxLength: { value: 60, message: 'Meta title should not exceed 60 characters' }
          })}
          error={errors.metaTitleAr?.message}
          placeholder="اتركه فارغاً لاستخدام عنوان الصفحة"
          dir="rtl"
          helperText="Recommended: 50-60 characters"
        />

        {/* Meta Title - Kurdish */}
        <Input
          label="Meta Title (Kurdish)"
          {...register('metaTitleKu', {
            maxLength: { value: 60, message: 'Meta title should not exceed 60 characters' }
          })}
          error={errors.metaTitleKu?.message}
          placeholder="بەتاڵی بهێڵەوە بۆ بەکارهێنانی سەردێڕی پەڕە"
          dir="rtl"
          helperText="Recommended: 50-60 characters"
        />

        {/* Meta Description - English */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meta Description (English)
          </label>
          <textarea
            {...register('metaDescriptionEn', {
              maxLength: { value: 160, message: 'Meta description should not exceed 160 characters' }
            })}
            rows={2}
            className="input w-full"
            placeholder="Leave empty to use page description"
          />
          {errors.metaDescriptionEn && (
            <p className="mt-1 text-sm text-red-600">{errors.metaDescriptionEn.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
        </div>

        {/* Meta Description - Arabic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meta Description (Arabic)
          </label>
          <textarea
            {...register('metaDescriptionAr', {
              maxLength: { value: 160, message: 'Meta description should not exceed 160 characters' }
            })}
            rows={2}
            className="input w-full"
            dir="rtl"
            placeholder="اتركه فارغاً لاستخدام وصف الصفحة"
          />
          {errors.metaDescriptionAr && (
            <p className="mt-1 text-sm text-red-600">{errors.metaDescriptionAr.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
        </div>

        {/* Meta Description - Kurdish */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meta Description (Kurdish)
          </label>
          <textarea
            {...register('metaDescriptionKu', {
              maxLength: { value: 160, message: 'Meta description should not exceed 160 characters' }
            })}
            rows={2}
            className="input w-full"
            dir="rtl"
            placeholder="بەتاڵی بهێڵەوە بۆ بەکارهێنانی پێناسەی پەڕە"
          />
          {errors.metaDescriptionKu && (
            <p className="mt-1 text-sm text-red-600">{errors.metaDescriptionKu.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
        </div>
      </div>

      {/* Page Settings Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Page Settings
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isHomepage')}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Set as Homepage
              </span>
              <p className="text-xs text-gray-500">This page will be the main landing page</p>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isPublished')}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Publish Page
              </span>
              <p className="text-xs text-gray-500">Make this page visible to the public</p>
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit">
          Next: Build Page Sections →
        </Button>
      </div>
    </form>
  );
}
