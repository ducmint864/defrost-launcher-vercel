import { Navbar } from "@/components";
import SwapPage from "./swap";

const Swap = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        <SwapPage />
      </div>
    </div>
  );
};

export default Swap;
