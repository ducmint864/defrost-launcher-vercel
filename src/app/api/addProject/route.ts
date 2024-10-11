import { ethers } from "ethers";
import contractArtifact from "./IDO.json";
import { NextRequest, NextResponse } from "next/server";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default async function POST(req: NextRequest, res: NextResponse){
    const provider = new ethers.providers.JsonRpcProvider('https://localhost:8545');
    const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);
    const body = await req.json();

    // const {tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest } = body; //projectName missing
    const {tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest, projectName } = {
        tokenAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        tokenForSale: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        pricePerToken: 100,
        startTime: 100,
        endTime: 100,
        minInvest: 100,
        maxInvest: 100,
        projectName: "projectName"
    };
    try {
        const addProject = contract.addProject(tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest);
        return NextResponse.json({success: true, data: addProject});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: error});
    }

    
}

