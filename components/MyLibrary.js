"use client";

import React from "react";
import DashboardLayout from "../app/for-you/ForYouLayout";
import { useState } from "react";
import SearchInput from "./UI/SearchInput";

export default function MyLibrary() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <div id="__next">
        <div className="search__input--wrapper flex justify-end m-1">
          <SearchInput />
        </div>
        <div className="sidebar__toggle--btn">
          <svg></svg>
        </div>
      </div>
      <div className="">
        <DashboardLayout setIsLoginOpen={setIsLoginOpen} />
      </div>
      <div className="z-50">MyLibrary</div>
    </>
  );
}
