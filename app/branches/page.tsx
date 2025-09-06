"use client";
import React from "react";
import Sidebar from "../components/layout/sidebar";

const BranchesPage = () => {
  return (
    <div className="flex">
      <Sidebar role="user" /> {/* or get role dynamically */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#0047ab]">Branches</h1>
        {/* Add your branches list or content here */}
      </main>
    </div>
  );
};

export default BranchesPage;