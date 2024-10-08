import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

function VerifyToken() {
  const router = useRouter();
  const [tokenAddress, setTokenAddress] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/addProject", tokenAddress);
      if (response.data.success) {
        console.log("Token Verified");
      }
      router.push("/addproject/generaldetails");
    } catch (error) {
      console.log(error);
      // toast.error("Token not verified");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      {/* <div className="absolute left-1/2 bottom-0 w-[600px] h-[300px] bg-[#0047FF] rounded-t-full opacity-10 blur-[100px] animate-[pulse_3s_infinite] z-0 transform -translate-x-1/2"></div> */}
      <div className="  rounded-lg shadow-md text-center max-w-md w-full font-sans">
        <h2 className="text-xl font-semibold mb-4 text-white">Add Token</h2>
        <p className="text-gray-500 mb-6">
          Paste your token URL so we can verify that you own this
        </p>
        <input
          type="text"
          placeholder="Contract Address"
          value={tokenAddress}
          className="w-full p-3 border rounded-md mb-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button className="w-full bg-[#0047FF] py-3 shadow-lg shadow-blue-500/50 rounded-md font-semibold text-[#fefefe] transition duration-300 ease-in-out hover:bg-[#203e6a] hover:text-[#fefefe] hover:shadow-lg hover:shadow-blue-200">
          Verify Ownership
        </button>
      </div>
    </div>
  );
}

export default VerifyToken;
