import React from "react";
import { Navbar } from "@/components";
import LaunchpadPage from "./launchpad";

const Launchpad = () => {
  return (
    <div style={{ backgroundColor: "#16202B" }}>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        <LaunchpadPage />
      </div>
    </div>
  );
};

export default Launchpad;
