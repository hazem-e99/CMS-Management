import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Layout, FileText, Eye } from 'lucide-react';
import { usePages, useDeletePage } from '../hooks/usePages';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { Modal } from '../../../shared/ui/Modal';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { PagePreview } from '../../pageBuilder/components/PagePreview';
import { useLanguage } from '../../../contexts/LanguageContext';

export function PagesListPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: pages, isLoading } = usePages();
  const deletePage = useDeletePage();

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

  const renderPageItem = (page, level = 0) => {
    const hasChildren = pages.some((p) => p.parentId === page.id);
    const paddingInline = level * 24;

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
                {page.title[language] || page.title.en}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>/{page.slug}</span>
                {page.metadata.isPublished ? (
                  <span className="px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    {t('pages.published')}
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                    {t('pages.draft')}
                  </span>
                )}
                <span>• {page.sections?.length || 0} {t('pages.sections')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
        {pages
          .filter((p) => p.parentId === page.id)
          .map((child) => renderPageItem(child, level + 1))}
      </div>
    );
  };

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
          {pages
            .filter((p) => !p.parentId)
            .map((page) => renderPageItem(page))}
          
          {pages.length === 0 && (
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
            {t('pages.deleteConfirm')} "{pageToDelete?.title?.en}"? {t('pages.deleteWarning')}
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
          sections={previewPage.sections || []}
          onClose={() => setPreviewPage(null)}
          title={previewPage.title[language] || previewPage.title.en}
        />
      )}
    </div>
  );
}
