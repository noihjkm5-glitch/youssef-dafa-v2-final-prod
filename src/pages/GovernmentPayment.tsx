import React from 'react';
import PaymentPageWrapper from "@/components/PaymentPageWrapper";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, FileText, CreditCard, CheckCircle2 } from 'lucide-react';

const GovernmentPayment = () => {
  return (
    <PaymentPageWrapper
      serviceKey="sadad"
      serviceName="بوابة الدفع الحكومي"
      amount="350 ر.س"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 mx-auto text-[#F58220] mb-4" />
          <h1 className="text-3xl font-bold text-[#F58220] mb-2">
            سداد الرسوم الحكومية
          </h1>
          <p className="text-gray-600">
            سداد سريع وآمن للخدمات الحكومية
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="service-type" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                نوع الخدمة
              </Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="اختر الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">تجديد جواز السفر</SelectItem>
                  <SelectItem value="id">بطاقة الهوية الوطنية</SelectItem>
                  <SelectItem value="license">رخصة القيادة</SelectItem>
                  <SelectItem value="visa">تأشيرة زيارة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="national-id">رقم الهوية الوطنية</Label>
              <Input 
                id="national-id" 
                placeholder="1234567890"
                maxLength={10}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="reference-number">الرقم المرجعي</Label>
              <Input 
                id="reference-number" 
                placeholder="REF-2024-XXXXX"
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">معلومات السداد</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>رسوم الخدمة:</span>
                    <span className="font-semibold">300 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم إدارية:</span>
                    <span className="font-semibold">50 ر.س</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-300 pt-1 mt-2">
                    <span className="font-bold">المجموع:</span>
                    <span className="font-bold text-lg">350 ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="w-full h-14 bg-[#F58220] hover:bg-[#E67317] text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-6 transition-all shadow-lg"
          >
            <CreditCard className="w-5 h-5" />
            متابعة إلى الدفع
          </button>
        </Card>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[#F58220]">
            إرشادات الدفع
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#F58220]" />
              جميع المعاملات محمية بأعلى معايير الأمان
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
              تأكيد فوري بعد إتمام الدفع
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F58220]" />
              إمكانية طباعة إيصال الدفع
            </li>
          </ul>
        </div>
      </div>
    </PaymentPageWrapper>
  );
};

export default GovernmentPayment;
