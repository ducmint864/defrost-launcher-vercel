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
import { ProjectStatus } from "@/interfaces/interface";
import { format } from "date-fns";
import { Signer, ethers } from "ethers";
import { chainConfig } from "@/config";
import { IERC20ABI, ProjectPoolABI, ProjectPoolFactoryABI } from "@/abi";
import { Provider } from "react-redux";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage";
import { MdOutlineCurtainsClosed } from "react-icons/md";
import { getProjectPoolContract } from "@/utils/contracts";

function MyProjectPage() {
  const [showMoreEnded, setShowMoreEnded] = useState<boolean>(false);
  const [showMorePending, setShowMorePending] = useState<boolean>(false);
  const [availableProjects, setAvailableProjects] = useState<DBProject[]>([]);
  const [endedProjects, setEndedProjects] = useState<DBProject[]>([]);
  const [pendingProjects, setPendingProjects] = useState<DBProject[]>([]);
  const [factoryContract, setFactoryContract] = useState<ethers.Contract>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isCallingContract, setIsCallingContract] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const projectOwnerAddress = useAddress();
  const chain = useChain();
  const userAddress = useAddress();

  /**
   * @dev these states are for TopUpModal
   */
  // const [projectName, setProjectName] = useState<string>("");
  // const [topUpAmount, setTopUpAmount] = useState<string>("0");

  // debug-only
  useEffect(() => {
    console.log(`Project owner address is: ${projectOwnerAddress}`);
    console.log(`User address is: ${userAddress}`);
  }, [projectOwnerAddress, userAddress]);

  useEffect(() => {
    if (!chain) {
      console.log(`chain is ${chain}`);
      return;
    }

    console.log(`chain is ${chain}`);

    const address: string =
      chainConfig[chain.chainId.toString() as keyof typeof chainConfig]
        ?.contracts?.ProjectPoolFactory?.address;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      address,
      ProjectPoolFactoryABI,
      provider
    );
    setFactoryContract(factoryContract);
  }, [chain]);

  useEffect(() => {
    console.log(`factory contract is ${factoryContract}`);
    if (!factoryContract) {
      return;
    }
    console.log(`project owner address is ${projectOwnerAddress}`);
    if (!projectOwnerAddress) {
      return;
    }

    const fetchProjects = async () => {
      if (!window.ethereum) {
        console.log(`User hasn't connected their wallet`);
        return;
      }

      try {
        setIsFetching(true);
        const response = await axios.post("/api/myProject", { projectOwnerAddress });
        const projects: DBProject[] = response.data.projectsInfo;
        console.log(projects);

        // Dùng for...of để xử lý tuần tự
        console.log("projects len:" + projects.length);
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        for (const project of projects) {
          console.trace(`fetching info for project ${project.projectID}`);
          const poolAddress = await factoryContract!.getProjectPoolAddress(
            project.projectID
          );
          console.trace(`pool address of project is: ${poolAddress}`);
          const contract = new ethers.Contract(
            poolAddress,
            ProjectPoolABI,
            provider
          );
          console.trace("initialized pool contract object");
          const raisedAmount = await contract.getProjectRaisedAmount();
          console.trace(`got project raised amount: ${raisedAmount}`);
          const isProjectSoftCapReached = await contract.getProjectSoftCapReached();
          console.trace(`has project reached softcap?: ${isProjectSoftCapReached}`);
          const isProjectFullyToppedUp = await contract.isProjectFullyToppedUp();
          console.trace(`has project been fully topped up: ${isProjectFullyToppedUp}`);
          project.raisedAmount = raisedAmount;
          project.isProjectSoftcapReached = isProjectSoftCapReached;
          project.isProjectFullyToppedUp = isProjectFullyToppedUp;
        }

        const ended = projects.filter(
          (project: DBProject) => project.status === "ended"
        );
        const pending = projects.filter(
          (project: DBProject) => project.status === "pending"
        );
        console.debug(`ended project len: ${ended.length}`);
        console.debug(`pending project len: ${pending.length}`);
        console.debug(`project len: ${projects.length}`);

        setEndedProjects(ended);
        setPendingProjects(pending);
        setIsFetching(false);
        console.debug(`endedProjects is: ${endedProjects}`)
        console.debug(`pendingProjects is: ${pendingProjects}`)
        console.trace("setEndedProjects() and setPendingProjects()");
      } catch (error) {
        console.error("Error fetching projects:\n", error);
      }
    };

    fetchProjects();
  }, [projectOwnerAddress, factoryContract]);

  const handleTopUp = async (e: any, project: DBProject) => {
    e.preventDefault();

    setIsCallingContract(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const poolAddr = await factoryContract!.getProjectPoolAddress(project.projectID);
    const poolContract = new ethers.Contract(
      poolAddr,
      ProjectPoolABI,
      provider
    );
    console.trace(`got poolAddr: ${poolAddr}`);

    const projectTokenAddr = await poolContract.getProjectTokenAddress();
    const topUpAmount = await poolContract.getAmountToTopUp();
    console.trace(`got top up amount from contract: ${topUpAmount}`);

    const signer = provider.getSigner()
    console.trace(`metamask provided signer with address ${await signer.getAddress()}`);
    const projectTokenContract = new ethers.Contract(
      projectTokenAddr,
      IERC20ABI,
      signer
    );
    console.trace("init projectTokenContract obj");

    try {
      const txRec = await projectTokenContract.transfer(poolAddr, BigInt(topUpAmount));
      console.trace(`ERC20 transfer() finished with receipt: ${txRec}`);

      setToastVisible(true);
      await new Promise(resolve => {
        setTimeout(resolve, 2500);
      })
      setToastVisible(false);

      let updatedProject = pendingProjects.find(p => p.projectID === project.projectID);
      updatedProject!.isProjectFullyToppedUp = true;
    } catch (err) {
      console.error(`error when calling ERC20.transfer():\n${err}`);
    } finally {
      setIsCallingContract(false);
    }
  }


  const displayedEndedProjects = showMoreEnded
    ? endedProjects
    : endedProjects.slice(0, 3);
  const displayedPendingProjects = showMorePending
    ? pendingProjects
    : pendingProjects.slice(0, 3);

  return (
    <div className="relative flex flex-col justify-start items-start min-h-screen bg-primary px-14">
      {/* Top Up modal (hidden on page load) */}
      {/* <dialog id="TopUpModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h2 className="font-bold text-lg">Top Up project</h2>
          <table className="p-4 mx-auto my-auto">
            <tr>
              <td className="font-bold">Project name</td>
              <td className="">{projectName}</td>
            </tr>
            <tr>
              <td className="font-bold">Top Up amount</td>
              <td className="">{topUpAmount}</td>
            </tr>
          </table>
          <p className="py-4"></p>
          <button className="text-white bg-gradient-to-r from-bg-accent to-bg-primary">Continue</button>
        </div>
      </dialog> */}

      <div className="mt-20 mb-6 text-2xl font-bold text-white">
        Ended Project {isFetching
          ? <span className="loading loading-spinner display-block ml-3 loading-xs text-white mx-auto my-auto"></span>
          : ""}
      </div>
      {displayedEndedProjects.map((project) => (
        <div
          key={project.id}
          className="w-full bg-secondary rounded-lg shadow-lg p-4 text-white flex items-center mt-5"
        >
          <div className="flex items-center flex-grow space-x-4 p-3">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
              <img
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

            <div className="flex space-x-20 p-5">
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
                <p className="font-semibold">Raised amount</p>
                <p>{project.raisedAmount!.toString()}</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            {project.isProjectSoftcapReached === true
              ? <button className="mr-4 rounded-lg btn btn-success">
                Withdraw fund
              </button>
              : <button className="mr-4 rounded-lg btn btn-ghost">
                Refund
              </button>
            }
          </div>
        </div>
      ))
      }

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
        Pending Project {isFetching
          ? <span className="loading loading-spinner loading-xs ml-3 text-white display-block mx-auto my-auto"></span>
          : ""}
      </div>
      {displayedPendingProjects.map((project) => (
        <div
          key={project.id}
          className="w-full bg-secondary rounded-lg shadow-lg p-4 text-white flex items-center mt-5"
        >
          <div className="flex items-center flex-grow space-x-4 p-3">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
              <img
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

            <div className="flex space-x-20 p-5">
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
                <p className="font-semibold">Raised amount</p>
                <p>{project.raisedAmount!.toString()}</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            {project.isProjectFullyToppedUp !== true
              ? <button
                className="btn btn-outline rounded-lg mr-4 text-white"
                onClick={(e) => handleTopUp(e, project)}
              >
                Top Up {
                  isCallingContract
                    ? <span className="loading loading-spinner display-block ml-3 loading-xs text-white mx-auto my-auto"></span>
                    : <></>
                }
              </button>
              : <></>
            }
          </div>
        </div>
      ))
      }

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

      {/* hidden alert */}
      <div className="toast toast-end">
        <div id="txSuccessAlert" className={`alert alert-success ${toastVisible ? "" : "hidden"} `}>
          <span>Transaction sent successful</span>
        </div>
      </div>
    </div >
  );
}

export default MyProjectPage;
