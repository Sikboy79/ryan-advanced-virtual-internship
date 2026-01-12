"use client";

import { useState } from "react";

interface AccessButtonProps {
  label: string;
  icon: React.ReactNode;
  hasAccess: boolean;
  onAccess?: () => void;
  onNoAccess: () => void;
  priceId: string;
}

export default function AccessButton({
  label,
  icon,
  hasAccess,
  onAccess,
  onNoAccess,
}: AccessButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (hasAccess) {
      onAccess?.();
    } else {
      onNoAccess();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-[#0f2a44] text-white px-6 py-3 w-36 rounded-md font-normal flex justify-around items-center hover:opacity-80"
    >
      {icon}
      <span>{hasAccess ? label : `Subscribe to ${label.toLowerCase()}`}</span>
    </button>
  );
}
