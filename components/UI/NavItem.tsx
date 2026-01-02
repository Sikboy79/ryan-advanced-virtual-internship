"use client";

import Link from "next/link";

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export default function NavItem({
  href,
  icon,
  label,
  onClick,
  active = false,
}: NavItemProps) {
  const classes = `
    flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition
    ${
      active
        ? "bg-[#E6F4EE] text-[#1C7C54] font-semibold"
        : "hover:bg-gray-100 text-gray-600"
    }
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={classes}>
      {icon}
      <span>{label}</span>
    </div>
  );
}