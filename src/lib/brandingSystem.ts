export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primary: string;
  secondary: string;
  arabic: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  hero: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface CompanyBranding {
  id: string;
  nameEn: string;
  nameAr: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  logoUrl?: string;
  heroBgUrl?: string;
  websiteUrl?: string;
  description: string;
  headerStyle?: 'full' | 'compact' | 'centered';
  layoutType?: 'standard' | 'cloned';
}

export const entityBranding: Record<string, CompanyBranding> = {
  sadad: {
    id: 'sadad',
    nameEn: 'SADAD',
    nameAr: 'سداد',
    colors: {
      primary: '#EF7622',
      secondary: '#9D9D9C',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#333333',
      textLight: '#777777',
      textOnPrimary: '#FFFFFF',
      border: '#D1D1D1',
    },
    fonts: { primary: 'Futura, sans-serif', secondary: 'Arial, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'none' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '0px', md: '4px', lg: '4px' },
    logoUrl: '/assets/branding/logo-sadad.png',
    description: 'نظام سداد للمدفوعات السعودية',
    layoutType: 'cloned'
  },
  dhl: {
    id: 'dhl',
    nameEn: 'DHL',
    nameAr: 'دي إتش إل',
    colors: {
      primary: '#D40511',
      secondary: '#FFCC00',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFCC00',
      text: '#000000',
      textLight: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#D40511',
    },
    fonts: { primary: 'Delivery, Arial Black, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'none' },
    shadows: { sm: 'none', md: 'none', lg: 'none' },
    borderRadius: { sm: '0px', md: '0px', lg: '0px' },
    logoUrl: '/assets/branding/logo-dhl.png',
    description: 'DHL Logistics official visual identity',
    layoutType: 'cloned'
  },
  alrajhi: {
    id: 'alrajhi',
    nameEn: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    colors: {
      primary: '#0047BB',
      secondary: '#F29100',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F4F7FF',
      text: '#002E7A',
      textLight: '#6B82A7',
      textOnPrimary: '#FFFFFF',
      border: '#E1E9F5',
    },
    fonts: { primary: 'Inter, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'linear-gradient(135deg, #0047BB, #002E7A)', secondary: 'none', hero: 'none' },
    shadows: { sm: '0 2px 4px rgba(0,71,187,0.05)', md: '0 8px 16px rgba(0,71,187,0.1)', lg: '0 20px 40px rgba(0,71,187,0.15)' },
    borderRadius: { sm: '8px', md: '16px', lg: '24px' },
    logoUrl: '/assets/branding/logo-alrajhi.png',
    description: 'الهوية البصرية الجديدة لمصرف الراجحي',
    layoutType: 'cloned'
  },
  knet: {
    id: 'knet',
    nameEn: 'KNET',
    nameAr: 'كي نت',
    colors: {
      primary: '#008080',
      secondary: '#E31B23',
      accent: '#FFFFFF',
      background: '#F4F4F4',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1D1D1',
    },
    fonts: { primary: 'Montserrat, sans-serif', secondary: 'Helvetica, sans-serif', arabic: 'Cairo, sans-serif' },
    gradients: { primary: 'none', secondary: 'none', hero: 'none' },
    shadows: { sm: '0 2px 4px rgba(0,0,0,0.05)', md: '0 4px 12px rgba(0,0,0,0.1)', lg: '0 10px 25px rgba(0,0,0,0.15)' },
    borderRadius: { sm: '4px', md: '8px', lg: '10px' },
    logoUrl: '/assets/branding/logo-knet.png',
    description: 'شبكة كي نت الكويتية',
    layoutType: 'cloned'
  }
};

export const bankBranding: Record<string, CompanyBranding> = {
  alrajhi: entityBranding.alrajhi,
  // Add other banks as needed
};

export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  aramex: entityBranding.sadad, // Defaulting or mapping specifically
  dhl: entityBranding.dhl,
};

export const getBranding = (id: string): CompanyBranding => {
  return entityBranding[id] || entityBranding['sadad'];
};

export const getBrandingByCompany = getBranding;
