import InfoBar from "@/components/infobar";
import Generaldetail from "./generaldetail";
import { Navbar } from "@/components";

const PromotionPage = () => {
  return (
    <div className="h-screen bg-primary">
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        <InfoBar />
        <Generaldetail />
      </div>
    </div>
  );
};

export default PromotionPage;
