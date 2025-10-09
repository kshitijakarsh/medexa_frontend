import { Header } from "@/components/header"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeft } from "lucide-react"
import { LocaleLink } from "@/components/locale-link"
import { getDictionary } from "@/i18n/get-dictionary"
import type { Locale } from "@/i18n/locales"

const HospitalPage = async ({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>
}) => {
  const { slug, lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild>
              <LocaleLink href="/hospitals">
                <ArrowLeft className="size-4" />
                {dict.common.back}
              </LocaleLink>
            </Button>
            <h1 className="text-2xl font-bold">
              {dict.pages.hospitals.information.title} {slug}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">{dict.common.edit}</Button>
            <Button variant="destructive">{dict.common.delete}</Button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6">
          {/* Row 1: Hospital Overview (larger) + Hospital Logo (smaller) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {dict.pages.hospitals.information.overview}
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">
                    Hospital Name
                  </span>
                  <span className="text-sm font-medium">
                    Apollo Multispeciality Hospital
                  </span>
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">City</span>
                  <span className="text-sm">Bangalore</span>
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">
                    Full Address
                  </span>
                  <span className="text-sm">
                    No. 123, Banarapratha Road, Bangalore, Karnataka - 560076
                  </span>
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">
                    Contact Email
                  </span>
                  <span className="text-sm">
                    apollo.bangalore@apollohospitals.com
                  </span>
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">
                    Contact Phone
                  </span>
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <span className="text-sm text-muted-foreground">
                    Emergency Contact
                  </span>
                  <span className="text-sm">+91 98765 99999</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {dict.pages.hospitals.information.logo}
              </h2>
              <div className="flex items-center justify-center w-full h-[calc(100%-24px)]">
                <div className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center border">
                  <span className="text-xs text-gray-400">Logo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Business Details + Admin Details + Modules Assigned (equal size) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {dict.pages.hospitals.information.businessDetails}
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    MoPH License Number
                  </span>
                  <span className="text-sm font-medium">MOPH-56789</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Trade License (CR No)
                  </span>
                  <span className="text-sm">CR-2023-4567</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Tax Identification (TIN / VAT)
                  </span>
                  <span className="text-sm">TIN-294ACCA1111K122</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Established On
                  </span>
                  <span className="text-sm">15 March 2010</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {dict.pages.hospitals.information.adminDetails}
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Admin Name
                  </span>
                  <span className="text-sm font-medium">MOPH-56789</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Designation
                  </span>
                  <span className="text-sm">CR-2023-4567</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm">TIN-294ACCA1111K122</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Phone Number
                  </span>
                  <span className="text-sm">15 March 2010</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">City</span>
                  <span className="text-sm">Bangalore</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2">
                  <span className="text-sm text-muted-foreground">
                    Full Address
                  </span>
                  <span className="text-sm">
                    12, NG Road, Bangalore - 560001
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">
                {dict.pages.hospitals.information.modulesAssigned}
              </h2>
              <div className="space-y-2">
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  In-Patient Department (IPD)
                </div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  Out-Patient Department (OPD)
                </div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  Operation Theatre (OT)
                </div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  Pharmacy
                </div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  Laboratory
                </div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
                  Billing & Insurance
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Credentials/Access (full width) */}
          <div className="rounded-lg border w-fit p-6">
            <h2 className="text-lg font-semibold mb-4">
              {dict.pages.hospitals.information.credentials}
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="text-sm text-muted-foreground">
                  Admin Username
                </span>
                <span className="text-sm">apollo_admin</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="text-sm text-muted-foreground">Password</span>
                <span className="text-sm">••••••••••••••••</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="text-sm text-muted-foreground">
                  Last Login
                </span>
                <span className="text-sm">28 Sept 2025 - 10:45 AM</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="text-sm text-muted-foreground">
                  Established On
                </span>
                <span className="text-sm">15 March 2010</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HospitalPage
