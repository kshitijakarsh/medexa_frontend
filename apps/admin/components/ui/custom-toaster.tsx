"use client";

import { Toaster } from "@workspace/ui/lib/sonner";

/**
 * CustomToaster - centralized configuration for toast notifications.
 * This component can be imported once in your app layout.
 */
export function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "10px",
          fontSize: "14px",
          padding: "12px 16px",
          boxShadow:
            "0 2px 6px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06)",
        },
        classNames: {
          toast: "border shadow-md transition-all duration-300",
          success:
            "bg-green-50 text-green-800 border border-green-200 hover:bg-green-100",
          error:
            "bg-red-50 text-red-800 border border-red-200 hover:bg-red-100",
          warning:
            "bg-yellow-50 text-yellow-800 border border-yellow-200 hover:bg-yellow-100",
          info: "bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100",
          closeButton:
            "text-gray-500 hover:text-gray-700 transition-colors duration-200",
        },
      }}
    />
  );
}
