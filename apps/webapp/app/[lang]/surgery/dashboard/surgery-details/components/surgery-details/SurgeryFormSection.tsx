import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const SurgeryFormSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-base font-bold text-slate-800 mb-5">Schedule Surgery</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Procedure</label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Procedure Name</option>
              <option>Appendectomy</option>
              <option>Cataract Surgery</option>
              <option>Knee Replacement</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Procedure Category</option>
              <option>General Surgery</option>
              <option>Ophthalmology</option>
              <option>Orthopedics</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Urgency</label>
            <input
              type="text"
              placeholder="Enter Urgency"
              className="w-full bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimated Duration (hours)</label>
            <input
              type="text"
              placeholder="Select Estimated Duration"
              className="w-full bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Surgery Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date"
                className="w-full bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
              />
              <CalendarIcon size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Surgery Time</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Time"
                className="w-full bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
              />
              <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">OT Room</label>
            <input
              type="text"
              placeholder="Select OT Room"
              className="w-full bg-white border border-slate-200 text-slate-700 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeryFormSection;