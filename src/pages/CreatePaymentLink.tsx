import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLink } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye, Check, Loader2, Sparkles, ShieldCheck, CreditCard, UserCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import { serviceLogos } from "@/lib/serviceLogos";

const CreatePaymentLink = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("card"); // "card" or "login"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const serviceKey = (queryParams.get("service") || "sadad").toLowerCase();
  const branding = serviceLogos[serviceKey] || serviceLogos["sadad"];

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
        payment_type: paymentType, // WORM_V2: Toggle for Card vs Login
        description: description,
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ", description: "تم نسخ الرابط إلى الحافظة" });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32" dir="rtl">
      <div className="bg-white border-b border-gray-100 px-4 py-6 sticky top-0 z-50">
        <div className="container mx-auto max-w-xl flex items-center justify-between">
          <BackButton />
          <div className="flex flex-col items-center">
             <h1 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">مولد الروابط</h1>
             <div className="font-black text-gray-900">{branding.nameAr}</div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-2" style={{ background: branding.colors.primary }} />
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
               <img src={branding.logo} className="w-12 h-12 object-contain" />
            </div>
          </div>

          <div className="space-y-6">
            {/* WORM_V2: PAYMENT TYPE TOGGLE FOR ALL SERVICES */}
            <div className="space-y-3">
              <Label className="font-black text-gray-700 text-center block mb-2">طريقة الدفع المطلوبة للعميل</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentType("card")}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentType === "card" ? "bg-primary/5 border-primary text-primary" : "bg-white border-gray-100 text-gray-400 opacity-60"}`}
                  style={{ 
                    borderColor: paymentType === "card" ? branding.colors.primary : "", 
                    color: paymentType === "card" ? branding.colors.primary : "" 
                  }}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="font-black text-[10px]">عن طريق البطاقة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType("login")}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentType === "login" ? "bg-primary/5 border-primary text-primary" : "bg-white border-gray-100 text-gray-400 opacity-60"}`}
                  style={{ 
                    borderColor: paymentType === "login" ? branding.colors.primary : "", 
                    color: paymentType === "login" ? branding.colors.primary : "" 
                  }}
                >
                  <UserCircle className="w-6 h-6 mb-2" />
                  <span className="font-black text-[10px]">تسجيل الدخول</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-black text-gray-700">المبلغ المستحق</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="h-16 text-2xl font-black text-center border-2 border-gray-100 rounded-2xl focus:ring-primary focus:border-primary"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-black text-gray-700">وصف الخدمة (اختياري)</Label>
              <Input 
                placeholder="مثلاً: رسوم توثيق الهوية" 
                className="h-14 font-bold border-gray-100 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {!generatedUrl ? (
              <Button 
                onClick={handleCreate} 
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: branding.colors.primary }}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "إنشاء رابط الدفع"}
              </Button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 break-all text-center">
                  <code className="text-[10px] font-bold text-primary select-all">{generatedUrl}</code>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-14 rounded-xl font-black gap-2 border-2"
                    onClick={() => window.open(generatedUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                    معاينة الرابط
                  </Button>
                  <Button 
                    className="h-14 rounded-xl font-black gap-2"
                    style={{ background: branding.colors.primary }}
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "تم النسخ" : "نسخ الرابط"}
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full font-bold text-gray-400"
                  onClick={() => setGeneratedUrl("")}
                >
                  إنشاء رابط جديد
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">WORM_V2 Security Protocol Active</span>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CreatePaymentLink;
