"use client";

import DashboardLayout from "../app/for-you/ForYouLayout";
import SearchInput from "./UI/SearchInput";
import { useState } from "react";

export default function ForYou() {
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
    </>
  );
}
