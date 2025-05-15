import { useTranslation } from "react-i18next";
import QuoteForm from "@/components/QuoteForm";
import { useEffect } from "react";

export default function QuotePage() {
  const { t } = useTranslation();
  
  // Lorsque la page est chargée, nous voulons nous assurer qu'il n'y a pas de scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-10">
        <main>
          <QuoteForm />
        </main>
      </div>
    </div>
  );
}