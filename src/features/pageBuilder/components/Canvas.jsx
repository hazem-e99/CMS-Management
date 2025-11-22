import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2, ChevronUp, ChevronDown, Edit } from 'lucide-react';
import { cn } from '../../../shared/lib/cn';

export function Canvas({
  sections,
  onSelectSection,
  onRemoveSection,
  onDuplicateSection,
  onMoveUp,
  onMoveDown,
  selectedSectionId,
}) {
  const { t } = useTranslation();

  if (sections.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {t('builder.dragHere')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {sections.map((section, index) => (
        <SortableSection
          key={section.id}
          section={section}
          isSelected={section.id === selectedSectionId}
          isFirst={index === 0}
          isLast={index === sections.length - 1}
          onSelect={() => onSelectSection(section)}
          onRemove={() => onRemoveSection(section.id)}
          onDuplicate={() => onDuplicateSection(section.id)}
          onMoveUp={() => onMoveUp(section.id)}
          onMoveDown={() => onMoveDown(section.id)}
        />
      ))}
    </div>
  );
}

function SortableSection({
  section,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onRemove,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative bg-white dark:bg-gray-800 border-2 rounded-lg overflow-hidden transition-all',
        isSelected
          ? 'border-primary-500 shadow-lg'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
        isDragging && 'opacity-50'
      )}
    >
      {/* Drag Handle & Actions */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
        {!isFirst && (
          <button
            onClick={onMoveUp}
            className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        {!isLast && (
          <button
            onClick={onMoveDown}
            className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        <button
          onClick={onSelect}
          className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <Edit className="h-4 w-4 text-blue-600 dark:text-blue-300" />
        </button>
        <button
          onClick={onDuplicate}
          className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={onRemove}
          className="p-1.5 bg-red-100 dark:bg-red-900 rounded hover:bg-red-200 dark:hover:bg-red-800"
        >
          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-300" />
        </button>
      </div>

      {/* Section Content Preview */}
      <div className="p-6" onClick={onSelect}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
            {section.type}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Order: {section.order}
          </span>
        </div>
        
        {/* Simple preview of content */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {section.content?.en?.title && (
            <p className="font-medium text-gray-900 dark:text-white">
              {section.content.en.title}
            </p>
          )}
          {section.content?.en?.subtitle && (
            <p className="text-sm">{section.content.en.subtitle}</p>
          )}
          {section.content?.en?.description && (
            <p className="text-sm">{section.content.en.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
