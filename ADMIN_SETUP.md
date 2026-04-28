# Admin Panel Setup Guide

## Overview
The new admin panel is a complete app-like interface with:
- **Login System**: Secure JWT-based authentication
- **Sidebar Navigation**: Easy access to all admin features
- **Dashboard**: Overview of key metrics
- **Project Management**: Full CRUD operations for portfolio projects
- **Client Management**: Track and manage client requests

## Features

### 1. Admin Login (`/admin`)
- Email and password authentication
- JWT token stored in localStorage
- Automatic redirect to dashboard if already logged in
- Secure session management

### 2. Dashboard (`/admin/dashboard`)
- Total clients count
- Total projects count
- New requests count
- Quick action links to manage projects and clients

### 3. Projects Management (`/admin/projects`)
**CRUD Operations:**
- **Create**: Add new projects with title, description, tech stack, image, and live URL
- **Read**: View all projects in a clean list format
- **Update**: Edit existing project details
- **Delete**: Remove projects from portfolio

**Project Fields:**
- Title (required)
- Description (required)
- Tech Stack (array of technologies)
- Image URL (optional)
- Live URL (optional)
- Featured flag (to highlight on portfolio)

### 4. Clients Management (`/admin/clients`)
- View all client requests
- Update client status (New → Contacted → In Progress → Completed)
- Delete client records
- View submission date and details

## How to Use

### Login
1. Navigate to `http://localhost:3001/admin`
2. Enter admin credentials (set in backend `.env`)
3. Click "Login"

### Add a Project
1. Go to **Projects** from sidebar
2. Click **"Add Project"** button
3. Fill in project details
4. Add technologies by typing and clicking "Add"
5. Click **"Create Project"**
6. Project will appear on the public portfolio page

### Edit a Project
1. Go to **Projects**
2. Click the **Edit** (pencil) icon on any project
3. Modify details
4. Click **"Update Project"**

### Delete a Project
1. Go to **Projects**
2. Click the **Delete** (trash) icon
3. Confirm deletion

### Manage Clients
1. Go to **Clients** from sidebar
2. Click on any status badge to change it
3. Select new status from dropdown
4. Delete clients using the trash icon

## Backend Integration

### API Endpoints Used

**Authentication:**
- `POST /api/auth/login` - Admin login

**Projects:**
- `GET /api/projects` - Get all projects (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

**Clients:**
- `GET /api/clients` - Get all clients (protected)
- `PUT /api/clients/:id` - Update client status (protected)
- `DELETE /api/clients/:id` - Delete client (protected)

## Environment Variables

Make sure these are set in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Security Notes

1. **JWT Tokens**: Stored in localStorage, expires in 7 days
2. **Protected Routes**: All admin pages require valid token
3. **CORS**: Backend configured to accept requests from frontend origin
4. **Rate Limiting**: API has rate limiting (100 requests per 15 minutes)

## Styling

The admin panel uses:
- Tailwind CSS for styling
- Gradient backgrounds (purple to cyan)
- Glass-morphism effects
- Responsive design for mobile and desktop
- Dark theme optimized for long work sessions

## Troubleshooting

**Login fails:**
- Check backend is running on correct port
- Verify admin credentials in backend `.env`
- Check `NEXT_PUBLIC_API_URL` is correct

**Projects not showing:**
- Ensure backend is connected
- Check network tab for API errors
- Verify token is valid

**Changes not persisting:**
- Check browser console for errors
- Verify backend database connection
- Check API response status codes

## File Structure

```
gen-ji-frontend/app/admin/
├── layout.tsx           # Main layout with sidebar
├── page.tsx             # Login page
├── dashboard/
│   └── page.tsx         # Dashboard overview
├── projects/
│   └── page.tsx         # Project CRUD management
└── clients/
    └── page.tsx         # Client management
```
