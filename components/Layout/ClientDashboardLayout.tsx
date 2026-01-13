"use client";

import { useState, ReactNode } from "react";
import Sidebar from "../UI/Sidebar";
import LoginModal from "../LoginModal";
import { useAuthStore } from "@/store/useAuthStore";

interface ClientDashboardLayoutProps {
  children: ReactNode;
}

export default function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps) {
  const { user, loading } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  if (loading) return null; // or skeleton loader

  return (
    <div className="flex flex-col md:flex-row ">
      <aside className="hidden md:flex flex-col w-52">
        <Sidebar setIsLoginOpen={setIsLoginOpen} />
      </aside>
      <main className="flex-1 py-6 px-4 bg-white max-w-full">
        {children}
      </main>

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}

