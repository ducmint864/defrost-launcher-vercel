// import { Footer, Navbar } from "@/components"
import { Navbar } from "@/components";
import ProjectDetailPage from "./projectDetail";

const ProjectDetail = () => {
  return (
    <div className="h-screen bg-primary">
      <Navbar />
      <div>
        <ProjectDetailPage />
      </div>
    </div>
  );
};

export default ProjectDetail;
