// WORM_V2: ULTIMATE GCC SOVEREIGN SERVICE MATRIX V11
export const serviceLogos: Record<string, { 
  logo: string; 
  colors: { primary: string; secondary: string }; 
  ogImage?: string; 
  heroImage?: string; 
  description?: string; 
  radius?: string; 
  font?: string; 
  nameAr?: string;
  nameEn?: string;
  category: 'identity' | 'shipping' | 'lifestyle' | 'government' 
}> = {
  // --- SAUDI ARABIA (KSA) ---
  sadad: {
    logo: "/assets/branding/logo-sadad.png",
    colors: { primary: "#EB7625", secondary: "#2B335E" },
    heroImage: "/assets/branding/hero-sadad.jpg",
    nameAr: "سداد",
    nameEn: "SADAD",
    font: "FrutigerLTArabic",
    category: "government"
  },
  nafath: {
    logo: "/assets/branding/logo-nafath.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "نفاذ",
    nameEn: "NAFATH",
    category: "identity"
  },
  absher: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "أبشر",
    nameEn: "Absher",
    category: "identity"
  },
  tawakkalna: {
    logo: "/assets/branding/logo-tawakkalna.png",
    colors: { primary: "#00A88C", secondary: "#007A65" },
    nameAr: "توكلنا",
    nameEn: "Tawakkalna",
    category: "identity"
  },
  etheq: {
    logo: "/assets/branding/logo-absher.png",
    colors: { primary: "#006A4D", secondary: "#004D38" },
    nameAr: "إيثاق",
    nameEn: "Etheq",
    category: "identity"
  },
  etimad: {
    logo: "/assets/branding/logo-etimad.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    nameAr: "منصة اعتماد",
    nameEn: "Etimad",
    category: "government"
  },

  // --- UNITED ARAB EMIRATES (UAE) ---
  "uae-pass": {
    logo: "/assets/branding/logo-uae-pass.png",
    colors: { primary: "#000000", secondary: "#1A1A1A" },
    nameAr: "الهوية الرقمية UAE PASS",
    nameEn: "UAE PASS",
    category: "identity"
  },
  edirham: {
    logo: "/assets/branding/logo-dirham.png",
    colors: { primary: "#B2904B", secondary: "#8E723C" },
    nameAr: "درهم إلكتروني",
    nameEn: "eDirham",
    category: "government"
  },
  jaywan: {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#CE1126", secondary: "#00732F" },
    nameAr: "جيوان",
    nameEn: "Jaywan",
    category: "government"
  },
  "abu-dhabi-pay": {
    logo: "/assets/branding/logo-uae-gov.png",
    colors: { primary: "#003D71", secondary: "#002A4E" },
    nameAr: "سداد أبوظبي",
    nameEn: "Abu Dhabi Pay",
    category: "government"
  },

  // --- KUWAIT (KW) ---
  hawyti: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "هويتي",
    nameEn: "Hawyti",
    category: "identity"
  },
  sahel: {
    logo: "/assets/branding/logo-sahel.png",
    colors: { primary: "#005596", secondary: "#003366" },
    nameAr: "سهل",
    nameEn: "Sahel",
    category: "identity"
  },
  knet: {
    logo: "/assets/branding/logo-knet.png",
    colors: { primary: "#007A33", secondary: "#004B1F" },
    nameAr: "كي نت",
    nameEn: "KNET",
    category: "government"
  },

  // --- QATAR (QA) ---
  qdi: {
    logo: "/assets/branding/logo-ahlibank-com-qa.png",
    colors: { primary: "#8C1D3F", secondary: "#5D132A" },
    nameAr: "الهوية الرقمية القطرية",
    nameEn: "QDI",
    category: "identity"
  },
  hukoomi: {
    logo: "/assets/branding/logo-cbq-qa.png",
    colors: { primary: "#8C1D3F", secondary: "#5D132A" },
    nameAr: "حكومي",
    nameEn: "Hukoomi",
    category: "government"
  },

  // --- BAHRAIN (BH) ---
  ekey: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "المفتاح الإلكتروني",
    nameEn: "eKey",
    category: "identity"
  },
  benefit: {
    logo: "/assets/branding/logo-benefitpay.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "بنفت",
    nameEn: "Benefit",
    category: "government"
  },
  mygov: {
    logo: "/assets/branding/logo-bahrainpost.png",
    colors: { primary: "#E31E24", secondary: "#B5121B" },
    nameAr: "حكومتي",
    nameEn: "MyGov",
    category: "government"
  },

  // --- OMAN (OM) ---
  "rop-id": {
    logo: "/assets/branding/logo-omanpost.png",
    colors: { primary: "#C8102E", secondary: "#003B71" },
    nameAr: "الهوية الرقمية العمانية",
    nameEn: "ROP ID",
    category: "identity"
  },
  theqa: {
    logo: "/assets/branding/logo-thawani.png",
    colors: { primary: "#C8102E", secondary: "#003B71" },
    nameAr: "ثقة",
    nameEn: "THEQA",
    category: "identity"
  },
  omannet: {
    logo: "/assets/branding/logo-oman-arabbank.png",
    colors: { primary: "#003D7A", secondary: "#C8102E" },
    nameAr: "عمان نت",
    nameEn: "OmanNet",
    category: "government"
  },

  // --- SHIPPING & LOGISTICS ---
  aramex: {
    logo: "/assets/branding/logo-aramex.png",
    colors: { primary: "#DC291E", secondary: "#A01E16" },
    nameAr: "ارامكس",
    nameEn: "Aramex",
    category: "shipping"
  },
  dhl: {
    logo: "/assets/branding/logo-dhl.png",
    colors: { primary: "#FFCC00", secondary: "#D2002E" },
    nameAr: "دي اتش ال",
    nameEn: "DHL",
    category: "shipping"
  },
  fedex: {
    logo: "/assets/branding/logo-fedex.png",
    colors: { primary: "#4D148C", secondary: "#FF6200" },
    nameAr: "فيديكس",
    nameEn: "FedEx",
    category: "shipping"
  },
  ups: {
    logo: "/assets/branding/logo-ups.png",
    colors: { primary: "#351C15", secondary: "#FFB500" },
    nameAr: "يو بي اس",
    nameEn: "UPS",
    category: "shipping"
  },
  smsa: {
    logo: "/assets/branding/logo-smsa.png",
    colors: { primary: "#004B87", secondary: "#E31E24" },
    nameAr: "سمسا",
    nameEn: "SMSA",
    category: "shipping"
  },
  naqel: {
    logo: "/assets/branding/logo-naqel.png",
    colors: { primary: "#00A9E0", secondary: "#003B71" },
    nameAr: "ناقل",
    nameEn: "Naqel",
    category: "shipping"
  },
  zajil: {
    logo: "/assets/branding/logo-zajil.png",
    colors: { primary: "#1A3B77", secondary: "#E31837" },
    nameAr: "زاجل",
    nameEn: "Zajil",
    category: "shipping"
  },
  saudipost: {
    logo: "/assets/branding/logo-spl.png",
    colors: { primary: "#006847", secondary: "#004D34" },
    nameAr: "سبل (البريد السعودي)",
    nameEn: "Saudi Post",
    category: "shipping"
  },
  emiratespost: {
    logo: "/assets/branding/logo-epost.png",
    colors: { primary: "#00732F", secondary: "#CE1126" },
    nameAr: "بريد الإمارات",
    nameEn: "Emirates Post",
    category: "shipping"
  }
};

export const getServiceBranding = (serviceName: string) => {
  const key = serviceName.toLowerCase();
  return serviceLogos[key] || {
    logo: "",
    colors: { primary: "#0A1628", secondary: "#1E3A5F" },
    nameAr: "بوابة دفع آمنة",
    nameEn: "Secure Gateway",
    category: "government"
  };
};
