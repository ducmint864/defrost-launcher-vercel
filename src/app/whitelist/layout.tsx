"use client";

import NavBar from "@/components/navbar";

export default function WhitelistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}