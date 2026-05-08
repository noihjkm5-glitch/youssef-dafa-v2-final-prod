import React from 'react';
import PaymentPageWrapper from "@/components/PaymentPageWrapper";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Calendar, User, CreditCard, Activity } from 'lucide-react';

const HealthPayment = () => {
  return (
    <PaymentPageWrapper
      serviceKey="jaywan"
      serviceName="الخدمات الصحية"
      amount="200 ر.س"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <Heart className="w-16 h-16 mx-auto text-[#CE1126] mb-4" />
          <h1 className="text-3xl font-bold text-[#CE1126] mb-2">
            حجز موعد طبي
          </h1>
          <p className="text-gray-600">
            احجز موعدك مع أفضل الأطباء والمراكز الصحية
          </p>
        </div>

        <Card className="p-6 space-y-4 shadow-xl">
          <div className="space-y-4">
            <div>
              <Label htmlFor="specialty" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                التخصص الطبي
              </Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="اختر التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">طب عام</SelectItem>
                  <SelectItem value="cardio">أمراض القلب</SelectItem>
                  <SelectItem value="dental">طب الأسنان</SelectItem>
                  <SelectItem value="derma">الأمراض الجلدية</SelectItem>
                  <SelectItem value="ortho">جراحة العظام</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient-name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  اسم المريض
                </Label>
                <Input 
                  id="patient-name" 
                  placeholder="الاسم الكامل"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="national-id">رقم الهوية</Label>
                <Input 
                  id="national-id" 
                  placeholder="1234567890"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  تاريخ الموعد
                </Label>
                <Input 
                  id="appointment-date" 
                  type="date"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="appointment-time">وقت الموعد</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="اختر الوقت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09">09:00 صباحاً</SelectItem>
                    <SelectItem value="10">10:00 صباحاً</SelectItem>
                    <SelectItem value="11">11:00 صباحاً</SelectItem>
                    <SelectItem value="14">02:00 مساءً</SelectItem>
                    <SelectItem value="16">04:00 مساءً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <textarea 
                id="notes" 
                rows={3}
                className="w-full mt-2 p-3 border rounded-lg resize-none"
                placeholder="أضف أي ملاحظات أو أعراض..."
              />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-red-900 font-semibold">رسوم الكشف:</span>
              <span className="text-2xl font-bold text-[#CE1126]">200 ر.س</span>
            </div>
          </div>

          <button 
            className="w-full h-14 bg-[#CE1126] hover:bg-[#A30D1E] text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-6 transition-all shadow-lg"
          >
            <CreditCard className="w-5 h-5" />
            تأكيد الحجز والدفع
          </button>
        </Card>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[#CE1126]">
            معلومات مهمة
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              يرجى الحضور قبل الموعد بـ 15 دقيقة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              إحضار بطاقة الهوية الوطنية
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              إمكانية إعادة الجدولة مجاناً قبل 24 ساعة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              خدمة استشارة طبية عن بُعد متاحة
            </li>
          </ul>
        </div>
      </div>
    </PaymentPageWrapper>
  );
};

export default HealthPayment;
