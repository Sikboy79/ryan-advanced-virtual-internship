"use client"

import React from "react";
import DashboardLayout from "../app/for-you/ForYouLayout";
import { useState } from "react";

export default function Highlights() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div>
      <div className="">
        <DashboardLayout setIsLoginOpen={setIsLoginOpen} />
      </div>
    </div>
  );
};