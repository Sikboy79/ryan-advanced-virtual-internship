"use client";

import Link from "next/link";

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function NavItem({
  href,
  icon,
  label,
  onClick,
  disabled = false,
}: NavItemProps) {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-5 rounded-md
        ${disabled ? " cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"}
      `}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.();
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  if (disabled || !href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}