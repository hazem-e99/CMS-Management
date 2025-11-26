import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save, Eye, Undo, Redo } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePage, useUpdatePage } from '../../pagesManagement/hooks/usePages';
import { pagesApi } from '../../../api/pages';
import { categoriesApi } from '../../../api/categories';
import { usePageBuilder } from '../hooks/usePageBuilder';
import { Button } from '../../../shared/ui/Button';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { SectionLibrary } from '../components/SectionLibrary';
import { Canvas } from '../components/Canvas';
import { ContentEditor } from '../components/ContentEditor';
import { PagePreview } from '../components/PagePreview';
import { transformComponentsToSections } from '../utils/transformers';

export function PageBuilderPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Check if this is a new page creation by checking the URL path
  const isNewPage = location.pathname.includes('/builder/new');
  const pageData = location.state?.pageData;
  
  // Only fetch page if it's not a new page
  const { data: page, isLoading } = usePage(pageId, { enabled: !isNewPage && !!pageId });
  const updatePage = useUpdatePage();
  const [selectedSection, setSelectedSection] = useState(null);
  const [isPreview, setIsPreview] = useState(false);



  // Main save handler
  const handleSave = async (sections) => {
    try {
      console.log('=== SAVE PROCESS STARTED ===');
      console.log('Is new page:', isNewPage);
      console.log('Sections to save:', sections.length);

      // Handle NEW PAGE creation
      if (isNewPage) {
        if (!pageData) {
          alert('Error: Page data is missing. Please go back and fill the page information form.');
          navigate('/admin/pages/create');
          return;
        }

        console.log('Creating new page with components...');
        
        // Transform sections to NewPageComponentDTO format
        const components = sections.map((section, index) => {
          // Map component type to PascalCase if needed (e.g. 'hero' -> 'HeroSection')
          let type = section.type || 'Section';
          if (type.toLowerCase() === 'hero') type = 'HeroSection';
          else if (type.toLowerCase() === 'features') type = 'FeaturesSection';
          else if (type.toLowerCase() === 'cta') type = 'CtaSection';
          else type = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter

          return {
            componentType: type,
            componentName: section.name || type,
            contentJsonAr: JSON.stringify({ ...section.content?.ar, styles: section.settings } || {}),
            contentJsonEn: JSON.stringify({ ...section.content?.en, styles: section.settings } || {}),
            contentJsonKu: JSON.stringify({ ...section.content?.ku, styles: section.settings } || {}),
            orderIndex: index,
            isVisible: section.isVisible !== false,
            theme: parseInt(section.theme) || 1,
          };
        });



        // Check if categoryId is missing and create new category if needed
        let categoryId = pageData.categoryId;
        if (!categoryId) {
          console.log('No category selected. Creating new category from page name...');
          try {
            const categoryData = {
              nameEn: pageData.nameEn,
              nameAr: pageData.nameAr,
              nameKu: pageData.nameKu,
              slug: pageData.slug, // Use page slug for category slug
            };
            const newCategoryResponse = await categoriesApi.createCategory(categoryData);
            // Handle different response structures
            categoryId = newCategoryResponse.data?.id || newCategoryResponse.data?.data?.id || newCategoryResponse.id;
            
            if (!categoryId) {
                throw new Error('Could not retrieve ID from created category');
            }
            console.log('✅ New category created with ID:', categoryId);
          } catch (error) {
            console.error('Failed to create auto-category:', error);
            alert('Failed to create category automatically. Please go back and select a category manually.');
            return;
          }
        }

        // Prepare data for CreatePageWithComponentsDTO
        const createData = {
          categoryId: categoryId,
          nameEn: pageData.nameEn || "New Page",
          nameAr: pageData.nameAr || "صفحة جديدة",
          nameKu: pageData.nameKu || "پەڕەی نوێ",
          descriptionEn: pageData.descriptionEn || null,
          descriptionAr: pageData.descriptionAr || null,
          descriptionKu: pageData.descriptionKu || null,
          slug: pageData.slug || `page-${Date.now()}`,
          metaTitleEn: pageData.metaTitleEn || null,
          metaTitleAr: pageData.metaTitleAr || null,
          metaTitleKu: pageData.metaTitleKu || null,
          metaDescriptionEn: pageData.metaDescriptionEn || null,
          metaDescriptionAr: pageData.metaDescriptionAr || null,
          metaDescriptionKu: pageData.metaDescriptionKu || null,
          isPublished: pageData.isPublished || false,
          isHomepage: pageData.isHomepage || false,
          components: components, // Include the actual components!
        };

        console.log('=== CREATE PAGE WITH COMPONENTS ===');
        console.log('Page Data:', {
          categoryId: createData.categoryId,
          nameEn: createData.nameEn,
          slug: createData.slug,
          isPublished: createData.isPublished,
          isHomepage: createData.isHomepage,
          componentsCount: createData.components.length,
        });
        
        // Debug: Log first component structure
        if (components.length > 0) {
           console.log('First Component Structure:', JSON.stringify(components[0], null, 2));
        }

        // Call the with-components endpoint
        const response = await pagesApi.createPageWithComponents(createData);
        
        console.log('API Response:', response);
        
        if (response.success || response.data) {
          // Extract page ID from response (response.data.data.id or response.data.id)
          const newPageId = response.data?.data?.id || response.data?.id;
          console.log('✅ Page created successfully with ID:', newPageId);
          console.log('=== SAVE PROCESS COMPLETED ===');
          
          // Navigate to the edit page
          navigate(`/admin/pages/${newPageId}/builder`, { replace: true });
          window.location.reload();
        } else {
          throw new Error(response.message || 'Failed to create page');
        }
        
        return;
      }

      // Handle EXISTING PAGE update
      // Handle EXISTING PAGE update - Manual Bulk Update (Delete All -> Create All)
      // This is necessary because the API does not support bulk update via a single endpoint
      
      console.log('Starting manual bulk update...');
      
      // 1. Delete all existing components
      const existingComponents = page?.components || [];
      if (existingComponents.length > 0) {
        console.log(`Deleting ${existingComponents.length} existing components...`);
        // Execute deletes sequentially to avoid server overload
        for (const comp of existingComponents) {
          try {
            await pagesApi.deletePageComponent(comp.id);
          } catch (err) {
            console.warn(`Failed to delete component ${comp.id}:`, err);
            // Continue even if delete fails, to ensure we try to save new state
          }
        }
        console.log('✅ Existing components deleted');
      }

      // 2. Create new components
      console.log(`Creating ${sections.length} new components...`);
      for (const [index, section] of sections.entries()) {
        // Normalize section type
        let type = section.type;
        if (!type.toLowerCase().includes('section')) {
            type = type.charAt(0).toUpperCase() + type.slice(1) + 'Section';
        }
        if (type.includes('-')) {
            type = type.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Section';
            type = type.replace('SectionSection', 'Section');
        }

        const componentData = {
          componentType: type,
          componentName: section.name || section.type,
          contentJsonAr: JSON.stringify({ ...section.content?.ar, styles: section.settings } || {}),
          contentJsonEn: JSON.stringify({ ...section.content?.en, styles: section.settings } || {}),
          contentJsonKu: JSON.stringify({ ...section.content?.ku, styles: section.settings } || {}),
          orderIndex: index,
          isVisible: section.isVisible !== false,
          theme: parseInt(section.theme) || 1,
        };

        await pagesApi.createPageComponent(pageId, componentData);
      }
      console.log('✅ New components created successfully');

      // Step 3: Update page metadata
      const updateData = {
        id: parseInt(pageId),
        categoryId: page?.categoryId || 1,
        nameEn: page?.nameEn || page?.title?.en || 'Untitled',
        nameAr: page?.nameAr || page?.title?.ar || 'بدون عنوان',
        nameKu: page?.nameKu || page?.title?.ku || 'بێناو',
        descriptionEn: page?.descriptionEn || page?.metadata?.description?.en || '',
        descriptionAr: page?.descriptionAr || page?.metadata?.description?.ar || '',
        descriptionKu: page?.descriptionKu || page?.metadata?.description?.ku || '',
        slug: page?.slug || '',
        metaTitleEn: page?.metaTitleEn || page?.nameEn || page?.title?.en || '',
        metaTitleAr: page?.metaTitleAr || page?.nameAr || page?.title?.ar || '',
        metaTitleKu: page?.metaTitleKu || page?.nameKu || page?.title?.ku || '',
        metaDescriptionEn: page?.metaDescriptionEn || '',
        metaDescriptionAr: page?.metaDescriptionAr || '',
        metaDescriptionKu: page?.metaDescriptionKu || '',
        isPublished: page?.isPublished || false,
        isHomepage: page?.isHomepage || false,
      };

      console.log('Updating page metadata...');
      await updatePage.mutateAsync(updateData);

      console.log('✅ Page and components saved successfully!');
      console.log('=== SAVE PROCESS COMPLETED ===');

      // Reload to show updated data
      window.location.reload();
    } catch (error) {
      console.error('❌ SAVE FAILED:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      // Check for specific errors
      if (error.message?.includes('Object reference') || error.response?.data?.message?.includes('Object reference')) {
           alert('Failed to save page. This usually happens if the selected Category does not exist. Please go back and select a valid category.');
      } else {
           alert('Failed to save: ' + (error.message || 'Unknown error'));
      }
      throw error;
    }
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
  } = usePageBuilder(
    pageId,
    isNewPage ? [] : transformComponentsToSections(page?.components || []),
    handleSave
  );

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

  if (isLoading && !isNewPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Get page title
  const pageTitle = isNewPage 
    ? (pageData?.nameEn || 'New Page')
    : (page?.title?.en || page?.nameEn || 'Page Builder');

  if (isPreview) {
    return (
      <PagePreview
        sections={sections}
        onClose={() => setIsPreview(false)}
        title={pageTitle}
      />
    );
  }

  const handleSaveComponent = async () => {
    if (!selectedSection || isNewPage) return;

    // Normalize section type
    let type = selectedSection.type;
    if (!type.toLowerCase().includes('section')) {
        type = type.charAt(0).toUpperCase() + type.slice(1) + 'Section';
    }
    if (type.includes('-')) {
        type = type.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Section';
        type = type.replace('SectionSection', 'Section');
    }

    const componentData = {
      id: selectedSection.id,
      pageId: parseInt(pageId),
      componentType: type,
      componentName: selectedSection.name || selectedSection.type,
      contentJsonAr: JSON.stringify({ ...selectedSection.content?.ar, styles: selectedSection.settings } || {}),
      contentJsonEn: JSON.stringify({ ...selectedSection.content?.en, styles: selectedSection.settings } || {}),
      contentJsonKu: JSON.stringify({ ...selectedSection.content?.ku, styles: selectedSection.settings } || {}),
      orderIndex: sections.findIndex(s => s.id === selectedSection.id),
      isVisible: selectedSection.isVisible !== false,
      theme: parseInt(selectedSection.theme) || 1,
    };

    try {
        await pagesApi.updatePageComponent(selectedSection.id, componentData);
        console.log('✅ Component updated successfully via API');
    } catch (error) {
        console.error('Failed to update component:', error);
        throw error;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/admin/pages')}
          >
            Back
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            {isNewPage && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Building new page - Click Save to create
              </p>
            )}
            {!isNewPage && lastSaved && (
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
        <div className="w-64 bg-white dark:bg-gray-800 border-e border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <SectionLibrary onAddSection={addSection} onSave={save} isSaving={isSaving} />
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
              onUpdate={(updates) => {
                updateSection(selectedSection.id, updates);
                setSelectedSection(prev => ({ ...prev, ...updates }));
              }}
              onClose={() => setSelectedSection(null)}
              onSave={!isNewPage ? handleSaveComponent : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}
