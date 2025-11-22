# Admin Dashboard - Architecture Documentation

## Overview

This document describes the architecture and design decisions for the Admin Dashboard application.

## Architecture Pattern

The application follows a **Feature-Based Architecture** with clear separation of concerns:

```
Features (Domain Logic) → Services (API) → Backend
     ↓
Shared Components (UI)
     ↓
Core Infrastructure (Theme, i18n, Routing)
```

## Directory Structure Philosophy

### Feature-Based Organization

Each major feature is self-contained in its own directory:

```
/features
  /pageBuilder
    /components    # Feature-specific components
    /hooks         # Feature-specific hooks
    /pages         # Feature pages/routes
    /utils         # Feature utilities
    /models        # Data models (if needed)
```

**Benefits:**
- Easy to locate feature code
- Clear boundaries between features
- Scalable as features grow
- Easy to refactor or remove features

### Shared Resources

Common code lives in `/shared`:

```
/shared
  /ui          # Reusable UI components (Button, Input, etc.)
  /lib         # Utilities (cn, debounce, storage)
  /layout      # Layout components (Sidebar, Header)
```

**Benefits:**
- Single source of truth for UI components
- Consistent styling across features
- Easy to update globally

## Key Design Decisions

### 1. No TypeScript

**Decision:** Use JavaScript (.jsx) instead of TypeScript

**Rationale:**
- Faster development for prototypes
- Lower learning curve
- Simpler build configuration
- As requested by requirements

**Trade-offs:**
- Less type safety
- More runtime errors possible
- Requires more careful coding

### 2. TanStack Query for Data Fetching

**Decision:** Use TanStack Query instead of Redux or plain fetch

**Rationale:**
- Built-in caching and invalidation
- Automatic background refetching
- Optimistic updates support
- Less boilerplate than Redux
- Perfect for server-state management

**Implementation:**
```javascript
// Custom hooks per feature
export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: pagesService.getPages,
  });
}
```

### 3. json-server for Mock Backend

**Decision:** Use json-server instead of MSW (Mock Service Worker)

**Rationale:**
- Real HTTP server (easier to test with Postman/curl)
- Simpler to understand
- Easy migration path to real backend
- Persistent data during development
- As requested by requirements

**Trade-offs:**
- Requires separate process
- Not suitable for production

### 4. @dnd-kit for Drag and Drop

**Decision:** Use @dnd-kit instead of react-beautiful-dnd

