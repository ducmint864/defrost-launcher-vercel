"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../public/images/bg1.jpg";
import image2 from "../../../public/images/bg2.jpg";
import image3 from "../../../public/images/bg3.jpg";
import image4 from "../../../public/images/bg4.jpg";
import Image from "next/image";
const projectsData = [
  {
    id: 1,
    title: "Earn'M",
    description: "Transforming the Smartphone into the EarnPhone",
    fundraiseGoal: "$TBA",
    maxAllocation: "$TBA",
    image: image1, // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: 2,
    title: "Kima Network",
    description: "Uniting Web2 & Web3.",
    fundraiseGoal: "$250,000",
    maxAllocation: "$TBA",
    image: image2,
  },
  {
    id: 3,
    title: "Lympid",
    description: "The Finest RWA Assets on the Blockchain",
    fundraiseGoal: "$TBA",
    maxAllocation: "$TBA",
    image: image3,
  },
  {
    id: 4,
    title: "New Project 1",
    description: "Description of New Project 1",
    fundraiseGoal: "$500,000",
    maxAllocation: "$TBA",
    image: image4,
  },
];

const tableData = [
  {
    id: 1,
    title: "NOTAI",
    description: "PRIVATE SALE",
    participants: 478,
    raisedFund: "$250,000",
    endDate: "September 4th 2024",
  },
  {
    id: 2,
    title: "SCOOKIE",
    description: "TOKEN SALE",
    participants: 1677,
    raisedFund: "$400,000",
    endDate: "June 12th 2024",
  },
  {
    id: 3,
    title: "Arrow Markets",
    description: "TOKEN SALE",
    participants: 1115,
    raisedFund: "$250,000",
    endDate: "May 21st 2024",
  },
  {
    id: 4,
    title: "New Project 1",
    description: "PRIVATE SALE",
    participants: 478,
    raisedFund: "$250,000",
    endDate: "September 4th 2024",
  },
  {
    id: 5,
    title: "SCOOKIE",
    description: "TOKEN SALE",
    participants: 1677,
    raisedFund: "$400,000",
    endDate: "June 12th 2024",
  },
  {
    id: 6,
    title: "Arrow Markets",
    description: "TOKEN SALE",
    participants: 1115,
    raisedFund: "$250,000",
    endDate: "May 21st 2024",
  },
];

function LaunchpadPage() {
  // Cấu hình cho slider
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

  return (
    <div className="flex justify-center min-h-screen  bg-[#02121D]">
      <div className="p-5 font-sans w-200 max-w-4xl">
        {/* Upcoming Project Section */}
        <div className="mb-10 mt-5">
          <span className="text-lg text-[#28DBD1]">IDO Project</span>
          <div className="flex items-center justify-between mb-4 mt-5">
            <h2 className="text-3xl font-bold text-white">Upcoming IDO</h2>{" "}
            {/* Tăng kích thước chữ */}
            <button className="bg-[#28DBD1] py-1 px-4 rounded-lg hover:bg-[#162f2d] text-[#02121D] hover:text-[#fefefe]">
              Add Project
            </button>
          </div>

          {/* Slider*/}
          <Slider {...settings}>
            {projectsData.map((project) => (
              <div key={project.id} className="w-full p-2">
                <div className="h-96 rounded-lg bg-[#0A1F2F] p-4 text-white flex flex-col justify-between transition-transform transform hover:-translate-y-2 duration-300">
                  <div>
                    {/* Thêm hình ảnh ở đây */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="mt-4">
                      Fundraise Goal:{" "}
                      <span className="font-bold">{project.fundraiseGoal}</span>
                    </p>
                    <p>
                      Max allocation:{" "}
                      <span className="font-bold">{project.maxAllocation}</span>
                    </p>
                  </div>
                  <button className="mt-4 bg-[#28DBD1] text-[#02121D] py-2 px-4 rounded-lg">
                    TOKEN SALE
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Funded Projects Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-white">Funded Projects: </h2>
            <div className="flex justify-between flex-1">
              <div className="bg-gradient-to-r from-[#153E52] to-[#0A0B0D] via-[#0A0B0D] border border-[#25607E] p-4 rounded-lg flex-1 mx-2 text-right">
                <span className="text-[#2DACDC]">Funded Projects: </span>
                <span className="font-bold text-white">113</span>
              </div>
              <div className="bg-gradient-to-r from-[#555B3D] to-[#0A0B0D] via-[#0A0B0D] border border-[#737D37] p-4 rounded-lg flex-1 mx-2 text-right">
                <span className="text-[#8c955c]">Unique Participants: </span>
                <span className="font-bold text-white">30,294</span>
              </div>
              <div className="bg-gradient-to-r from-[#754b4b] to-[#0A0B0D] via-[#0A0B0D] border border-[#745734] p-4 rounded-lg flex-1 mx-2 text-right">
                <span className="text-[#c97f7f]">Raised Capital: </span>
                <span className="font-bold text-white">$41,582,502.04</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className=" rounded-[15px] bg-[#18181B]">
          <table className="w-full border-collapse rounded-[15px] text-white">
            <thead>
              <tr className="bg-[#27272A] text-left text-sm text-[#aeaeae]">
                <th className="p-4 rounded-tl-[15px]">Project Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Participants</th>
                <th className="p-4">Raised Fund</th>
                <th className="p-4 rounded-tr-[15px]">End Date</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((project) => (
                <tr
                  key={project.id}
                  className="hover:border-2 hover:border-[#28DBD1]"
                >
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.description}</td>
                  <td className="p-4">{project.participants}</td>
                  <td className="p-4">{project.raisedFund}</td>
                  <td className="p-4">{project.endDate}</td>
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
