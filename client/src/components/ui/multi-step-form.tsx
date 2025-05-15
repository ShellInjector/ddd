import React, { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

interface Step {
  id: string;
  title: string;
  content: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
  initialData?: any;
}

const MultiStepForm = ({ steps, onComplete, initialData = {} }: MultiStepFormProps) => {
  const { t } = useTranslation();
  const [_, navigate] = useLocation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isCompleting, setIsCompleting] = useState(false);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      setIsCompleting(true);
      try {
        await onComplete(formData);
        // Redirect to thank you page after successful submission
        navigate("/thank-you");
      } catch (error) {
        console.error("Form submission error:", error);
        setIsCompleting(false);
      }
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => prev - 1);
  };

  const updateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="ml-4 text-sm font-medium text-gray-500">
            {t("quote.step")} {currentStepIndex + 1} {t("quote.of")} {steps.length}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`transition-opacity duration-300 ${
              index === currentStepIndex ? "block" : "hidden"
            }`}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-6">{step.title}</h3>
            {React.cloneElement(step.content as React.ReactElement, {
              formData,
              updateFormData,
            })}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isCompleting}
            >
              {t("quote.buttons.back")}
            </Button>
          )}
          
          {isFirstStep && <div />}
          
          <Button
            type="button"
            variant={isLastStep ? "default" : "default"}
            onClick={handleNext}
            disabled={isCompleting}
            className={isLastStep ? "bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200" : ""}
          >
            {isLastStep ? (
              isCompleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("quote.buttons.processing")}
                </span>
              ) : (
                <span className="flex items-center">
                  <span>{t("quote.buttons.submit")}</span>
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              )
            ) : (
              t("quote.buttons.continue")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
