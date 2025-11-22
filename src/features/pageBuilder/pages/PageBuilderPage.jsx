import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save, Eye, Undo, Redo } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePage, useUpdatePage } from '../../pagesManagement/hooks/usePages';
import { usePageBuilder } from '../hooks/usePageBuilder';
import { Button } from '../../../shared/ui/Button';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { SectionLibrary } from '../components/SectionLibrary';
import { Canvas } from '../components/Canvas';
import { ContentEditor } from '../components/ContentEditor';
import { PagePreview } from '../components/PagePreview';

export function PageBuilderPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: page, isLoading } = usePage(pageId);
  const updatePage = useUpdatePage();
  const [selectedSection, setSelectedSection] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = async (sections) => {
    await updatePage.mutateAsync({
      id: pageId,
      data: { ...page, sections, updatedAt: new Date().toISOString() },
    });
  };

  const {
    sections,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    duplicateSection,
    moveSectionUp,
    moveSectionDown,
    undo,
    redo,
    canUndo,
    canRedo,
    save,
    isSaving,
    lastSaved,
  } = usePageBuilder(pageId, page?.sections || [], handleSave);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = [...sections];
      const [moved] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, moved);
      reorderSections(newSections);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }



  if (isPreview) {
    return (
      <PagePreview
        sections={sections}
        onClose={() => setIsPreview(false)}
        title={page?.title?.en}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/pages')}
          >
            Back
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {page?.title?.en || 'Page Builder'}
            </h1>
            {lastSaved && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isSaving ? 'Saving...' : `Last saved: ${lastSaved.toLocaleTimeString()}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Undo}
            onClick={undo}
            disabled={!canUndo}
          >
            {t('builder.undo')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Redo}
            onClick={redo}
            disabled={!canRedo}
          >
            {t('builder.redo')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Eye}
            onClick={() => setIsPreview(true)}
          >
            {t('common.preview')}
          </Button>
          <Button
            size="sm"
            icon={Save}
            onClick={save}
            loading={isSaving}
          >
            {t('common.save')}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Section Library Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <SectionLibrary onAddSection={addSection} />
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <Canvas
                sections={sections}
                onSelectSection={setSelectedSection}
                onRemoveSection={removeSection}
                onDuplicateSection={duplicateSection}
                onMoveUp={moveSectionUp}
                onMoveDown={moveSectionDown}
                selectedSectionId={selectedSection?.id}
              />
            </SortableContext>
          </DndContext>
        </div>

        {/* Content Editor Sidebar */}
        {selectedSection && (
          <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <ContentEditor
              section={selectedSection}
              onUpdate={(updates) => updateSection(selectedSection.id, updates)}
              onClose={() => setSelectedSection(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
