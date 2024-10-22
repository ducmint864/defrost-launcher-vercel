"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import getMyProjectInfo from "@/utils/getMyProjectInfo";
import { DBProject } from "@/interfaces/interface";


function InvesmentPage() {
  const [showMoreEnded, setShowMoreEnded] = useState(false);
  const [showMorePending, setShowMorePending] = useState(false);
  const [endedProjects, setEndedProjects] = useState<DBProject[]>([]);
  const [pendingProjects, setPendingProjects] = useState<DBProject[]>([]);
  const userAddress = useAddress();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post("/api/myInvestment", {
          userAddress: userAddress,
        });

        console.log(response.data);

        const projects: DBProject[] = response.data.projectsDetails;

        console.log(projects);
        console.log(projects[0]);

        const projectWithRaisedAmount = projects.map((project: any) => {
          const { raisedAmount, isLoading, error, isProjectSoftCapReached, loading, softCapError } = getMyProjectInfo(
            project.id
          );
          return { ...project, raisedAmount, isLoading, error, isProjectSoftCapReached, loading, softCapError };
        });

        const ended = projectWithRaisedAmount.filter(
          (project) => project.status
        );

        const pending = projectWithRaisedAmount.filter(
          (project) => project.status
        );

        setEndedProjects(ended);
        setPendingProjects(pending); 


      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects();
  }, [userAddress]);


  const projects = [
    {
      id: 1,
      name: "Caskaido",
      description: "Revolutionizing Online Gaming with Blockchain.",
      remainingTime: "01/01/2025",
      tokensRemaining: "9,789,230",
      totalTokensMinted: "330,770",
      mintPrice: "$1",
      status: 1,
      imageUrl:
        "https://i.pinimg.com/originals/80/11/a5/8011a542756bc3ea49dc36a36f6543eb.png",
    },
    {
      id: 2,
      name: "NeoTech",
      description: "Innovating the Future of AI.",
      remainingTime: "01/01/2025",
      tokensRemaining: "2,340,120",
      totalTokensMinted: "200,000",
      mintPrice: "$0.5",
      status: 0,
      imageUrl:
        "https://i.pinimg.com/originals/d9/e3/c4/d9e3c47736b67051378f4a242072c1c6.png",
    },
    {
      id: 3,
      name: "SolarPeak",
      description: "Clean and Sustainable Energy Solutions.",
      remainingTime: "01/01/2025",
      tokensRemaining: "5,600,450",
      totalTokensMinted: "480,000",
      mintPrice: "$2",
      status: 1,
      imageUrl:
        "https://i.pinimg.com/originals/80/11/a5/8011a542756bc3ea49dc36a36f6543eb.png",
    },
    {
      id: 4,
      name: "HealthNet",
      description: "Blockchain for Healthcare.",
      remainingTime: "01/01/2025",
      tokensRemaining: "7,500,000",
      totalTokensMinted: "700,000",
      mintPrice: "$3",
      status: 0,
      imageUrl:
        "https://i.pinimg.com/originals/d9/e3/c4/d9e3c47736b67051378f4a242072c1c6.png",
    },
    {
      id: 5,
      name: "AeroSpaceX",
      description: "Next Generation Space Exploration.",
      remainingTime: "01/01/2025",
      tokensRemaining: "10,000,000",
      totalTokensMinted: "900,000",
      mintPrice: "$5",
      status: 1,
      imageUrl:
        "https://i.pinimg.com/originals/80/11/a5/8011a542756bc3ea49dc36a36f6543eb.png",
    },
    {
      id: 6,
      name: "AgriChain",
      description: "Transforming Agriculture with Blockchain.",
      remainingTime: "01/01/2025",
      tokensRemaining: "3,200,000",
      totalTokensMinted: "270,000",
      mintPrice: "$1.5",
      status: 0,
      imageUrl:
        "https://i.pinimg.com/originals/d9/e3/c4/d9e3c47736b67051378f4a242072c1c6.png",
    },
    {
      id: 7,
      name: "GreenTech",
      description: "Innovative Green Technologies.",
      remainingTime: "01/01/2025",
      tokensRemaining: "4,500,000",
      totalTokensMinted: "370,000",
      mintPrice: "$2.5",
      status: 1,
      imageUrl:
        "https://i.pinimg.com/originals/80/11/a5/8011a542756bc3ea49dc36a36f6543eb.png",
    },
  ];

  const displayedEndedProjects = showMoreEnded
    ? projects.filter((project) => project.status === 1)
    : projects.filter((project) => project.status === 1).slice(0, 3);

  const displayedPendingProjects = showMorePending
    ? projects.filter((project) => project.status === 0)
    : projects.filter((project) => project.status === 0).slice(0, 3);

  return (
    <div className="relative flex flex-col justify-start items-start min-h-screen bg-primary px-14">
      <div className="mt-20 mb-6 text-2xl font-bold text-white">
        Ended Project
      </div>
      {displayedEndedProjects.map((project) => (
        <div
          key={project.id}
          className="w-full bg-secondary rounded-lg shadow-lg p-4 text-white flex items-center mt-5"
        >
          <div className="flex items-center flex-grow space-x-4 p-3">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={52}
                height={52}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="w-48">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm">{project.description}</p>
            </div>

            <div className="flex space-x-7 p-5">
              <div className="text-center">
                <p className="font-semibold">Remaining</p>
                <p>{project.remainingTime}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Tokens Remaining</p>
                <p>{project.tokensRemaining}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Total Tokens Minted</p>
                <p>{project.totalTokensMinted}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Mint Price</p>
                <p>{project.mintPrice}</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80">
              Withdraw
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-center w-full">
        {!showMoreEnded ? (
          <Button
            className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80"
            onClick={() => setShowMoreEnded(true)}
          >
            More Ended Projects
          </Button>
        ) : (
          <Button
            className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80"
            onClick={() => setShowMoreEnded(false)}
          >
            Less Ended Projects
          </Button>
        )}
      </div>

      <div className="mt-20 mb-6 text-2xl font-bold text-white">
        Pending Project
      </div>
      {displayedPendingProjects.map((project) => (
        <div
          key={project.id}
          className="w-full bg-secondary rounded-lg shadow-lg p-4 text-white flex items-center mt-5"
        >
          <div className="flex items-center flex-grow space-x-4 p-3">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={52}
                height={52}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="w-48">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm">{project.description}</p>
            </div>

            <div className="flex space-x-7 p-5">
              <div className="text-center">
                <p className="font-semibold">Remaining</p>
                <p>{project.remainingTime}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Tokens Remaining</p>
                <p>{project.tokensRemaining}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Total Tokens Minted</p>
                <p>{project.totalTokensMinted}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Mint Price</p>
                <p>{project.mintPrice}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4 mb-4 flex justify-center w-full">
        {!showMorePending ? (
          <Button
            className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80"
            onClick={() => setShowMorePending(true)}
          >
            More Pending Projects
          </Button>
        ) : (
          <Button
            className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80"
            onClick={() => setShowMorePending(false)}
          >
            Less Pending Projects
          </Button>
        )}
      </div>
    </div>
  );
}

export default InvesmentPage;
