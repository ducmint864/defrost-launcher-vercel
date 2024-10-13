import { Navbar } from "@/components";
import PreviewPage from "./preview";

const ProjectDetail = () => {
  return (
    <div className="h-screen bg-primary">
      <Navbar />
      <div>
        <PreviewPage />
      </div>
    </div>
  );
};

export default ProjectDetail;