**Rationale:**
- Modern, actively maintained
- Better performance
- More flexible
- Smaller bundle size
- Better TypeScript support (even though we're not using TS)

### 5. Headless UI for Modals

**Decision:** Use Headless UI instead of building from scratch

**Rationale:**
- Accessibility built-in
- Focus management
- Keyboard navigation
- Maintained by Tailwind team
- Unstyled (full control over appearance)

## State Management Strategy

### Server State (TanStack Query)

All data from the backend is managed by TanStack Query:

- **Pages** - `usePages()`, `usePage(id)`, `useCreatePage()`, etc.
- **Surveys** - `useSurveys()`, `useSurvey(id)`, etc.
- **Sections** - `useSectionsLibrary()`

**Benefits:**
- Automatic caching
- Background updates
- Optimistic updates
- Loading/error states

### Client State (React Context)

UI state is managed with React Context:

- **Theme** - `ThemeContext` (light/dark mode)
- **Language** - `LanguageContext` (EN/AR/KU + RTL)

**Benefits:**
- Simple for global UI state
- No external dependencies
- Easy to understand

### Local State (useState)

Component-specific state uses `useState`:

- Form inputs
- Modal open/close
- Selected items
- Temporary UI state

## Data Flow

### Read Flow (Query)

```
Component → useQuery Hook → Service → API → json-server
                ↓
           TanStack Query Cache
                ↓
           Component Re-render
```

### Write Flow (Mutation)

```
Component → useMutation Hook → Service → API → json-server
                ↓
        Optimistic Update (optional)
                ↓
        Cache Invalidation
                ↓
        Automatic Refetch
                ↓
        Component Re-render
```

## Multi-Language Implementation

### Structure

All text content has three language versions:

```javascript
{
  title: {
    en: "Welcome",
    ar: "مرحباً",
    ku: "بەخێربێیت"
  }
}
```

### RTL Support

Arabic and Kurdish automatically switch to RTL:

```javascript
// LanguageContext.jsx
useEffect(() => {
  const isRTL = ['ar', 'ku'].includes(i18n.language);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}, [i18n.language]);
```

### Translation Files

UI translations in `src/lib/i18n.js`:

```javascript
const resources = {
  en: { translation: { ... } },
  ar: { translation: { ... } },
  ku: { translation: { ... } },
};
```

## Page Builder Architecture

### History Management

Undo/redo uses a history stack:

```javascript
const [history, setHistory] = useState([initialSections]);
const [historyIndex, setHistoryIndex] = useState(0);

// Add to history on every change
const addToHistory = (newSections) => {
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(newSections);
  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
};
```

### Autosave

Debounced autosave prevents excessive API calls:

```javascript
const debouncedSave = useCallback(
  debounce(() => save(), 2000),
  [sections]
);

useEffect(() => {
  debouncedSave();
}, [sections]);
```

### Drag and Drop

Uses @dnd-kit with sortable context:

```javascript
<DndContext onDragEnd={handleDragEnd}>
  <SortableContext items={sections.map(s => s.id)}>
    {sections.map(section => (
      <SortableSection key={section.id} section={section} />
    ))}
  </SortableContext>
</DndContext>
```

## Performance Optimizations

### Code Splitting

Vite configuration splits vendor code:

```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      'query-vendor': ['@tanstack/react-query'],
      'dnd-vendor': ['@dnd-kit/core', '@dnd-kit/sortable'],
    },
  },
}
```

### Memoization

Used in Page Builder hooks:

```javascript
const addSection = useCallback((template) => {
  // ... logic
}, [sections]);
```

### Debouncing

Used for autosave and search:

```javascript
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

## Security Considerations

### Current State (Development)

- No authentication
- No authorization
- Open API endpoints
- Client-side only validation

### Production Recommendations

1. **Add Authentication**
   - JWT tokens
   - Secure token storage
   - Token refresh logic

2. **Add Authorization**
   - Role-based access control
   - Permission checks on API calls
   - Protected routes

3. **Validate on Backend**
   - Never trust client input
   - Sanitize all data
   - Rate limiting

4. **HTTPS Only**
   - Encrypt all traffic
   - Secure cookies
   - CORS configuration

## Testing Strategy

### Recommended Approach

1. **Unit Tests** (Vitest)
   - Utility functions
   - Custom hooks
   - Pure components

2. **Integration Tests** (React Testing Library)
   - Feature workflows
   - Form submissions
   - API interactions

3. **E2E Tests** (Playwright/Cypress)
   - Critical user journeys
   - Page Builder flow
   - Survey creation flow

### Not Implemented

Testing is not included in this version but the architecture supports it:

- Services are mockable
- Components are testable
- Hooks are isolated

## Migration to Production Backend

### Step-by-Step Guide

1. **Update API Base URL**
   ```javascript
   // src/services/api.js
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
   });
   ```

2. **Add Authentication**
   ```javascript
   api.interceptors.request.use((config) => {
     const token = storage.get('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

3. **Update Services**
   - Keep the same interface
   - Backend should match json-server structure
   - Add error handling as needed

4. **Environment Variables**
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_ENV=production
   ```

5. **Remove json-server**
   - Delete `/mock-api` folder
   - Remove from `package.json`
   - Update README

## Scalability Considerations

### Current Limits

- Client-side pagination only
- No virtualization
- All data loaded at once

### Future Improvements

1. **Server-Side Pagination**
   ```javascript
   useQuery({
     queryKey: ['pages', page, limit],
     queryFn: () => pagesService.getPages({ page, limit }),
   });
   ```

2. **Virtual Scrolling**
   - Use `react-virtual` for long lists
   - Render only visible items

3. **Lazy Loading**
   - Load sections on demand
   - Infinite scroll for responses

4. **Caching Strategy**
   - Longer cache times for static data
   - Shorter for dynamic data
   - Background refetching

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills Needed

None currently, but may need:
- `IntersectionObserver` for older browsers
- `ResizeObserver` for older browsers

## Accessibility

### Current Implementation

- Semantic HTML
- ARIA labels on buttons
- Keyboard navigation in modals
- Focus management

### Future Improvements

- Screen reader testing
- Keyboard shortcuts
- Skip links
- ARIA live regions for notifications

## Conclusion

This architecture provides:

✅ **Scalability** - Easy to add features
✅ **Maintainability** - Clear structure
✅ **Performance** - Optimized loading
✅ **Developer Experience** - Easy to understand
✅ **Migration Path** - Ready for production backend

The design prioritizes simplicity and pragmatism while maintaining professional quality.
