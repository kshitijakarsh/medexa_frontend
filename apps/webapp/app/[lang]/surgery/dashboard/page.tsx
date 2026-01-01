import EmergencySurgeries from "./_components/EmergencySurgeries";
import StatsCards from "./_components/MetricCards";
import RightSidebar from "./_components/RightSidebar";
import SurgeryTable from "./_components/SurgeryTable";

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
