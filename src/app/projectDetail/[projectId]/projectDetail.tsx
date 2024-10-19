"use client";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from "react";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

const tokenSaleData = [
  {
    id: 1,
    title: "Token exchange rate",
    key: "tokenExchangeRate", // Kết nối với trường 'tokenExchangeRate'
  },
  {
    id: 2,
    title: "Sale Start Time",
    key: "startDate", // Kết nối với trường 'startDate'
  },
  {
    id: 3,
    title: "Sale End Time",
    key: "endDate", // Kết nối với trường 'endDate'
  },
  {
    id: 4,
    title: "Amount token release",
    key: "amountTokenRelease", // Kết nối với trường 'amountTokenRelease'
  },
  {
    id: 5,
    title: "Softcap",
    key: "softcap", // Kết nối với trường 'softcap'
  },
  {
    id: 6,
    title: "Hardcap",
    key: "hardcap", // Kết nối với trường 'hardcap'
  },
  {
    id: 7,
    title: "Minimum investment",
    key: "minInvestment", // Kết nối với trường 'minInvestment'
  },
  {
    id: 8,
    title: "Maximum investment",
    key: "maxInvestment", // Kết nối với trường 'maxInvestment'
  },
];

const ProjectDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Key>("description");
  const formDataVerifyToken = useSelector((state: any) => {
    console.log(state);
    return state.form.verifyTokenData;
  });
  const formDataGeneralDetail = useSelector(
    (state: any) => state.form.generalDetailData
  );
  const formDataPromotion = useSelector(
    (state: any) => state.form.promotionData
  );
  const route = useRouter();
  const combinedData = {
    verifyTokenData: formDataVerifyToken,
    generalDetailData: formDataGeneralDetail,
    promotionData: formDataPromotion,
  };
  const images = combinedData.generalDetailData[1];
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

  const handleSubmit = async () => {
    console.log(combinedData);
    console.log(combinedData.generalDetailData[0]);
    console.log(combinedData.generalDetailData.selectedCoin);
    console.log(combinedData.promotionData[2]);

    const response = await axios.post("/api/addProject", combinedData);
    if (response.data.success) {
      route.push("/myProject");
    }
  };

  return (
    <div className="flex justify-center items-center bg-primary min-h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-[800px] bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/4d/79/b4/4d79b4275d26861880c4dea267ecbfd2.jpg')`,
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-primary opacity-70"></div>

      <div className="relative w-full lg:w-3/5 flex flex-col text-white mt-28">
        <div className="flex items-center text-left mb-8">
          <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
            <img
              src={combinedData.generalDetailData[2]}
              alt="Profile Icon"
              width={52}
              height={52}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              {combinedData.generalDetailData[3]}
            </h1>
            <p className="text-lg text-gray-400">
              {combinedData.generalDetailData[4]}
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
                  className={`cursor-pointer rounded-lg object-cover ${
                    currentImage === index ? "ring-4 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col justify-start pt-6 pb-6">
            <div className="rounded-lg bg-secondary w-full h-72 p-5 flex flex-col">
              <p className="text-xl font-semibold text-white">Fundraise Goal</p>
              <p className="text-3xl font-bold text-white mt-2">
                {combinedData.generalDetailData[3]}
              </p>
              <p className="text-gray-400 mt-8">
                {combinedData.generalDetailData[4]}
              </p>

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
                  className={`${
                    activeTab === "description"
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
                  className={`${
                    activeTab === "tokensale"
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
              <p className=" mt-2">{combinedData.generalDetailData[5]}</p>
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
                    {tokenSaleData.map((data) => {
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
                    })}
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
        <Button
          className="mt-2 mb-8 bg-neutral text-[#ffffff] py-2 px-4 rounded-full"
          onClick={handleSubmit}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
