import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import prismaClient  from "@/*";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function POST(req: NextRequest, res: NextResponse){
    const body = await req.json();
    console.log(body);
    const { verifyToken, generalDetail, promotion } = body;

    // await prismaClient.project.create({
    //     data: {
            
    //     }
    // })    

    

    // const {tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest } = body; //projectName missing
    // const {tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest, projectName } = {
    //     tokenAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //     tokenForSale: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //     pricePerToken: 100,
    //     startTime: 100,
    //     endTime: 100,
    //     minInvest: 100,
    //     maxInvest: 100,
    //     projectName: "projectName"
    // };
    try {
        // const addProject = contract.addProject(tokenAddress, tokenForSale, pricePerToken, startTime, endTime, minInvest, maxInvest);
        return NextResponse.json({success: true}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: error});
    }

    
}

