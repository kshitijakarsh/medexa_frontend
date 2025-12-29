"use client";

import { useRouter } from "next/navigation";
import React from "react";
import NewButton from "@/components/common/new-button";

interface SelectFieldWithAddProps {
  label: string;
  placeholder: string;
}

const SelectFieldWithAdd: React.FC<SelectFieldWithAddProps> = ({
  label,
  placeholder,
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            className="
              w-full appearance-none bg-white border border-slate-200
              text-slate-700 rounded-md py-2.5 px-3
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
            "
          >
            <option>{placeholder}</option>
            <option>Dr. Smith</option>
            <option>Dr. Jones</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <NewButton
          name="Add"
          handleClick={() => {
            // router.push("/surgery/dashboard/scheduled");
            console.log("Add item clicked");
          }}
        />
      </div>
    </div>
  );
};

export default SelectFieldWithAdd;
