import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './shared/layout/DashboardLayout';
import { PagesListPage } from './features/pagesManagement/pages/PagesListPage';
import { CreatePagePage } from './features/pagesManagement/pages/CreatePagePage';
import { EditPagePage } from './features/pagesManagement/pages/EditPagePage';
import { PageBuilderPage } from './features/pageBuilder/pages/PageBuilderPage';
import { SurveyBuilderPage } from './features/surveyBuilder/pages/SurveyBuilderPage';
import { SurveyResponsesPage } from './features/surveyBuilder/pages/SurveyResponsesPage';
import { SurveysListPage } from './features/surveyBuilder/pages/SurveysListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/pages" replace />} />
        <Route path="pages" element={<PagesListPage />} />
        <Route path="pages/new" element={<CreatePagePage />} />
        <Route path="pages/:pageId/edit" element={<EditPagePage />} />
        <Route path="pages/:pageId/builder" element={<PageBuilderPage />} />
        <Route path="surveys" element={<SurveysListPage />} />
        <Route path="surveys/new" element={<SurveyBuilderPage />} />
        <Route path="surveys/:surveyId/edit" element={<SurveyBuilderPage />} />
        <Route path="surveys/:surveyId/responses" element={<SurveyResponsesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
