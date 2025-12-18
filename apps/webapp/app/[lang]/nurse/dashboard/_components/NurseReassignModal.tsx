"use client";

import { useState, useMemo } from "react";
import { X, Search, User } from "lucide-react";
import { useNurses, useUpdateVisit } from "../_hooks/useNurseVisit";
import Button from "@/components/ui/button";
import { useNurseOrdersQuery } from "./api";

interface NurseReassignModalProps {
  visit: any;
  isOpen: boolean;
  onClose: () => void;
}

export function NurseReassignModal({
  visit,
  isOpen,
  onClose,
}: NurseReassignModalProps) {
    const nurseOrdersQuery = useNurseOrdersQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNurseId, setSelectedNurseId] = useState<string>("");

  const { data: nurses, isLoading: loadingNurses } = useNurses({
    enabled: isOpen,
  });
  const updateVisit = useUpdateVisit();

  const filteredNurses = useMemo(() => {
    if (!nurses) return [];
    if (!searchQuery) return nurses;

    const query = searchQuery.toLowerCase();
    return nurses.filter(
      (nurse: any) =>
        nurse.name?.toLowerCase().includes(query) ||
        nurse.first_name?.toLowerCase().includes(query) ||
        nurse.last_name?.toLowerCase().includes(query) ||
        nurse.email?.toLowerCase().includes(query)
    );
  }, [nurses, searchQuery]);

  const currentNurse = visit?.nurse;
  const currentNurseName = currentNurse
    ? currentNurse.name || `${currentNurse.first_name || ""} ${currentNurse.last_name || ""}`.trim()
    : "No nurse assigned";

  const handleAssign = async () => {
    if (!selectedNurseId || !visit?.id) return;

    try {
      await updateVisit.mutateAsync({
        id: visit.id,
        payload: { nurse_id: selectedNurseId.toString() },
      });
      // refresh nurse orders as reassignment may affect orders list/state
      try {
        await nurseOrdersQuery.refetch?.();
      } catch (err) {
        // non-fatal: log but don't block closing the modal
        console.warn("Failed to refetch nurse orders after reassign", err);
      }
      onClose();
      setSearchQuery("");
      setSelectedNurseId("");
    } catch (error: any) {
      console.error("Failed to reassign nurse:", error);
      alert(error?.response?.data?.message || "Failed to reassign nurse");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Reassign Nurse
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Nurse */}
        <div className="p-4 bg-blue-50 border-b">
          <p className="text-xs text-gray-600 mb-1">Currently Assigned</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {(currentNurse?.name?.[0] || currentNurse?.first_name?.[0])?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {currentNurseName}
              </p>
              {currentNurse?.email && (
                <p className="text-xs text-gray-500">{currentNurse.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search nurses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Nurse List */}
        <div className="p-4 max-h-64 overflow-y-auto">
          {loadingNurses ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              Loading nurses...
            </div>
          ) : filteredNurses.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              {searchQuery ? "No nurses found" : "No nurses available"}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNurses.map((nurse: any) => {
                const nurseName = nurse.name || 
                  `${nurse.first_name || ""} ${nurse.last_name || ""}`.trim();
                const isSelected = selectedNurseId === nurse.id;
                const isCurrent = currentNurse?.id === nurse.id;

                return (
                  <button
                    key={nurse.id}
                    onClick={() => setSelectedNurseId(nurse.id)}
                    disabled={isCurrent}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : isCurrent
                        ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {(nurse.name?.[0] || nurse.first_name?.[0])?.toUpperCase() || "N"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {nurseName}
                          {isCurrent && (
                            <span className="ml-2 text-xs text-blue-600 font-normal">
                              (Current)
                            </span>
                          )}
                        </p>
                        {nurse.email && (
                          <p className="text-xs text-gray-500 truncate">
                            {nurse.email}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedNurseId || updateVisit.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {updateVisit.isPending ? "Assigning..." : "Assign Nurse"}
          </Button>
        </div>
      </div>
    </div>
  );
}
