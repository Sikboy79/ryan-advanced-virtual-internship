"use client";
import React from "react";

import NavItem from "@/components/UI/NavItem";
import {
  FiHome,
  FiBookmark,
  FiEdit,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { useUserStore } from "@/store/useAuthStore";
import { logoutUser } from "@/app/library/auth";
import { useRouter } from "next/navigation";

interface SidebarProps {
  setIsLoginOpen: (value: boolean) => void;
}

function Sidebar({ setIsLoginOpen }: SidebarProps) {
  const router = useRouter();
  const { user, clearUser } = useUserStore();

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    router.push("/");
  };
  return (
    <aside className="fixed left-0 top-0 h-screen w-52 bg-[#f7fbf9] border-r border-gray-200 flex flex-col">
      <div className="flex items-center gap-3 px-6 py-5">
        <img
          className="nav__img"
          src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
          alt="logo"
        />
      </div>
      <nav className="flex-1 px-4 space-y-1">
        <NavItem href="/for-you" icon={<FiHome />} label="For you" />
        <NavItem href="/my-library" icon={<FiBookmark />} label="My Library" />
        <NavItem href="/highlights" icon={<FiEdit />} label="Highlights" />
        <NavItem href="/search" icon={<FiSearch />} label="Search" />
        <NavItem href="/settings" icon={<FiSettings />} label="Settings" />
        <NavItem href="/help" icon={<FiHelpCircle />} label="Help & Support" />
      </nav>
      <div className="px-4 pb-6">
        {user ? (
          <NavItem icon={<FiLogOut />} label="Logout" onClick={handleLogout} />
        ) : (
          <NavItem
            icon={<FiLogIn />}
            label="Login"
            onClick={() => setIsLoginOpen(true)}
          />
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
