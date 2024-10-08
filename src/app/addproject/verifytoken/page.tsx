import React from "react";
import Verifytoken from "./verifytoken";
import { Navbar } from "@/components";
function page() {
  return (
    <div className="h-screen bg-primary overflow-hidden">
      <Navbar />
      <div>
        <Verifytoken />
      </div>
    </div>
  );
}

export default page;
