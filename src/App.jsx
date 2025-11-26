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
import LoginPage from './features/auth/pages/LoginPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Dashboard Routes - Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/pages" replace />} />
        <Route path="pages" element={<PagesListPage />} />
        <Route path="pages/new" element={<CreatePagePage />} />
        <Route path="pages/:pageId/edit" element={<EditPagePage />} />
        <Route path="pages/builder/new" element={<PageBuilderPage />} />
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
