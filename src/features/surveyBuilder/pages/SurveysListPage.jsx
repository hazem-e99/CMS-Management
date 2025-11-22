import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Eye, BarChart } from 'lucide-react';
import { useSurveys } from '../hooks/useSurveys';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { useLanguage } from '../../../contexts/LanguageContext';

export function SurveysListPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: surveys, isLoading } = useSurveys();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('surveys.title')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Create and manage surveys
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => navigate('/surveys/new')}
        >
          {t('surveys.createSurvey')}
        </Button>
      </div>

      {/* Surveys List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys?.map((survey) => (
          <Card key={survey.id}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {survey.title[language] || survey.title.en}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {survey.description?.[language] || survey.description?.en || 'No description'}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span>{survey.questions?.length || 0} questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => navigate(`/surveys/${survey.id}/edit`)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={BarChart}
                onClick={() => navigate(`/surveys/${survey.id}/responses`)}
                className="flex-1"
              >
                Responses
              </Button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Public Link:
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 block overflow-x-auto">
                {window.location.origin}/survey/{survey.id}
              </code>
            </div>
          </Card>
        ))}
      </div>

      {surveys?.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No surveys
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new survey.
            </p>
            <div className="mt-6">
              <Button icon={Plus} onClick={() => navigate('/surveys/new')}>
                {t('surveys.createSurvey')}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
