"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { DBProject } from "@/interfaces/interface";
import { format } from "date-fns";
import {
  useChain,
  useAddress,
} from "@thirdweb-dev/react";
import { chainConfig } from "@/config";
import { ethers } from "ethers";
import { ProjectPoolABI, ProjectPoolFactoryABI } from "@/abi";
import { convertNumToOffchainFormat } from "@/utils/decimals";

const ProjectDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Key>("description");
  const [projectDetails, setProjectDetails] = useState<DBProject[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [factoryContract, setFactoryContract] = useState<ethers.Contract>();
  const [poolContract, setPoolContract] = useState<ethers.Contract | undefined>(undefined);
  const [tokenPrice, setTokenPrice] = useState<bigint>(BigInt(0));
  const [softCap, setSoftCap] = useState<bigint>(BigInt(0));
  const [hardCap, setHardCap] = useState<bigint>(BigInt(0));
  const [minInvestment, setMinInvestment] = useState<bigint>(BigInt(0));
  const [maxInvestment, setMaxInvestment] = useState<bigint>(BigInt(0));
  const [vAsssetDecimals, setVAssetDecimals] = useState<number | undefined>(undefined);
  const [userWhitelisted, setUserWhitelisted] = useState<boolean>(false);

  const route = useRouter();
  const chain = useChain();
  const userAddress = useAddress();

  useEffect(() => {
    if (!poolContract) {
      console.trace(`poolContract is not ready`);
      return;
    }

    console.trace(`chain mounted: ${chain}`);
    if (!chain) {
      console.trace("chain is not ready");
      return;
    }

    const getVAssetDecimals = async () => {
      const vAssetAddress = await poolContract.getAcceptedVAsset();
      console.trace(`vAssetAddress is: ${vAssetAddress}`);
      if (!vAssetAddress) {
        console.trace("vAssetDecimals is empty");
        return;
      }
      const chainId = (chain.chainId).toString() as keyof typeof chainConfig;
      const vAsset = chainConfig[chainId].vAssets.find(asset => asset.address === vAssetAddress);
      console.debug(`vAsset from config is : ${vAsset}`);
      const decimals = vAsset?.decimals;
      console.debug(`decimals is ${decimals}`);
      setVAssetDecimals(decimals);
      console.trace("call setVAssetDecimals()");
    }

    getVAssetDecimals();

  }, [poolContract, chain]);

  /**
   * @dev check if user has invested in project on poolContract mount
   */
  useEffect(() => {
    console.trace(`fetching user's whitelist status`);

    const checkUserWhitelisted = async () => {
      if (!poolContract) {
        console.trace("nevermind, poolContract is not ready");
        return;
      }
      const isWhitelisted: boolean = await poolContract.isWhitelisted();
      console.debug(`is user whitelisted? : ${isWhitelisted}`);
      setUserWhitelisted(isWhitelisted);
      console.trace(`call setUserWhitelisted()`);
    }

    checkUserWhitelisted();
  }, [poolContract]);

  useEffect(() => {
    if (!chain) {
      return;
    }
    const address: string =
      chainConfig[chain.chainId.toString() as keyof typeof chainConfig]
        ?.contracts?.ProjectPoolFactory?.address;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("Provider: " + provider);
    const factoryContract = new ethers.Contract(
      address,
      ProjectPoolFactoryABI,
      provider
    );

    setFactoryContract(factoryContract);
  }, [chain]);

  const pageParam = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      console.log(pageParam);
      const { projectId } = pageParam;
      console.log(projectId);
      const response = await axios.post("/api/projectDetail", projectId);
      console.log("Respnse data: " + response.data);
      const projectDetail = response.data.projectDetailsData;
      if (projectDetail) {
        const images = projectDetail[0].projectImageUrls;
        setImages(images);
        console.log("This is image" + images);

        console.log(projectDetail);
        setProjectDetails(projectDetail);
      } else {
        route.push("/404");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const projectDetailId = BigInt(projectDetail[0].projectID);
      console.log("Project detail id: " + projectDetailId);
      console.log("Factory contract: " + factoryContract);
      if (!factoryContract) {
        console.log("Factory contract is not ready");
        return;
      }
      const poolAddress = await factoryContract!.getProjectPoolAddress(
        projectDetailId
      );
      console.log("Got pool address: " + poolAddress);

      const code = await provider.getCode(poolAddress);
      if (code === "0x") {
        console.error("Contract not found at address:", poolAddress);
        return;
      }
      console.log("Code: " + code);

      const poolContract = new ethers.Contract(
        poolAddress,
        ProjectPoolABI,
        provider
      );

      console.log("Got pool contract: " + poolContract);

      const tokenPrice = await poolContract!.getPricePerToken(); //chua co
      console.log(`tokenPrice is: ${tokenPrice}`);

      const softcap = await poolContract!.getProjectSoftCapAmount();
      const hardcap = await poolContract!.getProjectHardCapAmount();
      const minInvestment = await poolContract!.getProjectMinInvest();
      const maxInvestment = await poolContract!.getProjectMaxInvest();

      console.log(`softCap is: ${softCap}`);
      console.log(`hardCap is: ${hardCap}`);
      console.log(`minInvestment is: ${minInvestment}`);
      console.log(`maxInvestment is: ${maxInvestment}`);

      setTokenPrice(BigInt(tokenPrice));
      setSoftCap(BigInt(softcap));
      setHardCap(BigInt(hardcap));
      setMinInvestment(BigInt(minInvestment));
      setMaxInvestment(BigInt(maxInvestment));
      console.trace(`setPoolContract to ${poolContract}`);
      setPoolContract(poolContract);
      console.trace("set vars complete");
    };

    fetchProjectDetails();
  }, [factoryContract]);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const [isFullscreen, setIsFullscreen] = useState(false); // Trạng thái full màn hình

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleWhitelist = async (e?: any) => {
    if (e) {
      e?.preventDefault();
    }

    const { projectId } = pageParam;
    if (!projectId) {
      console.trace(`projectId when switching page is empty`);
      return;
    }
    console.debug(`project id is ${projectId}`);
    route.push(`/whitelist/${projectId}`);
  }

  return (
    <div className="flex justify-center items-center bg-primary min-h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-[800px] bg-cover bg-center blur-md"
        style={{
          // backgroundImage: `url('https://i.pinimg.com/736x/4d/79/b4/4d79b4275d26861880c4dea267ecbfd2.jpg')`,

        backgroundImage: `url('https://www.hdwallpapers.in/download/dragon_dark_blue_background_4k_hd_horizon_forbidden_west-3840x2160.jpg')`,
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-primary opacity-70"></div>

      {projectDetails.map((project) => (
        <div
          className="relative w-full lg:w-3/5 flex flex-col text-white mt-28"
          key={project.id}
        >
          <div className="flex items-center text-left mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
              <Image
                src={project.projectLogoImageUrl[0]}
                alt="Profile Icon"
                width={52}
                height={52}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{project.projectTitle}</h1>
              <p className="text-lg text-gray-400">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden w-full lg:gap-x-8">
            <div className="lg:w-2/3 p-6 flex flex-col justify-center">
              <div className="relative mb-4 h-96" onClick={toggleFullscreen}>
                <Image
                  src={images[currentImage]}
                  alt="Main Image"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full cursor-pointer"
                />

                <Button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white text-5xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  &#8249;
                </Button>

                <Button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white text-5xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  &#8250;
                </Button>
              </div>

              <div className="flex space-x-4">
                {images.map((image: string, index: number) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className={`cursor-pointer rounded-lg object-cover ${currentImage === index ? "ring-4 ring-blue-500" : ""
                      }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col justify-start pt-6 pb-6">
              <div className="rounded-lg bg-secondary w-full h-72 p-5 flex flex-col">
                <p className="text-xl font-semibold text-white">
                  Fundraise Goal
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {project.projectTitle}
                </p>
                <p className="text-gray-400 mt-8">{project.shortDescription}</p>


                {
                  userWhitelisted === true
                    ? <button
                      className="btn btn-active btn-primary"
                      onClick={handleInvest}
                    >
                      Invest
                    </button>

                    : <button
                      className="btn btn-outline"
                      onClick={handleWhitelist}
                    >
                      Default
                    </button>
                }
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-9 border-b-2 border-gray-700">
            <Tabs
              variant="underlined"
              aria-label="Tabs variants"
              onSelectionChange={(tabKey) => setActiveTab(tabKey)}
            >
              <Tab
                key="description"
                title={
                  <span
                    className={`${activeTab === "description"
                      ? "text-white border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-300 transition-colors duration-200"
                      } pb-[11px]`}
                  >
                    Description
                  </span>
                }
              />
              <Tab
                key="tokensale"
                title={
                  <span
                    className={`${activeTab === "tokensale"
                      ? "text-white border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-300 transition-colors duration-200"
                      } pb-[11px]`}
                  >
                    Token Sale
                  </span>
                }
              />
            </Tabs>
          </div>

          <div className="p-4 mb-10">
            {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-semibold">Description Content</h2>
                <p className=" mt-2">{project.description}</p>
              </div>
            )}

            {activeTab === "tokensale" && (
              <div>
                <h2 className="text-2xl font-semibold mb-5">
                  Token Sale Content
                </h2>
                <div className="rounded-[15px] bg-[#18181B]">
                  <table className="w-full border-collapse rounded-[15px] text-white">
                    <thead>
                      <tr className="bg-[#27272A] text-left text-sm text-[#aeaeae]">
                        <th className="p-4 rounded-tl-[15px]">Token Sale</th>
                        <th className="p-4 rounded-tr-[15px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {tokenSaleData.map((data) => {
                        const value = combinedData.promotionData[data.key];
                        const formattedValue =
                          value instanceof Date
                            ? value.toLocaleDateString("en-GB")
                            : value || "...";

                        return (
                          <tr key={data.id}>
                            <td className="p-4 text-[#aeaeae]">{data.title}</td>
                            <td className="p-4 text-right">{formattedValue}</td>
                          </tr>
                        );
                      })} */}
                      <tr>
                        <td className="p-4 text-[#aeaeae]">
                          Token exchange rate
                        </td>
                        <td className="p-4 text-right">{
                          !!tokenPrice && !!vAsssetDecimals
                            ? convertNumToOffchainFormat(tokenPrice, vAsssetDecimals)
                            : "NaN"
                        }</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">Sale Start Time</td>
                        <td className="p-4 text-right">
                          {format(
                            new Date(project.startDate),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">Sale End Time</td>
                        <td className="p-4 text-right">
                          {format(
                            new Date(project.endDate),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">Softcap</td>
                        <td className="p-4 text-right">{
                          !!softCap && vAsssetDecimals
                            ? convertNumToOffchainFormat(softCap, vAsssetDecimals!)
                            : ""
                        }</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">Hardcap</td>
                        <td className="p-4 text-right">{
                          !!hardCap && !!vAsssetDecimals
                            ? convertNumToOffchainFormat(hardCap, vAsssetDecimals)
                            : "NaN"
                        }</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">
                          Minimum investment
                        </td>
                        <td className="p-4 text-right">{
                          !!minInvestment && !!vAsssetDecimals
                            ? convertNumToOffchainFormat(minInvestment, vAsssetDecimals)
                            : "NaN"
                        }</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">
                          Maximum investment
                        </td>
                        <td className="p-4 text-right">{
                          !!maxInvestment && !!vAsssetDecimals
                            ? convertNumToOffchainFormat(maxInvestment, vAsssetDecimals)
                            : "NaN"
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {isFullscreen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              onClick={toggleFullscreen}
            >
              <Image
                // src={combinedData.generalDetailData[1][1]}
                src={images[currentImage]}
                alt="Fullscreen Image"
                width={1200}
                height={800}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      ))
      }
    </div >
  );
};

export default ProjectDetailPage;
