"use client";

import { useState, ReactNode } from "react";
import Sidebar from "../UI/Sidebar";
import LoginModal from "../LoginModal";

interface ClientDashboardLayoutProps {
  children: ReactNode;
}

export default function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar setIsLoginOpen={setIsLoginOpen} />
      <main className="ml-64 flex-1 p-8 bg-white">{children}</main>
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}
