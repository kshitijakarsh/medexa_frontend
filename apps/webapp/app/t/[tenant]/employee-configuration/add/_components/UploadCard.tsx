// "use client";

// import { useCallback, useRef, useState, useEffect } from "react";
// import { Upload, Camera, X, RotateCcw } from "lucide-react";

// interface UploadCardProps {
//   title: string;
//   onFileSelect?: (file: File | null) => void;
//   value?: File | null;
// }

// export function UploadCard({ title, onFileSelect, value }: UploadCardProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [cameraError, setCameraError] = useState<string | null>(null);

//   // Handle file upload
//   const handleFileSelect = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0] || null;
//       if (file) {
//         setPreviewUrl(URL.createObjectURL(file));
//       }
//       onFileSelect?.(file);
//     },
//     [onFileSelect]
//   );

//   // Open file dialog
//   const handleBrowseClick = () => fileInputRef.current?.click();

//   // Start camera stream
//   const startCapture = async () => {
//     // CHANGED: Moved state updates out of the 'if' block
//     setCameraError(null);
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" },
//       });
//       setStream(mediaStream); // Set the stream in state
//       setIsCapturing(true); // Set capturing mode
//     } catch (err) {
//       console.error("Camera error:", err);
//       setCameraError(
//         "Unable to access camera. Please allow camera permissions."
//       );
//     }
//   };
  
//   // CHANGED: Added new useEffect to attach stream AFTER render
//   useEffect(() => {
//     if (isCapturing && videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [isCapturing, stream]); // Re-run when these values change

//   // Capture snapshot
//   const captureImage = () => {
//     if (!videoRef.current) return;
//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file = new File([blob], "captured-image.jpg", {
//           type: "image/jpeg",
//         });
//         setPreviewUrl(URL.createObjectURL(file));
//         onFileSelect?.(file);
//       }
//     }, "image/jpeg");

//     stopCapture();
//   };

//   // Stop camera
//   const stopCapture = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     setStream(null);
//     setIsCapturing(false);
//   };

//   // Remove uploaded / captured file
//   const handleRemove = () => {
//     setPreviewUrl(null);
//     onFileSelect?.(null);
//   };

//   // Cleanup camera on unmount
//   useEffect(() => {
//     // This existing cleanup is correct
//     return () => stopCapture();
//   }, []); // Empty dependency array means it runs on unmount

//   return (
//     <div className="border border-dashed rounded-md p-4 text-center bg-[#F7FBFF]">
//       {/* Upload / Capture State */}
//       {!previewUrl && !isCapturing && (
//         <div
//           className="flex flex-col items-center justify-center h-32 cursor-pointer"
//           onClick={handleBrowseClick}
//         >
//           <Upload className="w-8 h-8 text-blue-500 mb-2" />
//           <p className="text-sm text-gray-600">
//             Click to upload or drag & drop<br />
//             Max 10MB (PDF or JPG)
//           </p>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             className="hidden"
//             onChange={handleFileSelect}
//           />
//         </div>
//       )}

//       {/* Camera Capture Mode */}
//       {isCapturing && (
//         <div className="flex flex-col items-center space-y-3">
//           {cameraError ? (
//             <div className="text-red-500 text-sm">{cameraError}</div>
//           ) : (
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               className="rounded-md border border-gray-300 w-full max-h-64 object-cover"
//             />
//           )}

//           <div className="flex justify-center gap-3 mt-3">
//             <button
//               type="button"
//               onClick={captureImage}
//               className="px-4 py-1 bg-green-500 text-white rounded-md text-sm"
//             >
//               Capture
//             </button>
//             <button
//               type="button"
//               onClick={stopCapture}
//               className="px-4 py-1 bg-gray-100 rounded-md text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Image Preview */}
//       {previewUrl && !isCapturing && (
//         <div className="relative flex flex-col items-center">
//           <img
//             src={previewUrl}
//             alt="Captured"
//             className="rounded-md border border-gray-300 max-h-48 object-contain mx-auto"
//           />
//           <div className="flex justify-center gap-3 mt-3">
//             <button
//               type="button"
//               onClick={handleRemove}
//               className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
//             >
//               <X className="w-4 h-4 text-red-500" /> Remove
//             </button>
//             <button
//               type="button"
//               onClick={startCapture}
//               className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//             >
//               <RotateCcw className="w-4 h-4" /> Re-capture
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Default Buttons */}
//       {!isCapturing && !previewUrl && (
//         <div className="flex justify-center gap-3 mt-3">
//           <button
//             type="button"
//             onClick={startCapture}
//             className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
//           >
//             <Camera className="w-4 h-4" /> Capture
//           </button>
//           <button
//             type="button"
//             onClick={handleBrowseClick}
//             className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//           >
//             Upload Document
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Upload, Camera, X, RotateCcw } from "lucide-react";

