"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { updateGeneralDetailPageData } from "@/lib/store/formSlice";
import { useRouter } from "next/navigation";
import { useChain } from "@thirdweb-dev/react";
import { chainConfig } from "@/config";

const GeneralDetail = () => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [longDescription, setLongDescription] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null); // address of the vAsset that is selected
  const [selectedCoinIdx, setSelectedCoinIdx] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRefLogo = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<string[]>([]);
  const route = useRouter();
  const dispatch = useDispatch();
  const updateData = useSelector((state: any) => {
    console.log(state);
    return state.form.generalDetailData;
  });
  const [vAssets, setVAssets] = useState<Record<string, any>[]>([]);
  const chain = useChain();

  // updat vAssets when user switch chain
  useEffect(() => {
    if (!chain) {
      return;
    }

    const chainId: number = chain.chainId;
    const vAssets = chainConfig[chainId.toString() as keyof typeof chainConfig].vAssets;
    setSelectedCoin(vAssets[0].address)
    console.debug(`selected vToken is ${vAssets[0].address}`)
    setVAssets(vAssets);
  }, [chain])

  const handleSelectCoin = (coinAddr: string, idx: number) => {
    if (!coinAddr) {
      console.error("Address of selected vAsset is empty");
      alert("Address of selected vAsset is empty");
      return;
    }
    console.log(`selected coin is ${vAssets.at(selectedCoinIdx)?.name}`)

    setSelectedCoinIdx(idx);
    setSelectedCoin(coinAddr);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }
    setSelectedImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 1) {
      alert("You can only upload up to 1 Logo");
      return;
    }
    setSelectedLogo(files.map((file) => URL.createObjectURL(file)));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerFileInputLogo = () => {
    if (fileInputRefLogo.current) {
      fileInputRefLogo.current.click();
    }
  };

  //REDUX GLOBAL STATE
  const handleSubmit = () => {
    const formDatas = {
      selectedCoin,
      selectedImages,
      selectedLogo,
      projectTitle,
      shortDescription,
      longDescription,
    };
    dispatch(updateGeneralDetailPageData(formDatas));
    console.log(updateData);
    route.push("/addProject/promotion");
  };
  return (
    <div className="flex justify-center min-h-screen bg-primary">
      <div className="w-3/5 mx-auto">
        <div className="mt-12 mb-6 text-2xl font-bold text-white">
          Choose accepted asset
        </div>
        <div className="border border-black rounded-2xl h-auto mb-12 bg-white p-2">
          <div className="flex items-center ml-3 mr-3 space-x-7 mb-4 mt-4">
            {vAssets.map((vAsset, idx) => (
              // <div
              //   onClick={() => handleSelectCoin(vAsset.address, idx)}
              //   className={`flex items-center cursor-pointer transition ease-in-out duration-300 ${selectedCoin === "BNB" ? "brightness-100" : "brightness-50"
              //     } hover:brightness-75`}
              // >
              <button
                className={`btn text-accent rounded-full ${selectedCoinIdx === idx ? "bg-gradient-to-r from-cyan-500 to-accent" : "bg-gray"}`}
                onClick={() => handleSelectCoin(vAsset.address, idx)}
              >
                <Image
                  // src={`${vAsset.icon}`}
                  src="https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png"
                  alt={`${vAsset.name} logo`}
                  width={24}
                  height={24}
                  className="mr-2 rounded-full"
                />
                <span className="text-black text-lg font-normal">{vAsset.symbol}</span>
                {/* </div> */}
              </button>
            ))}
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
              className="bg-neutral text-white py-2 px-4 rounded-full ml-auto"
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
          <div className="flex items-center">
            <label className="cursor-pointer flex items-center space-x-2">
              <CiImageOn className="w-8 h-8" />
              {selectedLogo.length > 0 ? (
                <span></span>
              ) : (
                <span className="text-gray-500">Upload your Logo image</span>
              )}
            </label>
            <div className="flex space-x-2">
              {selectedLogo.map((image, index) => (
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
              className="bg-neutral text-white py-2 px-4 rounded-full ml-auto"
              onClick={triggerFileInputLogo}
            >
              Upload
            </Button>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRefLogo}
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>

          <hr className="border border-black w-full my-5"></hr>
          <div className="my-6 w-full flex flex-col space-y-4">
            <input
              type="text"
              className="border border-black rounded-2xl h-12 text-lg pl-5 w-full"
              placeholder="Project Title"
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <input
              type="text"
              className="border border-black rounded-2xl h-12 text-lg pl-5 w-full"
              placeholder="Short Description"
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <textarea
              className="border border-black rounded-2xl  h-[200px] text-lg pl-5 w-full resize-y textarea "
              placeholder="Long Description"
              onChange={(e) => setLongDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="mt-5 bg-neutral text-white w-full mx-auto p-3 text-lg rounded-2xl mb-10"
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;
