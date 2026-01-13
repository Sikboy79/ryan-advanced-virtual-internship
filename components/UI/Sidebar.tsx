"use client";

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
import { useAuthStore } from "@/store/useAuthStore";
import { logoutUser } from "@/app/library/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  setIsLoginOpen: (value: boolean) => void;
  showTextSizeControls?: boolean;
  fontSize?: number;
  setFontSize?: Dispatch<SetStateAction<number>>;
}

const COMMON_SIZES = [14, 18, 22, 26];

export default function Sidebar({
  setIsLoginOpen,
  showTextSizeControls = false,
  fontSize,
  setFontSize,
}: SidebarProps) {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-[#f7fbf9] border-r border-gray-200 flex flex-col text-gray-600 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="flex items-center px-4 py-5">
        <img
          className="nav__img"
          src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
          alt="logo"
        />
      </div>
      <nav className="flex-1 flex flex-col">
        <NavItem href="/for-you" icon={<FiHome />} label="For you" />
        <NavItem href="/my-library" icon={<FiBookmark />} label="My Library" />
        <NavItem
          href="/highlights"
          icon={<FiEdit />}
          label="Highlights"
          disabled
        />
        <NavItem href="/search" icon={<FiSearch />} label="Search" disabled />
        {showTextSizeControls && fontSize !== undefined && setFontSize && (
          <div className="mt-4 px-4">
            <div className="flex gap-3 justify-center items-end mb-3">
              {COMMON_SIZES.map((size, index) => {
                const scale = 0.8 + index * 0.2;
                const isActive = fontSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className="flex flex-col items-center"
                  >
                    <span
                      style={{ fontSize: `${16 * scale}px`, lineHeight: 1 }}
                      className="text-gray-800"
                    >
                      Aa
                    </span>
                    <span
                      className={`mt-1 h-1 w-6 rounded-full transition-all ${
                        isActive ? "bg-green-500" : "bg-transparent"
                      }`}
                    ></span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <NavItem href="/settings" icon={<FiSettings />} label="Settings" />
        <NavItem
          href="/help"
          icon={<FiHelpCircle />}
          label="Help & Support"
          disabled
        />
      </nav>
      <div className="px-4 pb-6 border-t border-gray-200 mt-auto">
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
