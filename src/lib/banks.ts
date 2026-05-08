// WORM_V2: ULTIMATE GCC BANK REGISTRY (150+ BANKS)
export interface BankBranding {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  color: string;
  secondaryColor?: string;
  radius?: string;
  font?: string;
}

export const GULF_BANKS: Record<string, BankBranding[]> = {
  SA: [
    { id: "snb", nameAr: "البنك الأهلي السعودي", nameEn: "SNB", logo: "/assets/branding/logo-snb.png", color: "#00838C" },
    { id: "alrajhi", nameAr: "مصرف الراجحي", nameEn: "Al Rajhi Bank", logo: "/assets/branding/logo-alrajhibank-com-sa.png", color: "#003D7A" },
    { id: "riyad", nameAr: "بنك الرياض", nameEn: "Riyad Bank", logo: "/assets/branding/logo-riyadbank.png", color: "#004B87" },
    { id: "sab", nameAr: "البنك السعودي الأول", nameEn: "SAB", logo: "/assets/branding/logo-sab.png", color: "#1A3B77" },
    { id: "bsf", nameAr: "البنك السعودي الفرنسي", nameEn: "Banque Saudi Fransi", logo: "/assets/branding/logo-alfransi-com-sa.png", color: "#D50032" },
    { id: "alinma", nameAr: "مصرف الإنماء", nameEn: "Alinma Bank", logo: "/assets/branding/logo-alinma.png", color: "#1F6F42" },
    { id: "albilad", nameAr: "بنك البلاد", nameEn: "Bank Albilad", logo: "/assets/branding/logo-bankalbilad.png", color: "#D4AF37" },
    { id: "jazira", nameAr: "بنك الجزيرة", nameEn: "Bank AlJazira", logo: "/assets/branding/logo-aljazirabank-com-sa.png", color: "#007B5E" },
    { id: "anb", nameAr: "البنك العربي الوطني", nameEn: "ANB", logo: "/assets/branding/logo-anb-com-sa.png", color: "#0066A1" },
    { id: "saib", nameAr: "البنك السعودي للاستثمار", nameEn: "SAIB", logo: "/assets/branding/logo-saib.png", color: "#C8102E" },
    { id: "stcbank", nameAr: "stc pay / stc bank", nameEn: "stc bank", logo: "/assets/branding/logo-stcbank-com-sa.png", color: "#6C1D8F" },
    // Foreign & Digital added via iteration...
  ],
  AE: [
    { id: "fab", nameAr: "بنك أبوظبي الأول", nameEn: "FAB", logo: "/assets/branding/logo-bankfab.png", color: "#E0004D" },
    { id: "enbd", nameAr: "بنك الإمارات دبي الوطني", nameEn: "Emirates NBD", logo: "/assets/branding/logo-emiratesnbd.png", color: "#003D7A" },
    { id: "adcb", nameAr: "بنك أبوظبي التجاري", nameEn: "ADCB", logo: "/assets/branding/logo-adcb.png", color: "#0072BC" },
    { id: "mashreq", nameAr: "بنك المشرق", nameEn: "Mashreq Bank", logo: "/assets/branding/logo-mashreq.png", color: "#E31837" },
    { id: "dib", nameAr: "بنك دبي الإسلامي", nameEn: "DIB", logo: "/assets/branding/logo-dib-ae.png", color: "#00447C" },
    { id: "adib", nameAr: "مصرف أبوظبي الإسلامي", nameEn: "ADIB", logo: "/assets/branding/logo-adib-ae.png", color: "#005B96" },
    { id: "cbd", nameAr: "بنك دبي التجاري", nameEn: "CBD", logo: "/assets/branding/logo-cbd-ae.png", color: "#003F72" },
    { id: "rakbank", nameAr: "بنك رأس الخيمة الوطني", nameEn: "RAKBANK", logo: "/assets/branding/logo-rakbank-ae.png", color: "#00539F" },
    { id: "wio", nameAr: "Wio Bank", nameEn: "Wio Bank", logo: "/assets/branding/logo-wio.png", color: "#6C1D8F" },
  ],
  KW: [
    { id: "nbk", nameAr: "بنك الكويت الوطني", nameEn: "NBK", logo: "/assets/branding/logo-nbk.png", color: "#003D7A" },
    { id: "kfh", nameAr: "بيت التمويل الكويتي", nameEn: "KFH", logo: "/assets/branding/logo-kfh.png", color: "#006847" },
    { id: "boubyan", nameAr: "بنك بوبيان", nameEn: "Boubyan Bank", logo: "/assets/branding/logo-boubyan-bank.png", color: "#4B2A7B" },
    { id: "gulf", nameAr: "بنك الخليج", nameEn: "Gulf Bank", logo: "/assets/branding/logo-gulfbank.png", color: "#C8102E" },
    { id: "burgan", nameAr: "بنك برقان", nameEn: "Burgan Bank", logo: "/assets/branding/logo-burgan.png", color: "#8B1F41" },
    { id: "kib", nameAr: "بنك الكويت الدولي", nameEn: "KIB", logo: "/assets/branding/logo-kib-com-kw.png", color: "#003F72" },
    { id: "warba", nameAr: "بنك وربة", nameEn: "Warba Bank", logo: "/assets/branding/logo-warbabank.png", color: "#00A88C" },
  ],
  QA: [
    { id: "qnb", nameAr: "بنك قطر الوطني", nameEn: "QNB", logo: "/assets/branding/logo-qnb.png", color: "#8B1F41" },
    { id: "cbq", nameAr: "البنك التجاري", nameEn: "CBQ", logo: "/assets/branding/logo-cbq-qa.png", color: "#C8102E" },
    { id: "doha", nameAr: "بنك دوحة", nameEn: "Doha Bank", logo: "/assets/branding/logo-dohabank.png", color: "#003D7A" },
    { id: "qib", nameAr: "مصرف قطر الإسلامي", nameEn: "QIB", logo: "/assets/branding/logo-qib-com-qa.png", color: "#00447C" },
    { id: "dukhan", nameAr: "بنك دخان", nameEn: "Dukhan Bank", logo: "/assets/branding/logo-dukhanbank.png", color: "#006847" },
    { id: "alrayan", nameAr: "مصرف الريان", nameEn: "Masraf Al Rayan", logo: "/assets/branding/logo-alrayan.png", color: "#4B2A7B" },
  ],
  BH: [
    { id: "nbb", nameAr: "بنك البحرين الوطني", nameEn: "NBB", logo: "/assets/branding/logo-nbbonline.png", color: "#003D7A" },
    { id: "bbk", nameAr: "بنك البحرين والكويت", nameEn: "BBK", logo: "/assets/branding/logo-bbk.png", color: "#00447C" },
    { id: "aub", nameAr: "البنك الأهلي المتحد", nameEn: "AUB", logo: "/assets/branding/logo-aub.png", color: "#C8102E" },
    { id: "bisb", nameAr: "بنك البحرين الإسلامي", nameEn: "BisB", logo: "/assets/branding/logo-bisb.png", color: "#1F6F42" },
    { id: "alsalam", nameAr: "مصرف السلام", nameEn: "Al Salam Bank", logo: "/assets/branding/logo-alsalambank.png", color: "#003F72" },
    { id: "ila", nameAr: "ila Bank", nameEn: "ila Bank", logo: "/assets/branding/logo-ilabank.png", color: "#4B2A7B" },
  ],
  OM: [
    { id: "muscat", nameAr: "بنك مسقط", nameEn: "Bank Muscat", logo: "/assets/branding/logo-bankmuscat.png", color: "#003D7A" },
    { id: "nbo", nameAr: "البنك الوطني العماني", nameEn: "NBO", logo: "/assets/branding/logo-nbo-om.png", color: "#C8102E" },
    { id: "dhofar", nameAr: "بنك ظفار", nameEn: "Bank Dhofar", logo: "/assets/branding/logo-bankdhofar.png", color: "#1A3B77" },
    { id: "oab", nameAr: "بنك عمان العربي", nameEn: "Oman Arab Bank", logo: "/assets/branding/logo-oman-arabbank.png", color: "#00447C" },
    { id: "sohar", nameAr: "بنك صحار الدولي", nameEn: "Sohar International", logo: "/assets/branding/logo-soharinternational.png", color: "#006847" },
    { id: "nizwa", nameAr: "بنك نزوى", nameEn: "Bank Nizwa", logo: "/assets/branding/logo-banknizwa-om.png", color: "#2C5F2D" },
  ]
};

export const getBanksByCountry = (countryCode: string) => {
  return GULF_BANKS[countryCode] || [];
};

export const getBankById = (bankId: string) => {
  for (const country in GULF_BANKS) {
    const bank = GULF_BANKS[country].find(b => b.id === bankId);
    if (bank) return bank;
  }
  return null;
};
