"use client";
import { useState } from "react";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from "react";
import { Button } from "@nextui-org/react";

const tokenSaleData = [
  {
    id: 1,
    title: "Sale Price",
    value: "...",
  },
  {
    id: 2,
    title: "Sale Start Time",
    value: "01/09/2024",
  },
  {
    id: 3,
    title: "Sale End Time",
    value: "25/10/2024",
  },
  {
    id: 4,
    title: "Token Distribution Time",
    value: "...",
  },
  {
    id: 5,
    title: "Initial Market Cap",
    value: "...",
  },
  {
    id: 6,
    title: "Initial Token Circulation",
    value: "...",
  },
];

const ProjectDetailPage = () => {
  const images = [
    "https://i.pinimg.com/736x/4d/79/b4/4d79b4275d26861880c4dea267ecbfd2.jpg",
    "https://i.pinimg.com/736x/97/15/32/9715323da02c77d79ecbff770259eca2.jpg",
    "https://i.pinimg.com/564x/a8/80/1b/a8801b321787785447f5a50d55b7a88d.jpg",
    "https://i.pinimg.com/736x/fe/96/98/fe969833b4ba05c590bb6c01a0a19c96.jpg",
    "https://i.pinimg.com/736x/76/ec/16/76ec1693791a33594059d478ae9206f7.jpg",
    "https://c4.wallpaperflare.com/wallpaper/103/5/162/anime-anime-boys-jujutsu-kaisen-satoru-gojo-hd-wallpaper-preview.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Key>("description");

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

  return (
    <div className="flex justify-center items-center bg-primary min-h-screen relative">
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
            <Image
              src="https://i.pinimg.com/enabled_lo/564x/bb/2f/52/bb2f52ab166107088ef7153de6c5588a.jpg"
              alt="Profile Icon"
              width={52}
              height={52}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Project Title</h1>
            <p className="text-lg text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
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
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className={`cursor-pointer rounded-lg ${
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
                Project Subtitle
              </p>
              <p className="text-gray-400 mt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has
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
              <p className=" mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
              <p className=" mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
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
                    {tokenSaleData.map((data) => (
                      <tr key={data.id}>
                        <td className="p-4 text-[#aeaeae]">{data.title}</td>
                        <td className="p-4 text-right">{data.value}</td>
                      </tr>
                    ))}
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
              src={images[currentImage]}
              alt="Fullscreen Image"
              width={1200}
              height={800}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
