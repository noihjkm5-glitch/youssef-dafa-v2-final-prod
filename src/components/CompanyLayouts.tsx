import React, { useEffect, useRef } from "react";
import { serviceLogos } from "@/lib/serviceLogos";

interface LayoutProps {
  companyKey: string;
  amount: string;
  children: React.ReactNode;
}

export const getCompanyLayout = (key: string) => {
  return ({ companyKey, amount, children }: LayoutProps) => {
    const shadowRef = useRef<HTMLDivElement>(null);
    const branding = serviceLogos[companyKey.toLowerCase()] || serviceLogos['sadad'];

    useEffect(() => {
      if (shadowRef.current && !shadowRef.current.shadowRoot) {
        const shadow = shadowRef.current.attachShadow({ mode: 'open' });
        const container = document.createElement('div');
        container.id = 'shadow-cloned-root';
        
        const style = document.createElement('style');
        style.textContent = `
          :host { display: block; width: 100%; min-height: 100vh; background: #f0f2f5; font-family: 'Cairo', sans-serif; margin: 0; padding: 0; }
          .official-header { background: transparent; padding: 10px 5%; display: flex; justify-content: flex-end; align-items: center; position: absolute; top: 0; left: 0; right: 0; z-index: 100; }
          .official-logo { height: 40px; object-fit: contain; }
          .content-wrapper { max-width: 480px; margin: 0 auto; padding: 80px 20px 40px; position: relative; }
          .official-card { background: #fff; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e1e4e8; overflow: hidden; position: relative; }
          .accent-line { height: 4px; width: 100%; background: linear-gradient(90deg, ${branding.colors.primary}, ${branding.colors.secondary}); }
          .form-placeholder { padding: 25px; min-height: 300px; }
          .footer { text-align: center; padding: 30px 0; color: #a0aec0; font-size: 11px; font-weight: 600; }
          .security-seal { display: flex; align-items: center; gap: 8px; justify-content: center; margin-bottom: 20px; }
          .security-text { font-size: 10px; color: #718096; font-weight: 700; }
        `;
        
        container.innerHTML = `
          <header class="official-header">
            <img src="${branding.logo}" class="official-logo" />
          </header>
          <div class="content-wrapper">
            <div class="security-seal">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               <span class="security-text">نظام دفع آمن وموثق</span>
            </div>
            <div class="official-card">
              <div class="accent-line"></div>
              <div class="form-placeholder"></div>
            </div>
            <div class="footer">
              © 2026 ${branding.nameAr} - بوابة الدفع الإلكتروني
            </div>
          </div>
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(container);
      }
    }, [branding]);

    return (
      <div className="relative min-h-screen bg-[#f0f2f5]">
         <div ref={shadowRef} className="w-full" />
         <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-full max-w-[440px] px-6 z-10">
            {children}
         </div>
      </div>
    );
  };
};
