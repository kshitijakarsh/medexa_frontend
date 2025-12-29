import { PREOP_STATS } from "@/app/[lang]/surgery/lib/constants";

export const PreOpStats = () => {
    return (
        <div className="bg-white rounded-xl shadow-soft mb-4">
            <div className="text-md font-medium pl-5 pt-5 pb-1">
                Pre-Op Checklist
            </div>

            <div className="w-full h-px bg-blue-50"></div>

            <div className="grid grid-cols-4 gap-4 p-5">
                {PREOP_STATS.map((stat, index) => {
                    const percent = (stat.completed / stat.total) * 100;

                    return (
                        <div
                            key={index}
                            className="bg-blue-50 rounded-xl p-4 border border-slate-100"
                        >
                            <div className="text-sm text-slate-500 mb-1">
                                {stat.label}
                            </div>

                            <div className="text-md font-medium text-slate-800">
                                {stat.completed}/{stat.total}
                            </div>

                            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
