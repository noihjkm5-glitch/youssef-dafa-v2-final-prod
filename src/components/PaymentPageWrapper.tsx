import React, { useEffect } from 'react';
import { applyDynamicIdentity, getEntityIdentity } from '@/lib/dynamicIdentity';
import { getServiceBranding } from '@/lib/serviceLogos';
import PaymentMetaTags from '@/components/PaymentMetaTags';
import BrandedTopBar from '@/components/BrandedTopBar';
import BrandedCarousel from '@/components/BrandedCarousel';
import { SADADOfficialClone, KNETOfficialClone, FedExOfficialClone, JaywanOfficialClone } from './OfficialClones';

interface PaymentPageWrapperProps {
  children: React.ReactNode;
  serviceKey?: string;
  serviceName?: string;
  showTopBar?: boolean;
  showCarousel?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  title?: string;
  description?: string;
  amount?: string;
  trackingNumber?: string;
}

export const PaymentPageWrapper: React.FC<PaymentPageWrapperProps> = ({
  children,
  serviceKey = 'aramex',
  serviceName,
  showTopBar = true,
  showCarousel = true,
  showBackButton = true,
  backPath,
  title,
  description,
  amount,
  trackingNumber
}) => {
  useEffect(() => {
    if (serviceKey) {
      applyDynamicIdentity(serviceKey);
    }
    
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-entity');
    };
  }, [serviceKey]);

  const identity = getEntityIdentity(serviceKey);
  const branding = getServiceBranding(serviceKey);

  // Return official 1:1 clone if applicable
  const key = serviceKey.toLowerCase();
  if (key === 'sadad') {
    return (
      <SADADOfficialClone amount={amount} serviceName={serviceName}>
        {children}
      </SADADOfficialClone>
    );
  }

  if (key === 'knet') {
    return (
      <KNETOfficialClone amount={amount}>
        {children}
      </KNETOfficialClone>
    );
  }

  if (key === 'fedex') {
    return (
      <FedExOfficialClone amount={amount} trackingNumber={trackingNumber}>
        {children}
      </FedExOfficialClone>
    );
  }

  if (key === 'jaywan' || key === 'government_payment') {
    return (
      <JaywanOfficialClone amount={amount} serviceName={serviceName}>
        {children}
      </JaywanOfficialClone>
    );
  }

  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName || serviceKey}
        title={title}
        customDescription={description}
        amount={amount}
      />

      {showTopBar && (
        <BrandedTopBar 
          serviceKey={serviceKey}
          serviceName={serviceName || serviceKey}
          showBackButton={showBackButton}
          backPath={backPath}
          showCarousel={false}
        />
      )}
      
      {showCarousel && (
        <BrandedCarousel serviceKey={serviceKey} className="mb-0" />
      )}

      <div 
        className="min-h-screen"
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}08, ${branding.colors.secondary}08)`,
          fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PaymentPageWrapper;
