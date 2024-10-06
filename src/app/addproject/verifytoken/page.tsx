import React from "react";
import Verifytoken from "./verifytoken";
import { Navbar } from "@/components";
function page() {
  return (
    <div className="h-screen">
      <Navbar />
      <div style={{ paddingTop: "10px" }}>
        <Verifytoken />
      </div>
    </div>
  );
}

export default page;
