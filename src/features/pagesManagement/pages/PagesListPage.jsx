import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Layout, FileText, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import { usePages, useDeletePage, useUpdatePage } from '../hooks/usePages';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { Modal } from '../../../shared/ui/Modal';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { PagePreview } from '../../pageBuilder/components/PagePreview';
import { useLanguage } from '../../../contexts/LanguageContext';
import { transformComponentsToSections } from '../../pageBuilder/utils/transformers';

export function PagesListPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: pages, isLoading } = usePages();
  const deletePage = useDeletePage();
  const updatePage = useUpdatePage();

  const [pageToDelete, setPageToDelete] = useState(null);
  const [previewPage, setPreviewPage] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleDelete = async () => {
    if (pageToDelete) {
      await deletePage.mutateAsync(pageToDelete.id);
      setPageToDelete(null);
    }
  };

  // Sort pages by order
  const sortedPages = pages ? [...pages].sort((a, b) => {
    const orderA = a.metadata?.order ?? 999;
    const orderB = b.metadata?.order ?? 999;
    return orderA - orderB;
  }) : [];

  // Move page up
  const movePageUp = async (page, currentIndex) => {
    if (currentIndex === 0) return;

    const topLevelPages = sortedPages.filter(p => !p.parentId);
    const prevPage = topLevelPages[currentIndex - 1];

    // Note: This functionality needs to be implemented with proper order management
    // For now, we'll skip the update since the API doesn't support order field
    console.warn('Page reordering not yet implemented in backend');
  };

  // Move page down
  const movePageDown = async (page, currentIndex, totalPages) => {
    if (currentIndex === totalPages - 1) return;

    const topLevelPages = sortedPages.filter(p => !p.parentId);
    const nextPage = topLevelPages[currentIndex + 1];

    // Note: This functionality needs to be implemented with proper order management
    // For now, we'll skip the update since the API doesn't support order field
    console.warn('Page reordering not yet implemented in backend');
  };

  const renderPageItem = (page, level = 0, index = 0, totalPages = 0) => {
    const hasChildren = sortedPages.some((p) => p.parentId === page.id);
    const paddingInline = level * 24;
    const isTopLevel = level === 0;

    return (
      <div key={page.id}>
        <div
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          style={{ paddingInlineStart: `${paddingInline + 16}px` }}
        >
          <div className="flex items-center gap-3">
            {hasChildren ? (
              <Layout className="h-5 w-5 text-gray-400" />
            ) : (
              <FileText className="h-5 w-5 text-gray-400" />
            )}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {language === 'ar' ? page.nameAr : language === 'ku' ? page.nameKu : page.nameEn}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>/{page.slug}</span>
                {page.isPublished ? (
                  <span className="px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    {t('pages.published')}
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                    {t('pages.draft')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Up/Down arrows - only for top-level pages */}
            {isTopLevel && (
              <>
                <button
                  onClick={() => movePageUp(page, index)}
                  disabled={index === 0}
                  className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('builder.moveUp')}
                >
                  <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => movePageDown(page, index, totalPages)}
                  disabled={index === totalPages - 1}
                  className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('builder.moveDown')}
                >
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              icon={Eye}
              onClick={() => setPreviewPage(page)}
              title={t('pages.previewPage')}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin/pages/${page.id}/builder`)}
            >
              {t('pages.pageBuilder')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={Edit}
              onClick={() => navigate(`/admin/pages/${page.id}/edit`)}
              title={t('pages.editPageInfo')}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => setPageToDelete(page)}
            />
          </div>
        </div>
        {sortedPages
          .filter((p) => p.parentId === page.id)
          .map((child, childIndex) => renderPageItem(child, level + 1, childIndex, sortedPages.filter(p => p.parentId === page.id).length))}
      </div>
    );
  };

  const topLevelPages = sortedPages.filter((page) => !page.parentId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('pages.title')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {t('pages.manageSite')}
          </p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/admin/pages/new')}>
          {t('pages.createPage')}
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {topLevelPages.map((page, index) => 
            renderPageItem(page, 0, index, topLevelPages.length)
          )}
          
          {sortedPages.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {t('pages.noPages')}
            </div>
          )}
        </div>
      </Card>



      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!pageToDelete}
        onClose={() => setPageToDelete(null)}
        title={t('pages.deletePage')}
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            {t('pages.deleteConfirm')} "{pageToDelete?.nameEn}"? {t('pages.deleteWarning')}
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setPageToDelete(null)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={deletePage.isPending}
            >
              {t('common.delete')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Page Preview Modal */}
      {previewPage && (
        <PagePreview
          sections={transformComponentsToSections(previewPage.components || [])}
          onClose={() => setPreviewPage(null)}
          title={language === 'ar' ? previewPage.nameAr : language === 'ku' ? previewPage.nameKu : previewPage.nameEn}
        />
      )}
    </div>
  );
}
