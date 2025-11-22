import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Layout } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { usePage } from '../hooks/usePages';
import { PageEditForm } from '../components/PageEditForm';

export function EditPagePage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: page, isLoading } = usePage(pageId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/admin/pages')} className="mt-4">
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/admin/pages')}
          >
            Back to Pages
          </Button>
        </div>
        
        <Button
          variant="outline"
          icon={Layout}
          onClick={() => navigate(`/admin/pages/${pageId}/builder`)}
        >
          {t('pages.goToBuilder')}
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Page
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Update page information and settings
        </p>
      </div>

      <Card>
        <PageEditForm
          page={page}
          onSuccess={() => navigate('/admin/pages')}
          onCancel={() => navigate('/admin/pages')}
        />
      </Card>
    </div>
  );
}
