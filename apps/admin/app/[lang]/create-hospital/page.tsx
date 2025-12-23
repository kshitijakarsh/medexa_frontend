// import { CreateHospitalForm } from "./_components/CreateHospitalForm"
// import { getDictionary } from "@/i18n/get-dictionary"
// import type { Locale } from "@/i18n/locales"

// export default function LocalizedCreateHospitalPage() {
//   return <CreateHospitalForm dict={dict}  />
// }

import { CreateHospitalForm } from "./_components/CreateHospitalForm";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

export default async function LocalizedCreateHospitalPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return <CreateHospitalForm dict={dict} />;
}
