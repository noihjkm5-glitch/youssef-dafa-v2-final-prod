import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to services by default for WORM_V2
    navigate("/services");
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
       <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center">
             <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div className="flex flex-col items-center">
             <h1 className="text-xl font-black text-gray-900 tracking-tight">بوابة الدفع الموحدة</h1>
             <p className="text-sm font-bold text-gray-400">جاري تحميل الخدمات السيادية...</p>
          </div>
       </div>
    </div>
  );
};

export default Index;
