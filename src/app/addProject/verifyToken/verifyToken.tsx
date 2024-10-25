"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateVerifyTokenPageData } from "@/lib/store/formSlice";
import { ethers } from "ethers";

// import toast from "react-hot-toast";

function VerifyToken() {
  const router = useRouter();
  const [tokenAddress, setTokenAddress] = useState("");
  const [signedMessage, setSignedMessage] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // const provider = new ethers.providers.JsonRpcProvider("localhost:8545");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (!signedMessage) {
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        `Guarantee this is your token address: ${tokenAddress}`
      );
      setSignedMessage(true);
      console.log(signature);
    }

    dispatch(updateVerifyTokenPageData(tokenAddress));

    try {
      // const response = await axios.post("/api/addProject/verifyToken", tokenAddress);
      // if (response.data.success) {
      console.log("Token Verified");
      // }
      router.push("./addProject/generalDetail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      {/* <div className="absolute left-1/2 bottom-0 w-[600px] h-[300px] bg-[#0047FF] rounded-t-full opacity-10 blur-[100px] animate-[pulse_3s_infinite] z-0 transform -translate-x-1/2"></div> */}
      <div className="  rounded-lg shadow-md text-center max-w-md w-full font-sans">
        <h2 className="text-xl font-semibold mb-4 text-white">Add Token</h2>
        <p className="text-gray-500 mb-6">
          Paste your project's token address so we can verify that you own this
        </p>
        <input
          type="text"
          placeholder="Contract Address"
          value={tokenAddress}
          className="w-full p-3 border rounded-md mb-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button
          className="w-full bg-[#0047FF] py-3 shadow-lg shadow-blue-500/50 rounded-md font-semibold
         text-[#fefefe] transition duration-300 ease-in-out hover:bg-[#203e6a] hover:text-[#fefefe] hover:shadow-lg hover:shadow-blue-200"
          onClick={handleSubmit}
          disabled={signedMessage}
        >
          Verify Ownership
        </button>
      </div>
    </div>
  );
}

export default VerifyToken;
