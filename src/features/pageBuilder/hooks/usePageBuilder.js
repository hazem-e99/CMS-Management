import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../../../shared/lib/debounce';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for Page Builder state management
 * Handles sections, undo/redo, and autosave
 */
export function usePageBuilder(pageId, initialSections = [], onSave) {
  const [sections, setSections] = useState(initialSections);
  const [history, setHistory] = useState([initialSections]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Update sections when initial data changes
  useEffect(() => {
    if (initialSections && initialSections.length >= 0) {
      setSections(initialSections);
      setHistory([initialSections]);
      setHistoryIndex(0);
    }
  }, [JSON.stringify(initialSections)]);

  // Add to history
  const addToHistory = (newSections) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSections);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Add section
  const addSection = useCallback((sectionTemplate) => {
    const newSection = {
      ...sectionTemplate,
      id: uuidv4(),
      order: sections.length + 1,
    };
    const newSections = [...sections, newSection];
    setSections(newSections);
    addToHistory(newSections);
  }, [sections]);

  // Remove section
  const removeSection = useCallback((sectionId) => {
    const newSections = sections
      .filter((s) => s.id !== sectionId)
      .map((s, index) => ({ ...s, order: index + 1 }));
    setSections(newSections);
    addToHistory(newSections);
  }, [sections]);

  // Update section
  const updateSection = useCallback((sectionId, updates) => {
    const newSections = sections.map((s) =>
      s.id === sectionId ? { ...s, ...updates } : s
    );
    setSections(newSections);
    addToHistory(newSections);
  }, [sections]);

  // Reorder sections
  const reorderSections = useCallback((newOrder) => {
    const newSections = newOrder.map((s, index) => ({ ...s, order: index + 1 }));
    setSections(newSections);
    addToHistory(newSections);
  }, []);

  // Duplicate section
  const duplicateSection = useCallback((sectionId) => {
    const sectionToDuplicate = sections.find((s) => s.id === sectionId);
    if (sectionToDuplicate) {
      const newSection = {
        ...sectionToDuplicate,
        id: uuidv4(),
        order: sections.length + 1,
      };
      const newSections = [...sections, newSection];
      setSections(newSections);
      addToHistory(newSections);
    }
  }, [sections]);

  // Move section up
  const moveSectionUp = useCallback((sectionId) => {
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      const reordered = newSections.map((s, i) => ({ ...s, order: i + 1 }));
      setSections(reordered);
      addToHistory(reordered);
    }
  }, [sections]);

  // Move section down
  const moveSectionDown = useCallback((sectionId) => {
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      const reordered = newSections.map((s, i) => ({ ...s, order: i + 1 }));
      setSections(reordered);
      addToHistory(reordered);
    }
  }, [sections]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSections(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSections(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Save function
  const save = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(sections);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return {
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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    save,
    isSaving,
    lastSaved,
  };
}
