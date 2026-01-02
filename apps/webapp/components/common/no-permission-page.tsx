// components/common/NoPermission.tsx
"use client";

import { ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";

export function NoPermission() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <div className="flex justify-center mb-4">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Access Denied
        </h1>

        <p className="text-gray-600 mt-2">
          You don’t have permission to access this section.
        </p>

        <button
          onClick={() => router.back()}
          className="inline-block mt-6 px-4 py-2 rounded-md bg-blue-600 text-white"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
