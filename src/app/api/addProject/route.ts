import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import prismaClient  from "@/*";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function POST(req: NextRequest, res: NextResponse){
    const body = await req.json();
    console.log(body);
    
    const { verifyTokenData, generalDetailData, promotionData } = body;
    console.log("This is comb "+ generalDetailData[1]);
    if(!verifyTokenData || !generalDetailData || !promotionData){
        return NextResponse.json({success: false, error: "Missing data"}, {status: 400});
    }
    console.log("General "+ generalDetailData[0]);
    console.log("Promotion "+ promotionData[0]);

    //verifyTokenPage
    const verifyToken = verifyTokenData[0];

    //generalDetailPage
    const selectedCoin = generalDetailData[0];
    const selectedImages = generalDetailData[1];
    const selectedLogo = generalDetailData[2];
    const projectTitle = generalDetailData[3];
    const shortDescription = generalDetailData[4];
    const longDescription = generalDetailData[5];

    //promotionPage
    const tokenExchangeRate = promotionData[0];
    const amountTokenRelease = promotionData[1];
    const softCap = promotionData[2];
    const hardCap = promotionData[3];
    const minInvest = promotionData[4];
    const maxInvest = promotionData[5];
    const startDate = promotionData[6];
    const endDate = promotionData[7];

    //Convert date to unix time to fit the contract uint256
    const startTimed = new Date(startDate);
    const unixTime = Math.floor(startTimed.getTime()/1000); ///FOMRATED to uint256
    const endTimed = new Date(endDate);
    const unixTimeEnd = Math.floor(endTimed.getTime()/1000); //FORMATED to uint256
    


    // await prismaClient.project.create({
    //     data: {
            
    //     }
    // })    

    

    // const {tokenAddress, tokenF  orSale, pricePerToken, startTime, endTime, minInvest, maxInvest } = body; //projectName missing
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

