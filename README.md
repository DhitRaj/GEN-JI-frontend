# Gen-Ji Frontend

Modern Next.js frontend for Gen-Ji platform with Tailwind CSS and Framer Motion animations.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Smooth animations with Framer Motion
- ✅ Admin login and dashboard
- ✅ Client form submission
- ✅ Projects showcase
- ✅ Services display

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm run start
```

## Folder Structure

```
components/
├── Navbar.tsx          # Navigation bar
├── Footer.tsx          # Footer
└── sections/
    ├── Hero.tsx        # Hero section
    ├── Services.tsx    # Services showcase
    ├── Projects.tsx    # Projects showcase
    └── ClientForm.tsx  # Client submission form

app/
├── page.tsx            # Home page
├── admin/
│   ├── page.tsx        # Login page
│   └── dashboard/
│       └── page.tsx    # Admin dashboard
├── layout.tsx          # Root layout
└── globals.css         # Global styles

lib/
├── api.ts              # API configuration
└── utils.ts            # Utility functions
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Pages

- `/` - Home page with all sections
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard

## Styling

Using Tailwind CSS with custom dark mode configuration. Colors defined in `tailwind.config.js`.

## Animations

Framer Motion for smooth transitions and animations on sections and components.

---

Built with Next.js 14 + React 18 + Tailwind CSS
