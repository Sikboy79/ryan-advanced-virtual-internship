"use client";

import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import Sidebar from "@/components/UI/Sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar setIsLoginOpen={setIsLoginOpen}/>
      <main className="ml-64 flex-1 p-8 bg-white">
        {children}
      </main>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}