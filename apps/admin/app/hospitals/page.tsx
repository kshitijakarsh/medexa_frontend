import { Header } from "@/components/header"
import HospitalsTable from "./_components/table"

const HospitalsPage = () => {
  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Hospitals Management</h1>
        <HospitalsTable />
      </div>
    </main>
  )
}

export default HospitalsPage
