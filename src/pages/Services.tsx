import { useState, useMemo } from "react";
import { Home, UserCheck, Shield, Smartphone, Key, Building2, CreditCard, Wallet, Landmark, Truck, FileText, Heart, Activity } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { serviceLogos } from "@/lib/serviceLogos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(COUNTRIES.find(c => c.code === 'SA'));

  const governmentServices = useMemo(() => {
    if (!selectedCountry) return [];
    const code = selectedCountry.code;
    const services: any[] = [];

    // Define sovereign services mapping
    const govMap: Record<string, string[]> = {
      SA: ['nafath', 'absher', 'tawakkalna', 'etheq', 'etimad', 'sadad'],
      AE: ['uae-pass', 'edirham', 'jaywan', 'abu-dhabi-pay'],
      KW: ['hawyti', 'sahel', 'knet'],
      QA: ['qdi', 'hukoomi'],
      BH: ['ekey', 'benefit', 'mygov'],
      OM: ['rop-id', 'theqa', 'omannet']
    };

    const keys = govMap[code] || [];
    keys.forEach(key => {
      const branding = serviceLogos[key];
      if (branding) {
        services.push({
          title: branding.nameEn,
          titleAr: branding.nameAr,
          description: `إنشاء رابط دفع ${branding.nameAr}`,
          icon: Shield,
          href: `/create/${code}/payment?service=${key}`,
          gradient: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          logo: branding.logo
        });
      }
    });

    return services;
  }, [selectedCountry]);

  const shippingServices = useMemo(() => {
    if (!selectedCountry) return [];
    const services: any[] = [];
    ['aramex', 'dhl', 'fedex', 'ups', 'smsa', 'naqel', 'zajil', 'saudipost', 'emiratespost'].forEach(key => {
       const branding = serviceLogos[key];
       if (branding) {
          services.push({
            title: branding.nameEn,
            titleAr: branding.nameAr,
            description: `بوابة دفع ${branding.nameAr} الرسمية`,
            icon: Truck,
            href: `/create/${selectedCountry.code}/shipping?service=${key}`,
            gradient: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
            logo: branding.logo
          });
       }
    });
    return services;
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 font-['Cairo']" dir="rtl">
      <SEOHead 
        title="بوابة الدفع الموحدة - الخدمات السيادية" 
        description="توليد روابط الدفع الموثقة للخدمات الحكومية وخدمات الشحن"
      />
      
      <div className="bg-[#0A1628] text-white pt-10 pb-20 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EB7625]/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Shield className="w-6 h-6 text-[#EB7625]" />
              </div>
              <h1 className="text-xl font-black tracking-tight">بوابة الدفع السيادية</h1>
            </div>
            
            <Select
              value={selectedCountry?.code}
              onValueChange={(value) => setSelectedCountry(COUNTRIES.find((c) => c.code === value))}
            >
              <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white rounded-xl h-10 font-bold backdrop-blur-md">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 font-bold">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.nameAr}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black leading-tight">اختر الخدمة المطلوبة</h2>
            <p className="text-white/60 font-bold text-sm">قم بتوليد رابط دفع موثق وآمن بنظام التشفير السيادي</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 -mt-10 relative z-20">
        <div className="space-y-12">
          {/* Government Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-[#0A1628]">الخدمات السيادية والحكومية</h3>
              </div>
              <div className="h-[2px] flex-1 bg-gray-200/50 mx-4 rounded-full"></div>
              <span className="text-[10px] font-black text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">OFFICIAL</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {governmentServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </section>

          {/* Shipping Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EB7625] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-[#0A1628]">خدمات الشحن واللوجستيات</h3>
              </div>
              <div className="h-[2px] flex-1 bg-gray-200/50 mx-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shippingServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Services;
