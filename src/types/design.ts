// Design-related TypeScript interfaces

export interface Design {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  previewImage: string;
  demoPath: string;
  features?: string[];
  createdAt?: string;
}

export interface DesignRequest {
  id?: string;
  name: string;
  email: string;
  message: string;
  designSlug: string;
  designTitle?: string;
  themeCustomization?: ThemeCustomization;
  status?: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ThemeCustomization {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  typography?: string;
  spacing?: string;
  borderRadius?: string;
  shadowIntensity?: string;
  fontFamily?: string;
  componentSize?: string;
  animationSpeed?: string;
  contrastLevel?: string;
  layoutWidth?: string;
}

export interface DesignRequestWithTheme extends DesignRequest {
  themeCustomization?: ThemeCustomization;
}

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
