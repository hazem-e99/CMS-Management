# Login Page - Documentation

## Overview
Created a complete authentication system with login page to access the admin panel.

## Files Created

### 1. [AuthContext.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/contexts/AuthContext.jsx)
Authentication context that manages:
- User login state
- JWT token storage
- Login/logout functionality
- Protected route authentication

### 2. [LoginPage.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/features/auth/pages/LoginPage.jsx)
Beautiful Arabic login page with:
- Email and password fields
- Loading states
- Error handling
- Gradient design
- RTL support

### 3. [ProtectedRoute.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/shared/components/ProtectedRoute.jsx)
Component to protect admin routes from unauthorized access.

## Files Modified

### 1. [App.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/App.jsx)
- Added `/login` route
- Protected all `/admin` routes
- Redirects to login if not authenticated

### 2. [main.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/main.jsx)
- Wrapped app with `AuthProvider`

### 3. [Header.jsx](file:///c:/Users/hazem/OneDrive/Desktop/TestSS/src/shared/layout/Header.jsx)
- Added user info display
- Added logout button

## How It Works

### Login Flow
1. User navigates to `/login`
2. Enters email and password
3. Clicks "تسجيل الدخول" (Login)
4. System calls `POST /api/Authentication/Login`
5. On success:
   - Stores JWT token in `localStorage`
   - Stores user data in `localStorage`
   - Redirects to `/admin`

### Protected Routes
- All `/admin/*` routes are now protected
- If user is not authenticated, they're redirected to `/login`
- Token is automatically added to all API requests via interceptor

### Logout
- Click logout button in header
- Clears token and user data from `localStorage`
- Redirects to `/login`

## API Endpoint Used

\`\`\`
POST http://pgs.runasp.net/api/Authentication/Login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
\`\`\`

**Expected Response:**
\`\`\`json
{
  "succeeded": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "email": "admin@example.com",
    "userName": "Admin",
    ...
  }
}
\`\`\`

## Usage

### Access Login Page
Navigate to: `http://localhost:5173/login`

### Login Credentials
Use your admin credentials from the backend.

### After Login
- You'll be redirected to `/admin/pages`
- Your token will be stored and used for all API calls
- You'll see your email in the header
- Click the logout icon to sign out

## Features

✅ **Beautiful UI** - Modern gradient design with Arabic text
✅ **Loading States** - Shows spinner during login
✅ **Error Handling** - Displays error messages in Arabic
✅ **Auto Redirect** - Redirects to admin panel after login
✅ **Protected Routes** - All admin routes require authentication
✅ **Token Management** - Automatic token storage and injection
✅ **Logout** - Clean logout with redirect to login page
✅ **User Display** - Shows logged-in user email in header

## Security

- JWT tokens stored in `localStorage`
- Tokens automatically added to API requests via Axios interceptor
- Protected routes check authentication before rendering
- Logout clears all auth data

## Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in
- Check if token is valid
- Try logging out and logging in again

### Can't Access Admin Panel
- Navigate to `/login` first
- Enter valid credentials
- Check browser console for errors

### Token Not Working
- Clear `localStorage`
- Login again
- Check if backend is returning correct token format
