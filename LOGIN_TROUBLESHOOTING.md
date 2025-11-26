# Login Troubleshooting Guide

## 400 Bad Request Error

The backend is rejecting the login request. This usually means the field names are incorrect.

## Possible Issues

### 1. Field Names
The backend might expect different field names. Common variations:
- `email` vs `userName` vs `username`
- `password` vs `Password`

### 2. Check Console Logs
Open browser DevTools (F12) and check the Console tab. You should see:
- "Login attempt with: {email: '...', password: '...'}"
- "Login response: {...}"

The response will show what the backend expects.

### 3. Common Solutions

#### Option A: Backend expects userName
If the error says "userName is required", change the login form to use userName instead of email.

#### Option B: Backend expects different casing
Some APIs are case-sensitive. Try:
- `Email` instead of `email`
- `Password` instead of `password`

#### Option C: Check OpenAPI Spec
Look at the LoginDTO schema in the OpenAPI file to see exact field names.

## How to Fix

1. **Open browser console** (F12)
2. **Try to login** and check the error message
3. **Look at the response** - it should tell you what fields are required
4. **Update the form** based on the error message

## Quick Test

Try these credentials in the login form and check the console:
- Email: admin@example.com
- Password: your-password

The console will show exactly what the backend is expecting.
