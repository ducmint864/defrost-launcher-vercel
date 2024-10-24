"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from "react";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { DBProject } from "@/interfaces/interface";
import { format } from "date-fns";
import { useChain } from "@thirdweb-dev/react";
import { chainConfig } from "@/config";
import { ethers } from "ethers";
import { ProjectPoolABI, ProjectPoolFactoryABI } from "@/abi";

// const tokenSaleData = [
//   {
//     id: 1,
//     title: "Token exchange rate",
//     key: "tokenExchangeRate", // Kết nối với trường 'tokenExchangeRate'
//   },
//   {
//     id: 2,
//     title: "Sale Start Time",
//     key: "startDate", // Kết nối với trường 'startDate'
//   },
//   {
//     id: 3,
//     title: "Sale End Time",
//     key: "endDate", // Kết nối với trường 'endDate'
//   },
//   // {
//   //   id: 4,
//   //   title: "Amount token release",
//   //   key: "amountTokenRelease", // Kết nối với trường 'amountTokenRelease'
//   // },
//   {
//     id: 4,
//     title: "Softcap",
//     key: "softcap", // Kết nối với trường 'softcap'
//   },
//   {
//     id: 5,
//     title: "Hardcap",
//     key: "hardcap", // Kết nối với trường 'hardcap'
//   },
//   {
//     id: 6,
//     title: "Minimum investment",
//     key: "minInvestment", // Kết nối với trường 'minInvestment'
//   },
//   {
//     id: 7,
//     title: "Maximum investment",
//     key: "maxInvestment", // Kết nối với trường 'maxInvestment'
//   },
// ];

const ProjectDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Key>("description");
  const [projectDetails, setProjectDetails] = useState<DBProject[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [factoryAddress, setFactoryAddress] = useState<string | undefined>(
    undefined
  );
  const [factoryContract, setFactoryContract] = useState<ethers.Contract>();
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [softCap, setSoftCap] = useState<number>(0);
  const [hardCap, setHardCap] = useState<number>(0);
  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(0);

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
      console.log("Pool address: " + poolAddress);


      const code = await provider.getCode(poolAddress);
      if (code === "0x") {
        console.error("Contract not found at address:", poolAddress);
        return;
      }
      console.log("Code: " + code);


      const contract = new ethers.Contract(
        poolAddress,
        ProjectPoolABI,
        provider
      );
      console.log("Contract: " + contract);

      const tokenPrice = await contract!.getPricePerToken(); //chua co
      console.log(tokenPrice);

      const softcap = await contract!.getProjectSoftCapAmount();
      const hardcap = await contract!.getHardCapAmount();
      const minInvestment = await contract!.getProjectMinInvest();
      const maxInvestment = await contract!.getProjectMaxInvest();

      setTokenPrice(tokenPrice);
      setSoftCap(softcap);
      setHardCap(hardcap);
      setMinInvestment(minInvestment);
      setMaxInvestment(maxInvestment);
    };
    fetchProjectDetails();
  }, [pageParam, factoryContract, route]);

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

  // const handleSubmit = async () => {
  //   console.log(combinedData);
  //   console.log(combinedData.generalDetailData[0]);
  //   console.log(combinedData.generalDetailData.selectedCoin);
  //   console.log(combinedData.promotionData[2]);

  //   const response = await axios.post("/api/addProject", combinedData);
  //   if (response.data.success) {
  //     route.push("/myProject");
  //   }
  // };

  return (
    <div className="flex justify-center items-center bg-primary min-h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-[800px] bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/4d/79/b4/4d79b4275d26861880c4dea267ecbfd2.jpg')`,
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

                <Button className="bg-neutral hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-auto w-full">
                  Whitelist
                </Button>
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
                        <td className="p-4 text-right">{tokenPrice}</td>
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
                        <td className="p-4 text-right">{softCap}</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">Hardcap</td>
                        <td className="p-4 text-right">{hardCap}</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">
                          Minimum investment
                        </td>
                        <td className="p-4 text-right">{minInvestment}</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#aeaeae]">
                          Maximum investment
                        </td>
                        <td className="p-4 text-right">{maxInvestment}</td>
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
      ))}
    </div>
  );
};

export default ProjectDetailPage;
