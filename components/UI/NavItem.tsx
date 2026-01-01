"use client";

import React from "react";
import Link from "next/link";

type Props = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
};

export default function NavItem({ icon, label, href, onClick }: Props) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-200">
      {icon}
      <span>{label}</span>
    </div>
  );

  // 🔑 If href exists → navigation
  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  // 🔑 If no href → button behavior
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
