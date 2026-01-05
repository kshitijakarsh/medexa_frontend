"use client";

import { useParams, useRouter } from "next/navigation";
import { useInsuranceById } from "../../_components/hooks/hooks";
import { InsuranceForm } from "../../_components/InsuranceForm";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useInsuranceById(id);

  if (!data) return null;

  return (
    <InsuranceForm
      mode="edit"
      id={id}
      initialData={data}
    />
  );
}
