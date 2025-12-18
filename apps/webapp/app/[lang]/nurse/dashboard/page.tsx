// import TodayOverviewCard from "./_components/TodayOverviewCard";
// import PatientTypesCard from "./_components/PatientTypesCard";
// import WorkloadStatsCard from "./_components/WorkloadStatsCard";
// import AlertsCard from "./_components/AlertsCard";
// import EmergencyPatients from "./_components/EmergencyPatients";
// import AppointmentTable from "./_components/AppointmentTable";
// import VipPatientsCard from "./_components/VipPatientsCard";
// import FollowUpPatientsCard from "./_components/FollowUpPatientsCard";

// export default function DoctorDashboard() {
//   return (
//     <div className="p-6 space-y-6">
      
//       {/* TOP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <TodayOverviewCard />
//         <PatientTypesCard />
//         <WorkloadStatsCard />
//       </div>

//       {/* MIDDLE */}
//       <EmergencyPatients />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <VipPatientsCard />
//         <FollowUpPatientsCard />
//         <AlertsCard />
//       </div>

//       {/* TABLE */}
//       <AppointmentTable />

//     </div>
//   );
// }



// // app/doctor-dashboard/page.tsx
// import TodayOverviewCard from "./_components/TodayOverviewCard";
// import PatientTypesCard from "./_components/PatientTypesCard";
// import WorkloadStatsCard from "./_components/WorkloadStatsCard";
// import AlertsCard from "./_components/AlertsCard";
// import EmergencyPatients from "./_components/EmergencyPatients";
// import VipPatientsCard from "./_components/VipPatientsCard";
// import FollowUpPatientsCard from "./_components/FollowUpPatientsCard";
// import AppointmentTable from "./_components/AppointmentTable";

// // export default function DoctorDashboardPage() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#F6FBFF] to-[#E9FBFF] p-6">
// //       <div className="max-w-[1220px] mx-auto space-y-6">

// //         {/* top row of three cards + right sidebar */}
// //         <div className="grid grid-cols-12 gap-6 items-start">
// //           <div className="col-span-9 grid grid-cols-3 gap-6">
// //             <TodayOverviewCard />
// //             <PatientTypesCard />
// //             <WorkloadStatsCard />
// //           </div>

// //           <div className="col-span-3 space-y-4">
// //             <AlertsCard />
// //             <VipPatientsCard />
// //             <FollowUpPatientsCard />
// //           </div>
// //         </div>

// //         {/* emergency */}
// //         <EmergencyPatients />

// //         {/* table */}
// //         <AppointmentTable />

// //       </div>
// //     </div>
// //   );
// // }
// export default function DoctorDashboardPage() {
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-[#F3F9FF] to-[#E3F6FE] p-6 flex justify-center">
//       <div className="w-full space-y-6">

//         {/* FIRST ROW: 3 CARDS + RIGHT SIDEBAR */}
//         <div className="grid grid-cols-12 gap-6 items-start">
          
//           {/* LEFT 3 CARDS */}
//           <div className="col-span-9 grid grid-cols-3 gap-6">
//             <TodayOverviewCard />
//             <PatientTypesCard />
//             <WorkloadStatsCard />
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="col-span-3 space-y-4">
//             <AlertsCard />
//             <VipPatientsCard />
//             <FollowUpPatientsCard />
//           </div>

//         </div>

//         {/* EMERGENCY PATIENTS */}
//         <div className="w-full">
//           <EmergencyPatients />
//         </div>

//         {/* APPOINTMENTS TABLE */}
//         <div className="w-full">
//           <AppointmentTable />
//         </div>

//       </div>
//     </div>
//   );
// }


import TodayOverviewCard from "./_components/TodayOverviewCard";
import PatientTypesCard from "./_components/PatientTypesCard";
import WorkloadStatsCard from "./_components/WorkloadStatsCard";
import AlertsCard from "./_components/AlertsCard";
import EmergencyPatients from "./_components/EmergencyPatients";
import VipPatientsCard from "./_components/VipPatientsCard";
import FollowUpPatientsCard from "./_components/FollowUpPatientsCard";
import AppointmentTable from "./_components/AppointmentTable";
import RecentPatients from "./_components/RecentPatients";
import PriorityTasks from "./_components/PriorityTasks";

export default function NurseDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F3F9FF] to-[#E3F6FE] p-6 flex justify-center">
      {/* Main Grid Container */}
      <div className="w-full max-w-[1600px] grid grid-cols-12 gap-6 items-start">
        
        {/* --- LEFT COLUMN (Main Content) - Spans 9 cols --- */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TodayOverviewCard />
            <PatientTypesCard />
            <WorkloadStatsCard />
          </div>

          {/* Recent Patients Section */}
          <div className="w-full">
            <RecentPatients />
          </div>

          {/* Priority Tasks Section */}
          <div className="w-full">
            <PriorityTasks />
          </div>

          {/* Appointments Table Section */}
          {/* <div className="w-full">
            <AppointmentTable />
          </div> */}
        </div>

        {/* --- RIGHT COLUMN (Sidebar) - Spans 3 cols --- */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <AlertsCard />
          <VipPatientsCard />
          <FollowUpPatientsCard />
        </div>

      </div>
    </div>
  );
}