interface UploadCardProps {
  title: string;
  onFileSelect?: (file: File | null) => void;
  value?: File | null;
}


export function UploadCard({ title, onFileSelect, value }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // ... (handleFileSelect, handleBrowseClick are the same) ...
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const handleBrowseClick = () => fileInputRef.current?.click();

  // Start camera stream
  const startCapture = async () => {
    setCameraError(null); // Clear previous errors
    setIsCapturing(true); // Go to capturing view *first*
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream); // Set the stream in state
    } catch (err) {
      console.error("Camera error:", err);
      // CHANGED: Smarter error messages
      if (err instanceof DOMException && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
        setCameraError("Camera permission denied. Please allow camera access in your browser's address bar or settings, then click 'Try Again'.");
      } else {
        setCameraError("Unable to access camera. It may be in use by another app.");
      }
      setIsCapturing(true); // Stay on the capturing screen to show the error
    }
  };

  // Attach stream to video element
  useEffect(() => {
    // Only attach if there is no error and we have all elements
    if (isCapturing && !cameraError && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCapturing, stream, cameraError]); // Re-run when these values change

  // Capture snapshot
  const captureImage = () => {
    // ... (This function is the same) ...
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "captured-image.jpg", {
          type: "image/jpeg",
        });
        setPreviewUrl(URL.createObjectURL(file));
        onFileSelect?.(file);
      }
    }, "image/jpeg");

    stopCapture();
  };


  // Stop camera
  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setIsCapturing(false);
    setCameraError(null); // Also clear error on stop
  };

  // Remove uploaded / captured file
  const handleRemove = () => {
    // ... (This function is the same) ...
    setPreviewUrl(null);
    onFileSelect?.(null);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCapture();
  }, []);

  return (
    <div className="border border-dashed rounded-md p-4 text-center bg-[#F7FBFF]">
      {/* ... (Upload / Capture State is the same) ... */}
      {!previewUrl && !isCapturing && (
        <div /* ... (omitted for brevity) ... */ >
          <Upload className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">
            Click to upload or drag & drop<br />
            Max 10MB (PDF or JPG)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}


      {/* Camera Capture Mode - CHANGED */}
      {isCapturing && (
        <div className="flex flex-col items-center space-y-3">
          {cameraError ? (
            // ** ERROR STATE **
            <div className="flex flex-col items-center justify-center h-32 text-red-500 text-sm">
              <p>{cameraError}</p>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={startCapture} // Let user try again
                  className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={stopCapture} // Cancel and go back
                  className="px-4 py-1 bg-gray-100 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // ** SUCCESS STATE (VIDEO STREAM) **
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="rounded-md border border-gray-300 w-full max-h-64 object-cover"
              />
              <div className="flex justify-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={captureImage}
                  className="px-4 py-1 bg-green-500 text-white rounded-md text-sm"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={stopCapture}
                  className="px-4 py-1 bg-gray-100 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ... (Image Preview and Default Buttons are the same) ... */}
      {previewUrl && !isCapturing && (
        <div /* ... (omitted for brevity) ... */ >
            <img
              src={previewUrl}
              alt="Captured"
              className="rounded-md border border-gray-300 max-h-48 object-contain mx-auto"
            />
            <div className="flex justify-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <X className="w-4 h-4 text-red-500" /> Remove
                </button>
                <button
                  type="button"
                  onClick={startCapture}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Re-capture
                </button>
            </div>
        </div>
      )}

      {!isCapturing && !previewUrl && (
        <div /* ... (omitted for brevity) ... */ >
           <div className="flex justify-center gap-3 mt-3">
             <button
               type="button"
               onClick={startCapture}
               className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-md text-sm"
             >
               <Camera className="w-4 h-4" /> Capture
             </button>
             <button
               type="button"
               onClick={handleBrowseClick}
               className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
             >
               Upload Document
             </button>
           </div>
        </div>
      )}
    </div>
  );
}