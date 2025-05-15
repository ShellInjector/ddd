import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import MultiStepForm from "@/components/ui/multi-step-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import { insertQuoteRequestSchema } from "@shared/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

// Extend the insertQuoteRequestSchema for our form validation
const formSchema = insertQuoteRequestSchema.extend({
  // Add additional validations
  firstName: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
  email: z.string().email("L'adresse email est invalide"),
  phone: z.string().min(8, "Le numéro de téléphone est invalide"),
  moveDate: z.string().min(1, "La date de déménagement est requise"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
});

const furnitureItems = [
  "sofas",
  "beds",
  "tables",
  "wardrobes",
  "appliances",
  "boxes",
];

const specialItems = ["piano", "art", "safe", "fragile"];

const additionalServices = [
  "packing",
  "unpacking",
  "storage",
  "furnitureAssembly",
  "cleaning",
];

const QuoteForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formSuccess, setFormSuccess] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      moveType: "residential",
      moveDate: "",
      originAddress: "",
      originCity: "",
      destinationAddress: "",
      destinationCity: "",
      homeSize: "studio",
      inventory: JSON.stringify({}),
      additionalNotes: "",
      additionalServices: JSON.stringify([]),
      referralSource: "internet",
      terms: false,
    },
  });

  const quoteRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      // Prepare inventory data
      const inventoryData = {
        furniture: Object.fromEntries(
          furnitureItems.map((item) => [item, data[`furniture-${item}`] || "0"])
        ),
        specialItems: specialItems
          .filter((item) => data[`special-item-${item}`])
          .map((item) => item),
      };

      // Prepare additional services
      const servicesData = additionalServices
        .filter((service) => data[`service-${service}`])
        .map((service) => service);

      // Format the request
      const requestData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        moveType: data.moveType,
        moveDate: data.moveDate,
        originAddress: data.originAddress,
        originCity: data.originCity,
        destinationAddress: data.destinationAddress,
        destinationCity: data.destinationCity,
        homeSize: data.homeSize,
        inventory: JSON.stringify(inventoryData),
        additionalNotes: data.additionalNotes || "",
        additionalServices: JSON.stringify(servicesData),
        referralSource: data.referralSource,
      };

      return apiRequest("POST", "/api/quote-requests", requestData);
    },
    onSuccess: () => {
      setFormSuccess(true);
      toast({
        title: t("quote.success"),
        duration: 5000,
      });
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/quote-requests"] });
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
    quoteRequestMutation.mutate(data);
  };

  // Reset success state after 5 seconds
  if (formSuccess) {
    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  }

  // Content for step 1: Personal Information
  const PersonalInfoStep = ({ formData, updateFormData }: any) => {
    return (
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.personal.firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.personal.lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.personal.email")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.personal.phone")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  // Content for step 2: Move Details
  const MoveDetailsStep = ({ formData, updateFormData }: any) => {
    return (
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="moveType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.move.moveType")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("quote.steps.move.moveType")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="residential">
                      {t("quote.steps.move.types.residential")}
                    </SelectItem>
                    <SelectItem value="commercial">
                      {t("quote.steps.move.types.commercial")}
                    </SelectItem>
                    <SelectItem value="international">
                      {t("quote.steps.move.types.international")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="moveDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("quote.steps.move.moveDate")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>{t("quote.steps.move.moveDate")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="originAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.move.originAddress")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="originCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.move.originCity")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="destinationAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.move.destinationAddress")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            control={methods.control}
            name="destinationCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.move.destinationCity")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  // Content for step 3: Inventory
  const InventoryStep = ({ formData, updateFormData }: any) => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t("quote.steps.inventory.homeSize")}
          </h4>
          <FormField
            control={methods.control}
            name="homeSize"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="studio" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.studio")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1bedroom" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.1bedroom")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2bedroom" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.2bedroom")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3bedroom" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.3bedroom")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4bedroom" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.4bedroom")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="office" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t("quote.steps.inventory.sizes.office")}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t("quote.steps.inventory.mainFurniture")}
          </h4>
          <div className="mt-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {furnitureItems.map((item) => (
                <div key={item} className="flex items-center">
                  <FormField
                    control={methods.control}
                    name={`furniture-${item}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0 flex-1">
                        <FormLabel className="w-full">
                          {t(`quote.steps.inventory.furniture.${item}`)}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || "0"}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {item === "boxes" ? (
                                <>
                                  <SelectItem value="5-">
                                    {t("quote.steps.inventory.count.5-")}
                                  </SelectItem>
                                  <SelectItem value="10-">
                                    {t("quote.steps.inventory.count.10-")}
                                  </SelectItem>
                                  <SelectItem value="20-">
                                    {t("quote.steps.inventory.count.20-")}
                                  </SelectItem>
                                  <SelectItem value="20+">
                                    {t("quote.steps.inventory.count.20+")}
                                  </SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="0">
                                    {t("quote.steps.inventory.count.0")}
                                  </SelectItem>
                                  <SelectItem value="1">
                                    {t("quote.steps.inventory.count.1")}
                                  </SelectItem>
                                  <SelectItem value="2">
                                    {t("quote.steps.inventory.count.2")}
                                  </SelectItem>
                                  <SelectItem value="3">
                                    {t("quote.steps.inventory.count.3")}
                                  </SelectItem>
                                  <SelectItem value="4+">
                                    {t("quote.steps.inventory.count.4+")}
                                  </SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t("quote.steps.inventory.specialItems")}
          </h4>
          <div className="mt-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {specialItems.map((item) => (
                <FormField
                  key={item}
                  control={methods.control}
                  name={`special-item-${item}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t(`quote.steps.inventory.items.${item}`)}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <FormField
            control={methods.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("quote.steps.inventory.notes")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("quote.steps.inventory.notesHelp")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  // Content for step 4: Additional Services
  const ServicesStep = ({ formData, updateFormData }: any) => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {additionalServices.map((service) => (
            <FormField
              key={service}
              control={methods.control}
              name={`service-${service}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t(`quote.steps.services.additionalServices.${service}`)}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <FormField
            control={methods.control}
            name="referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.steps.services.referral")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("quote.steps.services.referral")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="internet">
                      {t("quote.steps.services.referralSources.internet")}
                    </SelectItem>
                    <SelectItem value="friend">
                      {t("quote.steps.services.referralSources.friend")}
                    </SelectItem>
                    <SelectItem value="social">
                      {t("quote.steps.services.referralSources.social")}
                    </SelectItem>
                    <SelectItem value="advertisement">
                      {t("quote.steps.services.referralSources.advertisement")}
                    </SelectItem>
                    <SelectItem value="other">
                      {t("quote.steps.services.referralSources.other")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={methods.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t("quote.steps.services.terms")}
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    {t("quote.steps.services.termsDescription")}
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  const steps = [
    {
      id: "personal",
      title: t("quote.steps.personal.title"),
      content: <PersonalInfoStep />,
    },
    {
      id: "move",
      title: t("quote.steps.move.title"),
      content: <MoveDetailsStep />,
    },
    {
      id: "inventory",
      title: t("quote.steps.inventory.title"),
      content: <InventoryStep />,
    },
    {
      id: "services",
      title: t("quote.steps.services.title"),
      content: <ServicesStep />,
    },
  ];

  return (
    <section id="devis" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            {t("quote.subtitle")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("quote.title")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("quote.description")}
          </p>
        </div>

        <div className="mt-10">
          <Card>
            <CardContent className="p-6 md:p-8">
              {formSuccess ? (
                <div className="text-center py-12">
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
                    {t("quote.success")}
                  </h3>
                </div>
              ) : (
                <Form {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                      <MultiStepForm
                        steps={steps}
                        onComplete={methods.handleSubmit(onSubmit)}
                      />
                    </FormProvider>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
