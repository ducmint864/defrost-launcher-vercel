import React from "react";
import { Navbar } from "@/components";
import LaunchpadPage from "./launchpad";

const Launchpad = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        <LaunchpadPage />
      </div>
    </div>
  );
};

export default Launchpad;
