"use client";

import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import bg from "../../public/images/bg1.jpg";
import { Footer } from "@/components";

function Hero() {
  const [walletAddress, setWalletAddress] = useState("");

  /**
   * @dev function to trigger wallet connection in browser
   */
  const connectWallet = async () => {
    if (window.ethereum && typeof window.ethereum.request === "function") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setWalletAddress(account); 
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed or request method is unavailable.");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <Typography variant="h3" color="white" className="mb-2">
            Project Launch Pad
          </Typography>
          <Typography variant="h1" color="white" className="lg:max-w-3xl">
            Polkadot Hackathon - DeFi Track
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
          >
            Our launchpad allows projects to raise funds by locking vTokens for
            staking rewards, with native tokens in return and automatic vToken
            release post lock-up.{" "}
          </Typography>
          <div className="flex items-center gap-4">
            <Button variant="gradient" color="white" onClick={connectWallet}>
              {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Hero;
