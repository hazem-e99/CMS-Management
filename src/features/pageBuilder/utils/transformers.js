/**
 * Transform components from API format to sections format for rendering
 */
export function transformComponentsToSections(components) {
  if (!components || components.length === 0) return [];

  return components
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map(component => {
      const tryParseJSON = (jsonString) => {
        try {
          return JSON.parse(jsonString || '{}');
        } catch {
          return {};
        }
      };

      return {
        id: component.id,
        type: component.componentType,
        name: component.componentName,
        content: {
          ar: tryParseJSON(component.contentJsonAr),
          en: tryParseJSON(component.contentJsonEn),
          ku: tryParseJSON(component.contentJsonKu),
        },
        isVisible: component.isVisible,
        theme: component.theme,
        orderIndex: component.orderIndex,
      };
    });
}

/**
 * Transform sections to components format for API
 */
export function transformSectionsToComponents(sections, pageId) {
  if (!sections || sections.length === 0) return [];

  return sections.map((section, index) => {
    let type = section.type || 'Section';
    if (type.toLowerCase() === 'hero') type = 'HeroSection';
    else if (type.toLowerCase() === 'features') type = 'FeaturesSection';
    else if (type.toLowerCase() === 'cta') type = 'CtaSection';
    else type = type.charAt(0).toUpperCase() + type.slice(1);

    return {
      pageId: parseInt(pageId),
      componentType: type,
      componentName: section.name || type,
      contentJsonAr: JSON.stringify(section.content?.ar || {}),
      contentJsonEn: JSON.stringify(section.content?.en || {}),
      contentJsonKu: JSON.stringify(section.content?.ku || {}),
      isVisible: section.isVisible !== false,
      theme: section.theme || 1,
      orderIndex: index,
    };
  });
}
