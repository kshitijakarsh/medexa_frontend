import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  children,
}) => {
  return (
    <Card className="shadow-none border-0 mb-3">
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <Separator className="bg-blue-50" />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
