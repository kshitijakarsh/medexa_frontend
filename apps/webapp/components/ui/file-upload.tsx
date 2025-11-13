"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  label?: string
  error?: string
  required?: boolean
  previewUrl?: string | null
  disabled?: boolean
}

export const FileUpload = ({
  onFileSelect,
  accept = "image/*,.pdf",
  label = "Upload File",
  error,
  required,
  previewUrl,
  disabled = false,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0] || null
    onFileSelect(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        onClick={disabled ? undefined : handleClick}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
        onDrop={disabled ? undefined : handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${
            disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
              : isDragging
                ? "border-green-500 bg-green-50 cursor-pointer"
                : error
                  ? "border-red-500 bg-red-50 cursor-pointer"
                  : "border-gray-300 hover:border-gray-400 cursor-pointer"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        {previewUrl ? (
          <div className="space-y-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-32 mx-auto rounded"
            />
            <p className="text-sm text-gray-600">Click to change file</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
