import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

export function CategoryForm({ category, onSubmit, onCancel, isLoading }) {
  const { t } = useTranslation();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nameEn: category?.nameEn || '',
      nameAr: category?.nameAr || '',
      nameKu: category?.nameKu || '',
      slug: category?.slug || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name - English */}
      <Input
        label="Name (English)"
        {...register('nameEn', { required: 'English name is required' })}
        error={errors.nameEn?.message}
        required
      />

      {/* Name - Arabic */}
      <Input
        label="Name (Arabic)"
        {...register('nameAr', { required: 'Arabic name is required' })}
        error={errors.nameAr?.message}
        required
        dir="rtl"
      />

      {/* Name - Kurdish */}
      <Input
        label="Name (Kurdish)"
        {...register('nameKu', { required: 'Kurdish name is required' })}
        error={errors.nameKu?.message}
        required
        dir="rtl"
      />

      {/* Slug */}
      <Input
        label="Slug"
        {...register('slug', { 
          required: 'Slug is required',
          pattern: {
            value: /^[a-z0-9-]+$/,
            message: 'Slug must contain only lowercase letters, numbers, and hyphens'
          }
        })}
        error={errors.slug?.message}
        placeholder="category-slug"
        required
      />

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={isLoading}>
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
}
