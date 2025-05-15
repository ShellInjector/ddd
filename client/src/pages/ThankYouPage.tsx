import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CalendarClock, Phone, Home, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYouPage() {
  const { t } = useTranslation();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
            {t("thankYou.title")}
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            {t("thankYou.message")}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 mb-12"
        >
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarClock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  {t("thankYou.nextSteps.title")}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("thankYou.nextSteps.description")}
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  {t("thankYou.nextSteps.step1")}
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  {t("thankYou.nextSteps.step2")}
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  {t("thankYou.nextSteps.step3")}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  {t("thankYou.contact.title")}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t("thankYou.contact.description")}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700 font-medium">+212 667-960588</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700 font-medium">sarlcoeursous@gmail.com</span>
                </div>
                <div className="flex items-start">
                  <Home className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span className="text-gray-700 font-medium">EL BARAKA AGADIR, Agadir, Morocco</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-center"
        >
          <Link href="/">
            <Button className="group text-white bg-blue-600 hover:bg-blue-700">
              {t("thankYou.returnHome")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}