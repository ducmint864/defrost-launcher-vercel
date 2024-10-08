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
      if(response.data.success){
        console.log("Token Verified");
      }
      router.push("/addproject/generaldetails");
    } catch (error) {
      console.log(error);
      // toast.error("Token not verified");      
    }
  }

  


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#02121D]">
      <div className="  rounded-lg shadow-md text-center max-w-md w-full">
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
        <button className="w-full bg-[#28DBD1] text-[#02121D] py-3 rounded-md font-semibold hover:bg-blue-800"
        onClick={handleSubmit}
        >
          Verify Ownership
        </button>
      </div>
    </div>
  );
}

export default VerifyToken;
