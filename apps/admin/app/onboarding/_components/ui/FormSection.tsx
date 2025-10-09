// components/onboard-hospital/ui/FormSection.tsx
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <section className="bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
      <h3 className="text-md font-medium text-slate-700 mb-4">{title}</h3>
      {children}
    </section>
  );
};
