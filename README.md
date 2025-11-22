# Admin Dashboard

A complete, production-quality Admin Dashboard built with React, Vite, Tailwind CSS, and TanStack Query. Features include a drag-and-drop Page Builder, Survey Builder with multi-language support, and a mock backend using json-server.

## Features

### ✅ Pages Management
- Create, edit, and delete pages
- Parent/child page hierarchy
- Multi-language support (EN/AR/KU)
- Metadata management

### ✅ Page Builder
- **Drag & Drop Canvas** - Intuitive section management
- **Section Library** - Pre-built components (Hero, Features, CTA, Testimonials, Gallery, FAQ)
- **Multi-language Content** - Edit content in EN/AR/KU
- **Undo/Redo** - Full history management
- **Autosave** - Debounced automatic saving (2s delay)
- **Preview Mode** - See final user view
- **Section Actions** - Duplicate, reorder, delete sections

### ✅ Survey Builder
- **Question Types** - Open text, single choice, multiple choice
- **Multi-language** - Questions and options in EN/AR/KU
- **UUID Links** - Unique public survey links
- **Response Viewing** - View all submitted responses
- **Response Management** - Track submissions with timestamps

### ✅ Multi-language System
- **Languages** - English, Arabic, Kurdish (Sorani)
- **RTL Support** - Automatic direction switching for AR/KU
- **react-i18next** - Full translation system
- **Persistent** - Language preference saved to localStorage

### ✅ Theme System
- **Light/Dark Mode** - Toggle between themes
- **Tailwind Dark Classes** - Optimized dark mode
- **Persistent** - Theme saved to localStorage

### ✅ Data Fetching
- **TanStack Query** - Efficient data management
- **Optimistic Updates** - Instant UI feedback
- **Cache Management** - Smart caching strategy
- **Error Handling** - Graceful error states

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching
- **@dnd-kit** - Drag and drop
- **react-hook-form** - Form management
- **react-i18next** - Internationalization
- **Headless UI** - Accessible components
- **Lucide React** - Icons
- **json-server** - Mock backend
- **Axios** - HTTP client

## Project Structure

```
/src
  /app                    # App configuration
  /pages                  # Route pages
  /features              # Feature modules
    /pageBuilder         # Page builder feature
      /components        # Builder components
      /hooks             # Custom hooks
      /pages             # Builder pages
    /pagesManagement     # Pages CRUD
      /components        # Page components
      /hooks             # Page hooks
      /pages             # Page list/forms
    /surveyBuilder       # Survey builder
      /components        # Survey components
      /hooks             # Survey hooks
      /pages             # Survey pages
  /shared                # Shared resources
    /ui                  # Reusable UI components
    /lib                 # Utilities
    /layout              # Layout components
  /services              # API services
  /contexts              # React contexts
  /lib                   # Core libraries
  /styles                # Global styles
/mock-api                # json-server data
  db.json                # Mock database
  routes.json            # API routes
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Start mock backend** (in a separate terminal)
   ```bash
   npm run server
   ```
   The API will run at `http://localhost:3001`

4. **Run both concurrently**
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start json-server mock backend
- `npm start` - Run both frontend and backend concurrently

## Mock Backend (json-server)

The project uses json-server to simulate a REST API. Data is stored in `/mock-api/db.json`.

### API Endpoints

**Pages**
- `GET /api/pages` - Get all pages
- `GET /api/pages/:id` - Get single page
- `POST /api/pages` - Create page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

**Sections Library**
- `GET /api/sections-library` - Get all section templates

**Surveys**
- `GET /api/surveys` - Get all surveys
- `GET /api/surveys/:id` - Get single survey
- `POST /api/surveys` - Create survey
- `PUT /api/surveys/:id` - Update survey
- `DELETE /api/surveys/:id` - Delete survey

**Survey Responses**
- `GET /api/survey-responses` - Get all responses
- `POST /api/survey-responses` - Submit response
- `GET /api/survey-responses?surveyId=:id` - Get responses for survey

## Migrating to Real Backend

When you're ready to connect to a real backend:

1. **Update API Base URL**
   
   Edit `src/services/api.js`:
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-api.com/api', // Change this
     // ... rest of config
   });
   ```

2. **Add Authentication**
   
   Update the request interceptor in `src/services/api.js`:
   ```javascript
   api.interceptors.request.use((config) => {
     const token = storage.get('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

3. **Environment Variables**
   
   Create `.env` file:
   ```
   VITE_API_URL=https://your-api.com/api
   ```
   
   Update `src/services/api.js`:
   ```javascript
   baseURL: import.meta.env.VITE_API_URL,
   ```

4. **Remove json-server**
   ```bash
   npm uninstall json-server concurrently
   ```
   
   Remove `/mock-api` folder and update `package.json` scripts.

## Data Models

### Page
```javascript
{
  id: string,
  title: { en: string, ar: string, ku: string },
  slug: string,
  parentId: string | null,
  metadata: {
    description: { en: string, ar: string, ku: string },
    isPublished: boolean,
    showInNav: boolean
  },
  sections: Section[],
  createdAt: string,
  updatedAt: string
}
```

### Section
```javascript
{
  id: string,
  type: string, // 'hero' | 'features' | 'cta' | etc.
  order: number,
  content: {
    en: object,
    ar: object,
    ku: object
  },
  settings: object
}
```

### Survey
```javascript
{
  id: string (UUID),
  title: { en: string, ar: string, ku: string },
  description: { en: string, ar: string, ku: string },
  questions: Question[],
  createdAt: string
}
```

### Question
```javascript
{
  id: string,
  type: 'open' | 'single' | 'multi',
  text: { en: string, ar: string, ku: string },
  options: Array<{ en: string, ar: string, ku: string }>, // for choice types
  required: boolean
}
```

## Key Features Explained

### Undo/Redo
The Page Builder maintains a history stack of all section changes. Use the toolbar buttons or keyboard shortcuts to navigate history.

### Autosave
Changes are automatically saved 2 seconds after the last edit. The toolbar shows save status.

### RTL Support
Arabic and Kurdish automatically switch to right-to-left layout. All inputs respect text direction.

### Optimistic Updates
UI updates immediately when you make changes, with automatic rollback on errors.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Code Splitting** - Vendor chunks for React, Query, and DnD
- **Lazy Loading** - Dynamic imports for heavy modules
- **Debounced Autosave** - Prevents excessive API calls
- **Optimized Queries** - Smart cache invalidation
- **Tailwind Purge** - Removes unused CSS in production

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Semantic HTML
- Color contrast compliance

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
