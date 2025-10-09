// // components/onboard-hospital/ui/FileUploader.tsx
// import { useState } from "react";

// interface FileUploaderProps {
//   onSelect: (file: File | null) => void;
//   previewUrl?: string | null;
// }

// export const FileUploader = ({ onSelect, previewUrl }: FileUploaderProps) => {
//   const [localPreview, setLocalPreview] = useState(previewUrl);

//   const handleChange = (file: File | null) => {
//     onSelect(file);
//     if (!file) return setLocalPreview(null);
//     const reader = new FileReader();
//     reader.onload = e => setLocalPreview(e.target?.result as string);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="w-full bg-slate-50 border border-dashed rounded-md p-3 flex flex-col items-center">
//       <div className="w-36 h-36 bg-white rounded-md overflow-hidden border border-slate-100 flex items-center justify-center">
//         {localPreview ? (
//           <img src={localPreview} alt="Logo" className="object-contain w-full h-full" />
//         ) : (
//           <div className="text-slate-400 text-sm">No logo selected</div>
//         )}
//       </div>
//       <label className="mt-3 cursor-pointer text-sm text-blue-600 underline">
//         <input type="file" accept="image/*" onChange={e => handleChange(e.target.files?.[0] || null)} className="hidden" />
//         Browse Hospital Logo
//       </label>
//       <button
//         type="button"
//         onClick={() => handleChange(null)}
//         className="mt-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm border"
//       >
//         Remove
//       </button>
//     </div>
//   );
// };


"use client";
import { useState } from "react";

interface FileUploaderProps {
  onSelect: (file: File | null) => void;
  previewUrl?: string | null;
}

export const FileUploader = ({ onSelect, previewUrl }: FileUploaderProps) => {
  const [localPreview, setLocalPreview] = useState(previewUrl);
  const [error, setError] = useState<string | null>(null);

  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

  const handleChange = (file: File | null) => {
    if (!file) {
      setLocalPreview(null);
      setError(null);
      onSelect(null);
      return;
    }

    // ✅ Check file type
    if (!allowedFormats.includes(file.type)) {
      setError("Only PNG, JPG, JPEG, or SVG files are allowed.");
      setLocalPreview(null);
      onSelect(null);
      return;
    }

    setError(null);
    onSelect(file);

    const reader = new FileReader();
    reader.onload = (e) => setLocalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-md p-4 flex flex-col items-center transition hover:border-blue-400 hover:bg-blue-50/40">
      {/* Image Preview Box */}
      <div className="w-36 h-36 bg-white rounded-md overflow-hidden border border-slate-200 flex items-center justify-center shadow-sm">
        {localPreview ? (
          <img
            src={localPreview}
            alt="Logo Preview"
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-slate-400 text-sm text-center">
            No logo selected
          </div>
        )}
      </div>

      {/* Upload Button */}
      <label className="mt-3 cursor-pointer text-sm text-blue-600 underline hover:text-blue-700 transition">
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          onChange={(e) => handleChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        Browse Hospital Logo
      </label>

      {/* Remove Button */}
      {localPreview && (
        <button
          type="button"
          onClick={() => handleChange(null)}
          className="mt-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm border hover:bg-blue-100 transition cursor-pointer"
        >
          Remove
        </button>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-xs text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};
