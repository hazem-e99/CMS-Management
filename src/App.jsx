import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './shared/layout/DashboardLayout';
import { PagesListPage } from './features/pagesManagement/pages/PagesListPage';
import { CreatePagePage } from './features/pagesManagement/pages/CreatePagePage';
import { EditPagePage } from './features/pagesManagement/pages/EditPagePage';
import { PageBuilderPage } from './features/pageBuilder/pages/PageBuilderPage';
import { SurveyBuilderPage } from './features/surveyBuilder/pages/SurveyBuilderPage';
import { SurveyResponsesPage } from './features/surveyBuilder/pages/SurveyResponsesPage';
import { SurveysListPage } from './features/surveyBuilder/pages/SurveysListPage';
import SettingsPage from './features/settings/pages/SettingsPage';
import { PublicLayout } from './features/public/layout/PublicLayout';
import { PublicPage } from './features/public/pages/PublicPage';

function App() {
  return (
    <Routes>
      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/admin/pages" replace />} />
        <Route path="pages" element={<PagesListPage />} />
        <Route path="pages/new" element={<CreatePagePage />} />
        <Route path="pages/:pageId/edit" element={<EditPagePage />} />
        <Route path="pages/:pageId/builder" element={<PageBuilderPage />} />
        <Route path="surveys" element={<SurveysListPage />} />
        <Route path="surveys/new" element={<SurveyBuilderPage />} />
        <Route path="surveys/:surveyId/edit" element={<SurveyBuilderPage />} />
        <Route path="surveys/:surveyId/responses" element={<SurveyResponsesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Public Website Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/pgs-academy" replace />} />
        <Route path=":slug" element={<PublicPage />} />
        <Route path=":slug/:childSlug" element={<PublicPage />} />
      </Route>
    </Routes>
  );
}

export default App;
