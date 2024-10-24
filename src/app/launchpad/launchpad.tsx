"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import image1 from "../../../public/images/bg1.jpg";
// import image2 from "../../../public/images/bg2.jpg";
// import image3 from "../../../public/images/bg3.jpg";
// import image4 from "../../../public/images/bg4.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useChain } from "@thirdweb-dev/react";
import { chainConfig } from "@/config";
import { ethers } from "ethers";
import { ProjectPoolABI, ProjectPoolFactoryABI } from "@/abi";
import { DBProject, ProjectStatus } from "@/interfaces/interface";

function LaunchpadPage() {
  const [projectList, setProjectList] = useState([]);
  const [launchpadData, setLaunchpadData] = useState({});
  const [factoryAddress, setFactoryAddress] = useState<string | undefined>(
    undefined
  );
  const [factoryContract, setFactoryContract] =
    useState<ethers.Contract | null>(null);
  const [otherProjects, setOtherProjects] = useState<DBProject[]>([]);
  const [upcomingProjects, setUpcomingProjects] = useState<DBProject[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const route = useRouter();
  const chain = useChain();
  useEffect(() => {
    if (!chain) {
      return;
    }

    const address: string =
      chainConfig[chain.chainId.toString() as keyof typeof chainConfig]
        ?.contracts?.ProjectPoolFactory?.address;

    setFactoryAddress(address);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      address,
      ProjectPoolFactoryABI,
      provider
    );
    setFactoryContract(factoryContract);
  }, [chain]);

  useEffect(() => {
    const fetchProjectsList = async () => {
      try {
        const response = await axios.post("/api/launchpad");
        console.log("Long ne: " + response);

        const projectList = response.data.projectList;

        console.log(projectList);

        const launchpadData = response.data.launchpadData;

        console.log(launchpadData);

        setProjectList(projectList);
        setLaunchpadData(launchpadData);

        // Dùng for...of để xử lý tuần tự
        console.log("len:" + projectList.length);
        const projectsWithDetails = [];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        for (let i = 0; i < projectList.length; i++) {
          let project = projectList[i];
          const poolAddress = await factoryContract!.getProjectPoolAddress(
            project.projectID
          );
          // const signer = provider.getSigner();
          const contract = new ethers.Contract(
            poolAddress,
            ProjectPoolABI,
            provider
          );
          const raisedAmount = await contract.getProjectRaisedAmount();
          const isProjectSoftCapReached =
            await contract.getProjectSoftCapReached();
          const hardCap = await contract.getProjectHardCapAmount();
          projectsWithDetails.push(
            Object.assign(project, {
              raisedAmount,
              isProjectSoftCapReached,
              hardCap,
            })
          );
        }

        const upcomingProjects = projectsWithDetails.filter(
          (project: DBProject) => project.status === "upcoming"
        );

        const otherProjects = projectsWithDetails.filter(
          (project: DBProject) => project.status !== "upcoming"
        );

        setUpcomingProjects(upcomingProjects);
        setOtherProjects(otherProjects);

        //     const ended = projectsWithDetails.filter(
        //       (project: DBProject) => project.status === Status.Ended
        //     );
        //     const pending = projectsWithDetails.filter(
        //       (project: DBProject) => project.status === Status.Pending
        //     );

        //     setEndedProjects(ended);
        //     setPendingProjects(pending);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    // if (projectOwnerAddress) {
    // }
    fetchProjectsList();
  }, [factoryContract]);

  // useEffect(() => {
  //   const fetchProjectList = async () => {

  //     const response = await axios.post("/api/launchpad");

  //     const projectList = response.data.projectList;

  //     console.log(projectList);

  //     const launchpadData = response.data.launchpadData;

  //     console.log(launchpadData);

  //     setProjectList(projectList);
  //     setLaunchpadData(launchpadData);

  //   }
  //   fetchProjectList();
  // }, [])
  const handleClick = () => {
    route.push("./addProject/verifyToken");
  };

  const handleChooseProject = (projectId: number) => {
    route.push(`./projectDetail/${projectId}`);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-primary">
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-[#0047FF] rounded-full opacity-10 blur-3xl animate-pulse z-0"></div>

      <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#0047FF] rounded-full opacity-10 blur-3xl animate-pulse z-0"></div>

      <div className="relative p-5 font-sans w-200 max-w-4xl  z-10">
        <div className="mb-10 mt-5">
          <span className="text-lg text-neutral">IDO Project</span>
          <div className="flex items-center justify-between mb-4 mt-5">
            <h2 className="text-3xl font-bold text-white">Upcoming IDO</h2>
            <button
              className="bg-neutral shadow-lg shadow-blue-500/50 py-1 px-4 rounded-lg  text-[#fefefe] transition duration-300 ease-in-out hover:bg-[#203e6a] hover:text-[#fefefe] hover:shadow-lg hover:shadow-blue-200"
              onClick={handleClick}
            >
              Add Project
            </button>
          </div>

          <Slider {...settings}>
            {upcomingProjects.map((project) => (
              <div
                key={project.id}
                className="w-full p-2"
                onClick={() => {handleChooseProject(project.projectID!)}}
                
              >
                <div className="h-96 rounded-lg bg-secondary p-4 text-white flex flex-col justify-between transition-transform transform hover:-translate-y-2 duration-300">
                  <div>
                    <Image
                      src={project.projectLogoImageUrl[0]}
                      alt={project.projectTitle}
                      width={1000}
                      height={2000}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h3 className="text-lg font-bold mb-2">
                      {project.projectTitle}
                    </h3>
                    <p>{project.description}</p>
                    <p className="mt-4">
                      Fundraise Goal:{" "}
                      <span className="font-bold">{project.hardCap}</span>
                    </p>
                    {/* <p>
                      Max allocation:{" "}
                      <span className="font-bold">{project.maxAllocation}</span>
                    </p> */}
                  </div>
                  <button className="mt-4 bg-neutral text-[#ffffff] py-2 px-4 rounded-lg">
                    TOKEN SALE
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Funded Projects Section */}
        {upcomingProjects.map((project) => (
          <div className="mb-6" key={project.id}>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold text-white">
                Funded Projects:{" "}
              </h2>
              <div className="flex justify-between flex-1">
                <div className="bg-gradient-to-r from-[#153E52] to-[#0A0B0D] via-[#0A0B0D] border border-[#25607E] p-4 rounded-lg flex-1 mx-2 text-right">
                  <span className="text-[#2DACDC] block">
                    Funded Projects:{" "}
                  </span>
                  <span className="font-bold text-white block">113</span>
                </div>
                <div className="bg-gradient-to-r from-[#555B3D] to-[#0A0B0D] via-[#0A0B0D] border border-[#737D37] p-4 rounded-lg flex-1 mx-2 text-right">
                  <span className="text-[#8c955c] block">
                    Unique Participants:
                  </span>
                  <span className="font-bold text-white block">30,294</span>
                </div>
                <div className="bg-gradient-to-r from-[#754b4b] to-[#0A0B0D] via-[#0A0B0D] border border-[#745734] p-4 rounded-lg flex-1 mx-2 text-right">
                  <span className="text-[#c97f7f] block">Raised Capital: </span>
                  <span className="font-bold text-white block">
                    $41,582,502.04
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Table Section */}
        <div className=" rounded-[15px] bg-[#18181B]">
          <table className="w-full border-collapse rounded-[15px] text-white">
            <thead>
              <tr className="bg-[#27272A] text-left text-sm text-[#aeaeae]">
                <th className="p-4 rounded-tl-[15px]">Project Name</th>
                <th className="p-4">Type</th>
                {/* <th className="p-4">Participants</th> */}
                <th className="p-4">Raised Fund</th>
                <th className="p-4 rounded-tr-[15px]">End Date</th>
              </tr>
            </thead>

            <tbody>
              {otherProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:border-2 hover:border-neutral"
                  onClick={() => {handleChooseProject(project.projectID!)}}
                >
                  <td className="p-4">{project.projectTitle}</td>
                  <td className="p-4">{project.description}</td>
                  {/* <td className="p-4">{project.participants}</td> */}
                  <td className="p-4">{project.raisedAmount?.toString()}</td>
                  <td className="p-4">
                    {new Date(project.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaunchpadPage;
