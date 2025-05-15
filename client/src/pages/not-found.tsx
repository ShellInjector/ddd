import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{t('notFound.title')}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {t('notFound.message')}
          </p>
          
          <div className="mt-6 flex justify-center">
            <Link href="/">
              <Button variant="default">
                {t('nav.about')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
