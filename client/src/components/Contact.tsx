import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setFormSuccess(true);
      toast({
        title: t("contact.form.success"),
        duration: 5000,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            {t("contact.subtitle")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("contact.title")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Nos coordonnées
                </h3>
                <div className="mt-5">
                  <div className="flex items-center mt-2">
                    <Phone className="h-6 w-6 text-secondary-500" />
                    <span className="ml-3 text-gray-500">
                      +212 667-960588
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <FaWhatsapp className="h-6 w-6 text-green-500" />
                    <a 
                      href="https://wa.me/212667960588" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ml-3 text-gray-500 hover:text-green-500 transition-colors"
                    >
                      +212 667-960588 (WhatsApp)
                    </a>
                  </div>
                  <div className="flex items-center mt-4">
                    <Mail className="h-6 w-6 text-[#DB4437]" />
                    <a 
                      href="mailto:sarlcoeursous@gmail.com" 
                      className="ml-3 text-[#DB4437] font-medium hover:underline"
                    >
                      sarlcoeursous@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center mt-4">
                    <MapPin className="h-6 w-6 text-secondary-500" />
                    <span className="ml-3 text-gray-500">
                      {t("contact.info.address")}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 text-green-600 mr-1" />
                      {t("contact.info.hours.title")}
                    </h4>
                    <p className="mt-2 text-sm text-green-600 font-medium">
                      {t("contact.info.hours.weekdays")}<br />
                      {t("contact.info.hours.saturday")}<br />
                      {t("contact.info.hours.sunday")}
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700">
                      {t("contact.info.social")}
                    </h4>
                    <div className="flex space-x-5 mt-2">
                      <a href="https://www.facebook.com/CoeurSous" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-6 w-6" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {t("contact.form.title")}
                </h3>
                {formSuccess ? (
                  <div className="mt-8 text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">
                      {t("contact.form.success")}
                    </h3>
                  </div>
                ) : (
                  <div className="mt-5">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                      >
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.firstName")}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.lastName")}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.email")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.form.phone")}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t("contact.form.subject")}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>{t("contact.form.message")}</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={4}
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="sm:col-span-2">
                          <a 
                            href="/devis" 
                            className="block w-full px-5 py-3 text-center font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg"
                          >
                            Demander un devis
                          </a>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
