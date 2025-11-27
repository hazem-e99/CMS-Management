import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Folder } from 'lucide-react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { Modal } from '../../../shared/ui/Modal';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { useLanguage } from '../../../contexts/LanguageContext';
import { CategoryForm } from '../components/CategoryForm';
import { categoriesSeedData } from '../../../data/categoriesSeed';

export function CategoriesListPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleCreate = async (data) => {
    try {
      await createCategory.mutateAsync(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('Failed to create category');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data: { ...editingCategory, ...data },
      });
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('Failed to update category');
    }
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
      console.log('Deleting category with ID:', categoryToDelete.id);
      try {
        const response = await deleteCategory.mutateAsync(categoryToDelete.id);
        
        // Check for logical failure despite 200 OK
        const responseData = response.data || response;
        if (responseData.success === false) {
            throw new Error(responseData.message || 'Failed to delete category');
        }

        setCategoryToDelete(null);
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSeedData = async () => {
    if (!window.confirm('Are you sure you want to seed categories? This will create multiple categories.')) {
      return;
    }

    try {
      let successCount = 0;
      for (const category of categoriesSeedData) {
        try {
            await createCategory.mutateAsync(category);
            successCount++;
        } catch (err) {
            console.error(`Failed to create category ${category.nameEn}:`, err);
        }
      }
      alert(`Categories seeded successfully! Created ${successCount} of ${categoriesSeedData.length} categories.`);
    } catch (error) {
      console.error('Failed to seed categories:', error);
      alert('Failed to seed categories');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your website categories
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleSeedData} loading={createCategory.isPending}>
                Seed Data
            </Button>
            <Button icon={Plus} onClick={openCreateModal}>
                Add Category
            </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {categories?.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No categories found. Create your first category!
            </div>
          ) : (
            categories?.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Folder className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                        {language === 'ar' ? category.nameAr : language === 'ku' ? category.nameKu : category.nameEn}
                        </h3>
                        {category.pageCount > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {category.pageCount} {category.pageCount === 1 ? t('pages.page') : t('pages.pages')}
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      /{category.slug}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit}
                    onClick={() => openEditModal(category)}
                  />
                  <div title={category.pageCount > 0 ? "Cannot delete category with pages" : "Delete category"}>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        className={`text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ${category.pageCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => category.pageCount === 0 && setCategoryToDelete(category)}
                        disabled={category.pageCount > 0}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'New Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createCategory.isPending || updateCategory.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCategoryToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              loading={deleteCategory.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
