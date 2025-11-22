import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useSurvey, useSurveyResponses } from '../hooks/useSurveys';
import { Button } from '../../../shared/ui/Button';
import { Card } from '../../../shared/ui/Card';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { useLanguage } from '../../../contexts/LanguageContext';

export function SurveyResponsesPage() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const { data: survey, isLoading: surveyLoading } = useSurvey(surveyId);
  const { data: responses, isLoading: responsesLoading } = useSurveyResponses(surveyId);

  if (surveyLoading || responsesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/surveys')}
        >
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {survey?.title[language] || survey?.title.en}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {responses?.length || 0} {t('surveys.responses')}
          </p>
        </div>
      </div>

      {/* Responses */}
      {responses?.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {t('surveys.noResponses')}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {responses?.map((response, idx) => (
            <Card key={response.id}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Response #{idx + 1}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(response.submittedAt).toLocaleString()}
                </span>
              </div>

              <div className="space-y-4">
                {survey?.questions.map((question) => {
                  const answer = response.answers[question.id];
                  return (
                    <div key={question.id} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {question.text[response.language] || question.text.en}
                      </p>
                      <div className="text-gray-700 dark:text-gray-300">
                        {Array.isArray(answer) ? (
                          <ul className="list-disc list-inside">
                            {answer.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{answer || 'No answer'}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
