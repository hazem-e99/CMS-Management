import { X } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { SectionRenderer } from './SectionRenderer';

export function PagePreview({ sections, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title ? `Preview: ${title}` : 'Page Preview'}
        </h2>
        <Button variant="ghost" size="sm" icon={X} onClick={onClose}>
          Close Preview
        </Button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p className="text-lg">This page has no sections yet.</p>
          </div>
        ) : (
          sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))
        )}
      </div>
    </div>
  );
}
