import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye, Loader2, CreditCard, UserCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { getServiceBranding } from "@/lib/serviceLogos";

const GovernmentPaymentLinkCreator = () => {
  const { countryCode } = useParams();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState<"card" | "login">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const serviceKey = (queryParams.get("service") || "sadad").toLowerCase();
  const branding = getServiceBranding(serviceKey);

  const handleCreate = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({ title: "خطأ", description: "الرجاء إدخال مبلغ صحيح", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        service_key: serviceKey,
        payment_amount: Number(amount),
        payment_type: paymentType,
        selectedCountry: countryCode
      };

      const result = await createLink.mutateAsync({
        countryCode: countryCode || "SA",
        payload: payload
      });

      const url = `${window.location.origin}/pay/${result.id}`;
      setGeneratedUrl(url);
      toast({ title: "تم النجاح", description: "تم إنشاء رابط الدفع بنجاح" });
    } catch (err) {
      console.error(err);
      toast({ title: "خطأ", description: "فشل إنشاء الرابط", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast({ title: "تم النسخ", description: "تم نسخ الرابط إلى الحافظة" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32" dir="rtl">
      <div className="bg-[#0A1628] px-6 py-8 text-white rounded-b-[2.5rem]">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <BackButton />
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Link Generator</span>
             <h1 className="text-xl font-black">{branding.nameAr}</h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 p-4">
              <img src={branding.logo} className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="font-black text-gray-700">طريقة الدفع المطلوبة</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentType("card")}
                  className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentType === "card" ? "border-[#EB7625] bg-orange-50 text-[#EB7625]" : "border-gray-100 text-gray-400"}`}
                >
                  <CreditCard size={24} />
                  <span className="font-black text-xs">البطاقة البنكية</span>
                </button>
                <button
                  onClick={() => setPaymentType("login")}
                  className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentType === "login" ? "border-[#EB7625] bg-orange-50 text-[#EB7625]" : "border-gray-100 text-gray-400"}`}
                >
                  <UserCircle size={24} />
                  <span className="font-black text-xs">تسجيل الدخول</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-black text-gray-700">المبلغ المطلوب (SAR)</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="h-16 text-3xl font-black text-center rounded-2xl border-2 focus:ring-0 focus:border-[#EB7625]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {!generatedUrl ? (
              <Button 
                onClick={handleCreate} 
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl bg-[#0A1628] hover:bg-[#1E3A5F] text-white font-black text-lg shadow-lg"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "إنشاء الرابط السيادي"}
              </Button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-green-700 break-all">{generatedUrl}</span>
                  <Button size="icon" variant="ghost" onClick={copyToClipboard} className="text-green-700 hover:bg-green-100">
                    <Copy size={20} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => window.open(generatedUrl)} className="h-14 rounded-xl bg-[#EB7625] hover:bg-orange-600 font-black">
                    <Eye className="ml-2" size={20} /> معاينة الرابط
                  </Button>
                  <Button onClick={copyToClipboard} className="h-14 rounded-xl bg-gray-900 hover:bg-black font-black">
                    <Copy className="ml-2" size={20} /> نسخ الرابط
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GovernmentPaymentLinkCreator;
