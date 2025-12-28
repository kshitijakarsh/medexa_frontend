import { ReactNode } from "react";

interface EmptyStateProps {
  message: string,
  buttonText: string,
  onClick: () => void,
  icon: ReactNode,
}

export function EmptyState({ message, buttonText, onClick, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      {icon}
      <div>{message}</div>
      <button
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}