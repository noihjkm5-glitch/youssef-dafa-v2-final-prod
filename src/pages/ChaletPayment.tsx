import React from 'react';
import PaymentPageWrapper from "@/components/PaymentPageWrapper";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Users, CreditCard } from 'lucide-react';

const ChaletPayment = () => {
  return (
    <PaymentPageWrapper
      serviceKey="jaywan"
      serviceName="حجز الشاليهات"
      amount="1,500 ر.س"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#CE1126] mb-2">
            احجز شاليه أحلامك
          </h1>
          <p className="text-gray-600">
            استمتع بإقامة مميزة في أفضل الشاليهات
          </p>
        </div>

        <Card className="p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chalet-name" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                اسم الشاليه
              </Label>
              <Input 
                id="chalet-name" 
                placeholder="أدخل اسم الشاليه"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="guests" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                عدد الضيوف
              </Label>
              <Input 
                id="guests" 
                type="number"
                placeholder="4"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="check-in" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاريخ الوصول
              </Label>
              <Input 
                id="check-in" 
                type="date"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="check-out" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاريخ المغادرة
              </Label>
              <Input 
                id="check-out" 
                type="date"
                className="mt-2"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
              <span className="text-2xl font-bold text-[#CE1126]">1,500 ر.س</span>
            </div>

            <button 
              className="w-full h-14 bg-[#CE1126] hover:bg-[#A30D1E] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              إتمام الحجز والدفع
            </button>
          </div>
        </Card>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[#CE1126]">
            مميزات الحجز
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              دفع آمن ومضمون 100%
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              إمكانية الإلغاء المجاني قبل 24 ساعة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              خدمة عملاء على مدار الساعة
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
              تأكيد فوري للحجز
            </li>
          </ul>
        </div>
      </div>
    </PaymentPageWrapper>
  );
};

export default ChaletPayment;
