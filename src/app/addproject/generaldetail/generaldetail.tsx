"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { Button } from "@nextui-org/react";

const GeneralDetail = () => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSelectCoin = (coin: string) => {
    setSelectedCoin(coin);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }
    setSelectedImages(files.map((file) => URL.createObjectURL(file)));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-primary">
      <div className="w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          Choose Token
        </div>
        <div className="border border-black rounded-2xl h-auto mb-12 bg-white p-4">
          <div className="ml-10 w-full">
            <div className="mb-6 text-xl text-black">Coin accepted</div>
          </div>

          <div className="flex items-center ml-10 space-x-7">
            <div
              onClick={() => handleSelectCoin("BNB")}
              className={`flex items-center cursor-pointer transition ease-in-out duration-300 ${
                selectedCoin === "BNB" ? "brightness-100" : "brightness-50"
              } hover:brightness-75`}
            >
              <Image
                src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
                alt="BNB Logo"
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="text-black text-lg">BNB</span>
            </div>

            <div
              onClick={() => handleSelectCoin("ETH")}
              className={`flex items-center cursor-pointer transition ease-in-out duration-300 ${
                selectedCoin === "ETH" ? "brightness-100" : "brightness-50"
              } hover:brightness-75`}
            >
              <Image
                src="https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png"
                alt="ETH Logo"
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="text-black text-lg">ETH</span>
            </div>

            <div
              onClick={() => handleSelectCoin("USDT")}
              className={`flex items-center cursor-pointer transition ease-in-out duration-300 ${
                selectedCoin === "USDT" ? "brightness-100" : "brightness-50"
              } hover:brightness-75`}
            >
              <Image
                src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                alt="USDT Logo"
                width={24}
                height={24}
                className="mr-2 rounded-full"
              />
              <span className="text-black text-lg">USDT</span>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          General Detail
        </div>

        <div className="border border-black rounded-2xl h-auto mb-12 bg-white p-4 ">
          <div className="flex items-center">
            <label className="cursor-pointer flex items-center space-x-2">
              <CiImageOn className="w-8 h-8" />
              {selectedImages.length > 0 ? (
                <span></span>
              ) : (
                <span className="text-gray-500">Upload your image</span>
              )}
            </label>

            <div className="flex space-x-2">
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="w-20 h-10"
                  width={40}
                  height={40}
                />
              ))}
            </div>

            <Button
              className="bg-primary text-white py-2 px-4 rounded-full ml-auto"
              onClick={triggerFileInput}
            >
              Upload
            </Button>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <hr className="border border-black w-full my-5"></hr>
          <div className="my-6 w-full flex flex-col space-y-4">
            <input
              type="text"
              className="border border-black rounded-2xl h-12 text-lg pl-5 w-full"
              placeholder="Project Title"
            />
            <input
              type="text"
              className="border border-black rounded-2xl h-12 text-lg pl-5 w-full"
              placeholder="Short Description"
            />
            <textarea
              className="border border-black rounded-2xl  h-[200px] text-lg pl-5 w-full resize-y textarea "
              placeholder="Long Description"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="mt-5 bg-black text-white w-full mx-auto p-3 text-lg rounded-2xl mb-10"
            type="submit"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;
