import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { PageForm } from '../components/PageForm';

export function CreatePagePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/pages')}
        >
          Back to Pages
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('pages.createPage')}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Create a new page and start building your content
        </p>
      </div>

      <Card>
        <PageForm
          onSuccess={(pageId) => navigate(`/pages/${pageId}/builder`)}
          onCancel={() => navigate('/pages')}
        />
      </Card>
    </div>
  );
}
