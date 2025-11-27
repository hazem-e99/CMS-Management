import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { PublicFooter } from '../components/PublicFooter';
import { FloatingSidebar } from '../components/FloatingSidebar';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Main Content */}
                <div className="flex-1 w-full min-w-0">
                    <Outlet />
                </div>

                {/* Sidebar */}
                <FloatingSidebar />
            </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
