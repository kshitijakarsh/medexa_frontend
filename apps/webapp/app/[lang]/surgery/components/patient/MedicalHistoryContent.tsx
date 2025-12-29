
import React from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { Medication } from '@/types';

const medications: Medication[] = [
  { slNo: 1, name: 'Metformin', dose: '500mg', frequency: 'twice daily', remainingDuration: '10 Days' },
  { slNo: 2, name: 'Metformin', dose: '500mg', frequency: 'twice daily', remainingDuration: '10 Days' },
  { slNo: 3, name: 'Metformin', dose: '500mg', frequency: 'twice daily', remainingDuration: '10 Days' },
];

const MedicalHistoryContent: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Last Edited Info */}
      <div className="flex justify-end">
        <div className="bg-[#f8fafc] border border-gray-100 rounded-2xl px-5 py-3 flex items-center space-x-3 shadow-sm">
          <Info className="w-5 h-5 text-[#2563eb]" />
          <span className="text-sm text-gray-600 font-semibold italic">
            Last Edited by Anesthesia Sarah on November 14, 2024, at 8:45 AM.
          </span>
        </div>
      </div>

      {/* History Sections */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">History of Present Illness</h3>
          <p className="text-gray-900 font-bold text-xl leading-relaxed">
            Patient reports Head pain radiating to left arm for the past 3 hours, associated with sweating and shortness of breath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Past Surgical History</h3>
            <p className="text-gray-900 font-bold text-lg">Appendectomy in 2018</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Diseases History</h3>
            <p className="text-gray-900 font-bold text-lg">Diabetes, Hypertension</p>
          </div>
        </div>
      </div>

      {/* Medications Table */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Sl No</th>
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Current Medications</th>
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Dose</th>
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Frequency</th>
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {medications.map((med, idx) => (
                <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-7">
                    <div className="w-10 h-10 bg-gray-50 group-hover:bg-white rounded-xl flex items-center justify-center font-black text-gray-900 text-base shadow-sm">
                      {med.slNo?.toString().padStart(2, '0') || '00'}
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <span className="text-lg font-extrabold text-gray-900">{med.name}</span>
                  </td>
                  <td className="px-8 py-7">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl font-bold text-sm">{med.dose}</span>
                  </td>
                  <td className="px-8 py-7">
                    <span className="text-gray-600 font-semibold">{med.frequency}</span>
                  </td>
                  <td className="px-8 py-7">
                    <span className="text-blue-600 font-black">{med.remainingDuration}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <button className="flex items-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-[0.2em] text-sm group">
          <span>Next</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MedicalHistoryContent;
