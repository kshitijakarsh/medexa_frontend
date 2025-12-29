import React from "react";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-soft mb-3">
      <h3 className="px-6 pt-6 mb-2 text-base font-medium">
        {title}
      </h3>

      <div className="h-px w-full bg-blue-50 mb-6" />

      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );
};


