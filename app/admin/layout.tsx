"use client";
import React, { ReactNode, Suspense } from "react";
import Sidebar from "./_components/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <div className="min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </Suspense>
  );
};

export default Layout;
