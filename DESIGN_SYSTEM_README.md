# Design Selection System - Implementation Guide

This document outlines the structure and usage of the new Design Selection System for Antigravity.

## 📋 Overview

The system allows users to:
1. Browse design templates
2. Preview designs in real-time (iframe-based)
3. Select a design
4. Submit a request with their requirements

## 🗂️ File Structure

```
src/
├── types/
│   └── design.ts                    # TypeScript interfaces
├── data/
│   ├── designs.ts                   # Design data & utilities
│   └── presets.ts                   # Theme presets (from theme studio)
├── lib/
│   ├── designService.ts             # Design utilities
│   ├── formValidator.ts             # Form validation
│   └── exportFormats.ts             # Export functions (from theme studio)
├── hooks/
│   ├── useThemeBuilder.ts           # Theme state management (from theme studio)
│   └── useThemeExport.ts            # Export hook (from theme studio)
└── components/
    ├── DesignCard.tsx               # Design card component
    ├── DesignForm.tsx               # Request form component
    ├── DesignPreview.tsx            # Preview iframe component
    ├── ThemeBuilder/                # Theme customization (from theme studio)
    ├── ThemePresets/                # Theme presets (from theme studio)
    └── ThemeExport/                 # Export UI (from theme studio)

app/
├── designs/
│   └── page.tsx                     # Design gallery/listing
├── preview/
│   └── [slug]/
│       ├── page.tsx                 # Design preview page
│       └── not-found.tsx
├── select/
│   └── [slug]/
│       ├── page.tsx                 # Design selection & form page
│       └── not-found.tsx
├── api/
│   └── submit/
│       └── route.ts                 # Form submission API
└── theme-studio/
    └── page.tsx                     # Theme customization (existing)
```

## 🎨 Design Data Structure

```typescript
interface Design {
  id: string;                  // Unique identifier
  slug: string;                // URL-friendly identifier
  title: string;               // Design title
  description: string;         // Short description
  category: string;            // Category (e.g., "Dashboard", "eCommerce")
  previewImage: string;        // Thumbnail image path
  demoPath: string;            // Path to demo HTML (in /public/demos)
  features?: string[];         // Key features list
  createdAt?: string;          // Creation date
}
```

## 🔄 User Flow

1. **Gallery** → `/designs`
   - View all available templates
   - Filter by category

2. **Preview** → `/preview/[slug]`
   - Live iframe preview
   - View features
   - CTA: "Select This Design"

3. **Selection** → `/select/[slug]`
   - Form with: name, email, message
   - Design info displayed
   - Submit request

4. **API** → `POST /api/submit`
   - Validates form data
   - Creates design request
   - Returns success/error response

## 📝 Form Validation

The system uses client-side validation with:
- Name: 2-100 characters
- Email: Valid email format
- Message: 10-1000 characters

Backend validation also occurs on API route.

## 🧩 Component Usage

### DesignCard
```tsx
import { DesignCard } from '@/src/components/DesignCard';
import { Design } from '@/src/types/design';

<DesignCard design={design} />
```

### DesignForm
```tsx
import { DesignForm } from '@/src/components/DesignForm';

<DesignForm
  designSlug="design1"
  designTitle="Modern Dashboard"
  onSuccess={() => console.log('Success!')}
/>
```

### DesignPreview
```tsx
import { DesignPreview } from '@/src/components/DesignPreview';

<DesignPreview design={design} isLoading={false} />
```

## 🔌 API Endpoints

### POST /api/submit
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to customize this for my business...",
  "designSlug": "design1",
  "designTitle": "Modern Dashboard"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Request submitted successfully!",
  "data": {
    "id": "req_1234567890_abc123def",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "...",
    "designSlug": "design1",
    "designTitle": "Modern Dashboard",
    "status": "pending",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🛠️ Adding New Designs

Edit `src/data/designs.ts`:

```typescript
{
  id: '4',
  slug: 'design4',
  title: 'Blog Platform',
  description: 'Complete blogging solution with comments and categories.',
  category: 'Blog',
  previewImage: '/designs/design4-thumb.jpg',
  demoPath: '/demos/design4/index.html',
  features: ['Comments', 'Categories', 'Author Pages'],
  createdAt: '2024-02-01',
}
```

Then create demo at: `/public/demos/design4/index.html`

## 📦 Dependencies

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS

## ✅ Best Practices

1. **Validation**: Always validate on both client and server
2. **Error Handling**: Provide clear error messages
3. **Loading States**: Show loading indicators for async operations
4. **Type Safety**: Use TypeScript interfaces, avoid `any`
5. **Responsive**: Mobile-first design with Tailwind utility classes
6. **Accessibility**: Proper labels, ARIA attributes, keyboard support
7. **Performance**: Use dynamic imports where appropriate
8. **Security**: Sanitize user inputs, use CORS headers if needed

## 🔮 Future Enhancements

1. **Database Integration**: Save requests to MongoDB/Supabase
2. **Email Notifications**: Send confirmation emails
3. **Admin Dashboard**: Review and manage requests
4. **Design Customizer**: Let users modify designs before submission
5. **Payment Integration**: For premium designs
6. **Design Versioning**: Track design updates
7. **User Accounts**: Save favorites, view history
8. **Search & Filter**: Advanced filtering options

## 🐛 Troubleshooting

**Issue: Design preview not loading**
- Check demo path in design data
- Verify file exists at `/public/demos/[slug]/index.html`
- Check browser console for CORS or sandbox issues

**Issue: Form not submitting**
- Check validation errors in form
- Verify API route is working: `POST /api/submit`
- Check browser network tab for API response

**Issue: 404 on preview/select pages**
- Verify design slug is correct
- Ensure design exists in `DESIGNS` array
- Check URL format: `/preview/design1`

## 📞 Support

For issues or questions, contact the development team.
