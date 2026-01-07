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
    <div className="flex min-h-screen ">
      <Sidebar setIsLoginOpen={setIsLoginOpen} />
      <main className="ml-48 flex-1 p-8 bg-white">{children}</main>
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}
