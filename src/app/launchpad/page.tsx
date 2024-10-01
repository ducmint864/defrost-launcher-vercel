import React from "react";
import { Navbar } from "@/components";
import LaunchpadPage from "./launchpad";

const Launchpad = () => {
  return (
    <div style={{ backgroundColor: "#16202B", minHeight: "100vh" }}>
      <Navbar />
      <LaunchpadPage />
    </div>
  );
};

export default Launchpad;
