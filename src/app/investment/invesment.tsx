"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import axios from "axios";
import {
  useAddress,
  useChain,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { DBProject } from "@/interfaces/interface";
import { ProjectStatus } from "@prisma/client";
import { format } from "date-fns";
import getMyProjectInfo from "@/utils/getMyProjectInfo";
import { getProjectPoolContract } from "@/utils/contracts";
import { ethers } from "ethers";
import { chainConfig } from "@/config";
import { ProjectPoolABI, ProjectPoolFactoryABI } from "@/abi";
import { Provider } from "react-redux";

function InvesmentPage() {
  const [showMoreEnded, setShowMoreEnded] = useState<boolean>(false);
  const [showMorePending, setShowMorePending] = useState<boolean>(false);
  const [availableProjects, setAvailableProjects] = useState<DBProject[]>([]);
  const [endedProjects, setEndedProjects] = useState<DBProject[]>([]);
  const [pendingProjects, setPendingProjects] = useState<DBProject[]>([]);
  const [factoryAddress, setFactoryAddress] = useState<string | undefined>(
    undefined
  );
  const [factoryContract, setFactoryContract] = useState<ethers.Contract>();
  const userAddress = useAddress();
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
    const fetchProjects = async () => {
      try {
        const response = await axios.post("/api/myProject", {
          address: userAddress,
        });
        const projects: DBProject[] = response.data.projectsInfo;
        console.log(projects);
        const projectsWithDetails = [];

        // Dùng for...of để xử lý tuần tự
        console.log("len:" + projects.length);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        for (let i = 0; i < projects.length; i++) {
          let project = projects[i];
          const poolAddress = await factoryContract!.getProjectPoolAddress(
            project.projectID
          );
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            poolAddress,
            ProjectPoolABI,
            provider
          );
          const raisedAmount = await contract.getProjectRaisedAmount();
          const isProjectSoftCapReached =
            await contract.getProjectSoftCapReached();
          projectsWithDetails.push(
            Object.assign(project, {
              raisedAmount,
              isProjectSoftCapReached,
            })
          );
        }

        const ended = projectsWithDetails.filter(
          (project: DBProject) => project.status === ProjectStatus.ended
        );
        const pending = projectsWithDetails.filter(
          (project: DBProject) => project.status === ProjectStatus.pending
        );

        setEndedProjects(ended);
        setPendingProjects(pending);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    if (userAddress) {
      fetchProjects();
    }
  }, [userAddress, factoryContract]);

  const handleRedeem = async (e: any, project: DBProject) => {
    e.preventDefault();
  }

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
              <div className="text-center">
                <p className="font-semibold">Amount</p>
                <p>{project.raisedAmount?.toString()}</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button
              className="bg-neutral text-white px-4 py-2 rounded-full transition duration-300 hover:shadow-lg hover:bg-opacity-80"
              onClick={(e) => handleRedeem(e, proeject)}
            >
              Redeem token
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
              <div className="text-center">
                <p className="font-semibold">Amount</p>
                <p>{project.raisedAmount?.toString()}</p>
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
