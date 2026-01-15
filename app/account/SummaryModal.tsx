"use client";
import { useSubscription } from "@/store/useSubscriptions";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
  title: string;
  isPremium: boolean;
}

export default function SummaryModal({
  isOpen,
  onClose,
  summary,
  title,
}: SummaryModalProps) {
  const { subscription, loading } = useSubscription();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl max-h-[80vh] rounded-xl shadow-lg flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 text-gray-700 leading-relaxed whitespace-pre-line">
          {summary}
        </div>
      </div>
    </div>
  );
}
