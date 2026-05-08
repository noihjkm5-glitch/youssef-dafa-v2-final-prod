import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentPageWrapper from "@/components/PaymentPageWrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, CreditCard, Building2, User, Phone, Hash, ArrowLeft, Calendar } from "lucide-react";

const ContractPaymentPage = () => {
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [contractType, setContractType] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const serviceKey = "contracts";

  const contractTypes = [
    { id: "rental", nameAr: "عقد إيجار", nameEn: "Rental Contract" },
    { id: "employment", nameAr: "عقد عمل", nameEn: "Employment Contract" },
    { id: "service", nameAr: "عقد خدمات", nameEn: "Service Contract" },
    { id: "partnership", nameAr: "عقد شراكة", nameEn: "Partnership Contract" },
    { id: "purchase", nameAr: "عقد بيع", nameEn: "Purchase Contract" },
    { id: "maintenance", nameAr: "عقد صيانة", nameEn: "Maintenance Contract" },
    { id: "consulting", nameAr: "عقد استشاري", nameEn: "Consulting Contract" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
  };

  return (
    <PaymentPageWrapper
      serviceKey="jaywan"
      serviceName="دفع العقود"
      amount={amount ? `${amount} ريال` : ""}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 shadow-2xl border-t-4 border-[#CE1126] rounded-2xl relative overflow-hidden bg-white">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-1 text-[#CE1126]">
                  دفع العقود الرسمية
                </h1>
                <p className="text-sm text-gray-500">سداد مستحقات العقود بأمان</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#CE1126] flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  نوع العقد *
                </Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue placeholder="اختر نوع العقد" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((contract) => (
                      <SelectItem key={contract.id} value={contract.id}>
                        {contract.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  رقم العقد *
                </Label>
                <Input
                  value={contractNumber}
                  onChange={(e) => setContractNumber(e.target.value)}
                  placeholder="أدخل رقم العقد"
                  className="h-12 border-2"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  الاسم الكامل *
                </Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="h-12 border-2"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم الجوال *
                </Label>
                <Input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="h-12 border-2"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  تاريخ الاستحقاق *
                </Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-12 border-2"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  المبلغ المستحق *
                </Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="h-12 border-2"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 text-sm font-bold">ملاحظات (اختياري)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أضف أي ملاحظات إضافية"
                  className="min-h-[80px] border-2"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl mb-6 bg-red-50 border border-red-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>نوع العقد</span>
                  <span className="font-semibold text-gray-900">
                    {contractType ? contractTypes.find(c => c.id === contractType)?.nameAr : '---'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>رقم العقد</span>
                  <span className="font-semibold text-gray-900">{contractNumber || '---'}</span>
                </div>
                <div className="h-px bg-red-200 my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-bold">المبلغ الإجمالي</span>
                  <span className="text-2xl font-bold text-[#CE1126]">
                    {amount ? `${amount} ريال` : '---'}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg py-7 bg-[#CE1126] hover:bg-[#A30D1E] text-white font-bold shadow-2xl"
            >
              <span className="ml-2">التالي - إتمام السداد</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 جميع المعاملات مشفرة وآمنة ومطابقة للأنظمة
            </p>
          </form>
        </Card>
      </div>
    </PaymentPageWrapper>
  );
};

export default ContractPaymentPage;
