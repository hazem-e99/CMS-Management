# Quick Start Guide

## Prerequisites

Make sure you have:
- Node.js 18 or higher installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

If you encounter peer dependency issues, use:

```bash
npm install --legacy-peer-deps
```

### 2. Start the Application

**Option A: Run Both Frontend and Backend Together (Recommended)**

```bash
npm start
```

This will start:
- Frontend at `http://localhost:3000`
- Backend at `http://localhost:3001`

**Option B: Run Separately**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

## First Steps

### 1. Create Your First Page

1. Navigate to **Pages** in the sidebar
2. Click **Create Page**
3. Fill in the title in all three languages (EN/AR/KU)
4. Enter a slug (e.g., "about-us")
5. Click **Create**

### 2. Build Your Page

1. Click **Page Builder** on the page you created
2. Drag sections from the left sidebar to the canvas
3. Click on a section to edit its content
4. Switch between language tabs to add translations
5. Changes auto-save after 2 seconds

### 3. Create a Survey

1. Navigate to **Surveys** in the sidebar
2. Click **Create Survey**
3. Add survey title and description in all languages
4. Click **Add Question**
5. Select question type (Open Text, Single Choice, or Multiple Choice)
6. Add question text in all languages
7. For choice questions, add options
8. Click **Save**
9. Copy the public link to share your survey

### 4. View Survey Responses

1. Go to **Surveys**
2. Click **Responses** on any survey
3. View all submitted responses

## Features to Try

### Theme Switching
- Click the sun/moon icon in the top right to toggle between light and dark mode
- Your preference is saved automatically

### Language Switching
- Use the language dropdown in the top right
- Switch between English, Arabic, and Kurdish
- Notice how the interface direction changes for RTL languages

### Page Builder Features

**Undo/Redo**
- Make changes to sections
- Click Undo/Redo buttons in the toolbar
- Or use Ctrl+Z / Ctrl+Y (Cmd on Mac)

**Section Actions**
- Hover over a section to see action buttons
- Duplicate a section
- Move sections up/down
- Delete sections
- Edit content

**Preview Mode**
- Click **Preview** to see how the page looks to users
- Click **Close Preview** to return to editing

## Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `Ctrl/Cmd + S` - Save (manual)
- `Esc` - Close modals

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**Frontend (Vite)**
Edit `vite.config.js`:
```javascript
server: {
  port: 3002, // Change to any available port
}
```

**Backend (json-server)**
Edit `package.json`:
```json
"server": "json-server --watch mock-api/db.json --port 3003"
```

### Dependencies Won't Install

Try:
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Page Not Loading

1. Make sure both frontend and backend are running
2. Check browser console for errors
3. Verify `http://localhost:3001/api/pages` returns data

### Changes Not Saving

1. Check that json-server is running
2. Look for errors in the browser console
3. Verify the autosave indicator in the Page Builder toolbar

## Development Tips

### Mock Data Location

All mock data is in `/mock-api/db.json`. You can:
- Edit it directly to add test data
- It will auto-reload when changed
- Reset it by copying from git

### Adding New Section Types

1. Add template to `mock-api/db.json` in `sections-library`
2. Create component in `/src/features/pageBuilder/components/sections/`
3. Add to content editor in `ContentEditor.jsx`

### Customizing Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## Next Steps

1. **Explore the Code**
   - Check out `ARCHITECTURE.md` for design decisions
   - Review `README.md` for full documentation

2. **Customize**
   - Add your own section types
   - Modify the theme colors
   - Add more languages

3. **Deploy**
   - Build for production: `npm run build`
   - Preview build: `npm run preview`
   - Deploy `dist` folder to your hosting

4. **Connect Real Backend**
   - Follow the migration guide in `README.md`
   - Update API base URL
   - Add authentication

## Getting Help

- Check `README.md` for detailed documentation
- Review `ARCHITECTURE.md` for technical details
- Look at the code comments for inline documentation

## Common Tasks

### Reset All Data

```bash
# Restore original mock data
git checkout mock-api/db.json
```

### Clear Browser Cache

```bash
# In browser DevTools
Application → Clear Storage → Clear site data
```

### View API Requests

```bash
# json-server logs all requests
# Watch the terminal where you ran `npm run server`
```

## Production Checklist

Before deploying to production:

- [ ] Connect to real backend API
- [ ] Add authentication
- [ ] Enable HTTPS
- [ ] Add error tracking (Sentry, etc.)
- [ ] Set up analytics
- [ ] Configure environment variables
- [ ] Test on all target browsers
- [ ] Run accessibility audit
- [ ] Optimize images
- [ ] Enable gzip compression

Enjoy building with the Admin Dashboard! 🚀
