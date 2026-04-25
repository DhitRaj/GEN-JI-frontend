import { Design } from '../types/design';

export const DESIGNS: Design[] = [
  {
    id: '1',
    slug: 'design1',
    title: 'Modern Dashboard',
    description: 'Clean and minimalist dashboard design with data visualization.',
    category: 'Dashboard',
    previewImage: '/designs/design1-thumb.jpg',
    demoPath: '/demos/design1/index.html',
    features: ['Responsive', 'Dark Mode', 'Analytics'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'design2',
    title: 'eCommerce Store',
    description: 'Full-featured e-commerce layout with product showcase.',
    category: 'eCommerce',
    previewImage: '/designs/design2-thumb.jpg',
    demoPath: '/demos/design2/index.html',
    features: ['Product Grid', 'Cart', 'Checkout'],
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    slug: 'design3',
    title: 'Portfolio Showcase',
    description: 'Professional portfolio template for creatives and developers.',
    category: 'Portfolio',
    previewImage: '/designs/design3-thumb.jpg',
    demoPath: '/demos/design3/index.html',
    features: ['Project Gallery', 'About Section', 'Contact'],
    createdAt: '2024-01-25',
  },
];

export const getDesignBySlug = (slug: string): Design | undefined => {
  return DESIGNS.find(design => design.slug === slug);
};

export const getAllDesigns = (): Design[] => {
  return DESIGNS;
};

export const getDesignsByCategory = (category: string): Design[] => {
  return DESIGNS.filter(design => design.category === category);
};
