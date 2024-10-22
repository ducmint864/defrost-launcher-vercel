"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import getMyProjectInfo from "@/utils/getMyProjectInfo";
import { Status } from "@/interfaces/interface";
import { format } from "date-fns";

function MyProjectPage() {
  const [showMoreEnded, setShowMoreEnded] = useState(false);
  const [showMorePending, setShowMorePending] = useState(false);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState<any[]>([]);
  const [pendingProjects, setPendingProjects] = useState<any[]>([]);
  const projectOwnerAddress = useAddress();
  console.log("projectOwnerAddress: " + projectOwnerAddress);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post("/api/myProject", {
          address: projectOwnerAddress,
        });

        const projects = response.data.projectsInfo;

        const endedProjects = projects.filter(
          (project) => project.status === "ended"
        );
        const pendingProjects = projects.filter(
          (project) => project.status === "pending"
        );

        setEndedProjects(endedProjects);
        setPendingProjects(pendingProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [projectOwnerAddress]);

  // const displayedEndedProjects = showMoreEnded
  //   ? projects.filter((project) => project.status === 1)
  //   : projects.filter((project) => project.status === 1).slice(0, 3);

  // const displayedPendingProjects = showMorePending
  //   ? projects.filter((project) => project.status === 0)
  //   : projects.filter((project) => project.status === 0).slice(0, 3);

  const displayedEndedProjects = showMoreEnded
    ? endedProjects
    : endedProjects.slice(0, 3);
  const displayedPendingProjects = showMorePending
    ? pendingProjects
    : pendingProjects.slice(0, 3);
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
                src={project.projectLogoImageUrl[0]}
                alt={project.projectTitle}
                width={52}
                height={52}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="w-48">
              <h3 className="text-xl font-bold">{project.projectTitle}</h3>{" "}
              <p className="text-sm">{project.shortDescription}</p>{" "}
            </div>

            <div className="flex space-x-7 p-5">
              <div className="text-center">
                <p className="font-semibold">End Date</p>
                <p>
                  {format(new Date(project.endDate), "dd/MM/yyyy HH:mm:ss")}
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Start Date</p>
                <p>
                  {format(new Date(project.startDate), "dd/MM/yyyy HH:mm:ss")}
                </p>
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
                src={project.projectLogoImageUrl[0]}
                alt={project.projectTitle}
                width={52}
                height={52}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="w-48">
              <h3 className="text-xl font-bold">{project.projectTitle}</h3>
              <p className="text-sm">{project.shortDescription}</p>
            </div>

            <div className="flex space-x-7 p-5">
              <div className="text-center">
                <p className="font-semibold">End Date</p>
                <p>
                  {format(new Date(project.endDate), "dd/MM/yyyy HH:mm:ss")}
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Start Date</p>
                <p>
                  {format(new Date(project.startDate), "dd/MM/yyyy HH:mm:ss")}
                </p>
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

export default MyProjectPage;
