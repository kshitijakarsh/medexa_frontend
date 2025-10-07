"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { EllipsisVertical, SearchIcon } from "lucide-react"
import { Dictionary as DictionaryType } from "@/i18n/get-dictionary"

const items = [
  {
    id: "ME12000",
    hospitalName: "Hamad General Hospital",
    email: "admin@hamad.qa",
    phone: "+974 4439 2222",
    modules: "12",
    subscriptionPlan: "Monthly",
    billingStatus: "Active",
    lastLogin: "2025-09-27 19:30",
  },
  {
    id: "ME12001",
    hospitalName: "Al Wakra Hospital",
    email: "admin@alwakra.qa",
    phone: "+974 4011 3333",
    modules: "10",
    subscriptionPlan: "Annual",
    billingStatus: "Active",
    lastLogin: "2025-09-26 14:20",
  },
  {
    id: "ME12002",
    hospitalName: "Al Khor Hospital",
    email: "admin@alkhor.qa",
    phone: "+974 4472 4444",
    modules: "8",
    subscriptionPlan: "Monthly",
    billingStatus: "Pending",
    lastLogin: "2025-09-25 09:15",
  },
  {
    id: "ME12003",
    hospitalName: "Women's Wellness and Research Center",
    email: "admin@wwrc.qa",
    phone: "+974 4409 5555",
    modules: "15",
    subscriptionPlan: "Annual",
    billingStatus: "Active",
    lastLogin: "2025-09-27 16:45",
  },
  {
    id: "ME12004",
    hospitalName: "National Center for Eye Care",
    email: "admin@ncec.qa",
    phone: "+974 4011 6666",
    modules: "20",
    subscriptionPlan: "Annual",
    billingStatus: "Active",
    lastLogin: "2025-09-27 11:30",
  },
  {
    id: "ME12005",
    hospitalName: "Isha Hospital",
    email: "admin@isha.qa",
    phone: "+974 4011 7777",
    modules: "14",
    subscriptionPlan: "Monthly",
    billingStatus: "Active",
    lastLogin: "2025-09-26 20:10",
  },
  {
    id: "ME12006",
    hospitalName: "Rumailah Hospital",
    email: "admin@rumailah.qa",
    phone: "+974 4011 8888",
    modules: "18",
    subscriptionPlan: "Annual",
    billingStatus: "Active",
    lastLogin: "2025-09-27 13:25",
  },
]

export default function HospitalsTable({ dict }: { dict: DictionaryType }) {
  const t = dict.pages.hospitals.table

  return (
    <div className="space-y-4 border rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{t.activeHospitals}</h2>
        <div className="flex items-center gap-4">
          <FilterInput placeholder={t.searchPlaceholder} />
          <Button>{t.onboardNew}</Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-background [&_tr]:border-none">
          <TableRow className="hover:bg-transparent">
            <TableHead>{t.id}</TableHead>
            <TableHead>{t.hospitalName}</TableHead>
            <TableHead>{t.email}</TableHead>
            <TableHead>{t.phone}</TableHead>
            <TableHead>{t.modules}</TableHead>
            <TableHead>{t.subscriptionPlan}</TableHead>
            <TableHead>{t.billingStatus}</TableHead>
            <TableHead>{t.lastLogin}</TableHead>
            <TableHead className="text-right">{t.action}</TableHead>
          </TableRow>
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
            >
              <TableCell className="py-2.5 font-medium">{item.id}</TableCell>
              <TableCell className="py-2.5">{item.hospitalName}</TableCell>
              <TableCell className="py-2.5">{item.email}</TableCell>
              <TableCell className="py-2.5">{item.phone}</TableCell>
              <TableCell className="py-2.5">{item.modules}</TableCell>
              <TableCell className="py-2.5">{item.subscriptionPlan}</TableCell>
              <TableCell className="py-2.5">{item.billingStatus}</TableCell>
              <TableCell className="py-2.5">{item.lastLogin}</TableCell>
              <TableCell className="py-2.5 text-right">
                <Button size="icon-sm" variant="ghost">
                  <EllipsisVertical />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={8}>Total Hospitals</TableCell>
            <TableCell className="text-right">{items.length}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )
}

const FilterInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id="hospital-name-input"
          className="peer ps-10"
          value={""}
          onChange={(e) => {}}
          placeholder={placeholder}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  )
}
