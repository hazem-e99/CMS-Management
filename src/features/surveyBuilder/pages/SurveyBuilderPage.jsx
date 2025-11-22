import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useCreateSurvey, useSurvey, useUpdateSurvey } from '../hooks/useSurveys';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Card } from '../../../shared/ui/Card';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';

export function SurveyBuilderPage() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditing = !!surveyId;
  
  const { data: existingSurvey, isLoading } = useSurvey(surveyId);
  const createSurvey = useCreateSurvey();
  const updateSurvey = useUpdateSurvey();

  const [survey, setSurvey] = useState({
    id: surveyId || uuidv4(),
    title: { en: '', ar: '', ku: '' },
    description: { en: '', ar: '', ku: '' },
    questions: [],
  });

  // Load existing survey data
  useState(() => {
    if (existingSurvey) {
      setSurvey(existingSurvey);
    }
  }, [existingSurvey]);

  const [activeLanguage, setActiveLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'ku', name: 'کوردی' },
  ];

  const questionTypes = [
    { value: 'open', label: t('surveys.openText') },
    { value: 'single', label: t('surveys.singleChoice') },
    { value: 'multi', label: t('surveys.multiChoice') },
  ];

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: 'open',
      text: { en: '', ar: '', ku: '' },
      options: [],
      required: false,
    };
    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    });
  };

  const handleRemoveQuestion = (questionId) => {
    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleQuestionChange = (questionId, field, value) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    });
  };

  const handleQuestionTextChange = (questionId, lang, value) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === questionId
          ? { ...q, text: { ...q.text, [lang]: value } }
          : q
      ),
    });
  };

  const handleAddOption = (questionId) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...(q.options || []), { en: '', ar: '', ku: '' }],
            }
          : q
      ),
    });
  };

  const handleOptionChange = (questionId, optionIndex, lang, value) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? { ...opt, [lang]: value } : opt
              ),
            }
          : q
      ),
    });
  };

  const handleSave = async () => {
    const surveyData = {
      ...survey,
      createdAt: existingSurvey?.createdAt || new Date().toISOString(),
    };

    if (isEditing) {
      await updateSurvey.mutateAsync({ id: surveyId, data: surveyData });
    } else {
      await createSurvey.mutateAsync(surveyData);
    }
    navigate('/admin/surveys');
  };

  if (isLoading && isEditing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/admin/surveys')}
          >
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? t('surveys.editSurvey') : t('surveys.createSurvey')}
          </h1>
        </div>
        <Button
          icon={Save}
          onClick={handleSave}
          loading={createSurvey.isPending || updateSurvey.isPending}
        >
          {t('common.save')}
        </Button>
      </div>

      {/* Language Tabs */}
      <Card>
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeLanguage === lang.code
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Survey Title & Description */}
        <div className="space-y-4">
          <Input
            label={t('surveys.surveyTitle')}
            value={survey.title[activeLanguage] || ''}
            onChange={(e) =>
              setSurvey({
                ...survey,
                title: { ...survey.title, [activeLanguage]: e.target.value },
              })
            }
            dir={activeLanguage !== 'en' ? 'rtl' : 'ltr'}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={survey.description[activeLanguage] || ''}
              onChange={(e) =>
                setSurvey({
                  ...survey,
                  description: {
                    ...survey.description,
                    [activeLanguage]: e.target.value,
                  },
                })
              }
              rows={3}
              className="input w-full"
              dir={activeLanguage !== 'en' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Questions
          </h2>
          <Button icon={Plus} onClick={handleAddQuestion} size="sm">
            {t('surveys.addQuestion')}
          </Button>
        </div>

        {survey.questions.map((question, index) => (
          <Card key={question.id}>
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Question {index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                onClick={() => handleRemoveQuestion(question.id)}
              />
            </div>

            <div className="space-y-4">
              {/* Question Type */}
              <Select
                label={t('surveys.questionType')}
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(question.id, 'type', e.target.value)
                }
                options={questionTypes}
              />

              {/* Question Text */}
              <Input
                label={t('surveys.questionText')}
                value={question.text[activeLanguage] || ''}
                onChange={(e) =>
                  handleQuestionTextChange(
                    question.id,
                    activeLanguage,
                    e.target.value
                  )
                }
                dir={activeLanguage !== 'en' ? 'rtl' : 'ltr'}
                required
              />

              {/* Options for choice questions */}
              {(question.type === 'single' || question.type === 'multi') && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('surveys.options')}
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOption(question.id)}
                    >
                      Add Option
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {question.options?.map((option, optIdx) => (
                      <Input
                        key={optIdx}
                        placeholder={`Option ${optIdx + 1}`}
                        value={option[activeLanguage] || ''}
                        onChange={(e) =>
                          handleOptionChange(
                            question.id,
                            optIdx,
                            activeLanguage,
                            e.target.value
                          )
                        }
                        dir={activeLanguage !== 'en' ? 'rtl' : 'ltr'}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Required checkbox */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) =>
                    handleQuestionChange(
                      question.id,
                      'required',
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('surveys.required')}
                </span>
              </label>
            </div>
          </Card>
        ))}

        {survey.questions.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No questions yet. Click "Add Question" to get started.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Public Link */}
      {survey.id && (
        <Card>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('surveys.publicLink')}
          </h3>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded block overflow-x-auto">
            {window.location.origin}/survey/{survey.id}
          </code>
        </Card>
      )}
    </div>
  );
}
