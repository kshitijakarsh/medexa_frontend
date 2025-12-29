import EmergencySurgeries from "../components/dashboard/EmergencySurgeries";
import StatsCards from "../components/dashboard/MetricCards";
import RightSidebar from "../components/dashboard/RightSidebar";
import SurgeryTable from "../components/dashboard/SurgeryTable";

const dashboard = () => {
  return (
    <div className="flex w-full min-h-screen gap-3">
      <div className="flex-1 min-w-0">
        <StatsCards />
        <EmergencySurgeries />
        <SurgeryTable />
      </div>

      <div className="shrink-0 hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
};

export default dashboard;
