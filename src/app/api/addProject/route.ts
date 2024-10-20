import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/*";
import contractArtifact from "../../../abi/ProjectPoolFactory.json";
import { title } from "process";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);

  const { verifyTokenData, generalDetailData, promotionData, smartContractEventData } = body;
  console.log("This is comb " + generalDetailData[1]);
  if (!verifyTokenData || !generalDetailData || !promotionData) {
    return NextResponse.json(
      { success: false, error: "Missing data" },
      { status: 400 }
    );
  }
  console.log("General " + generalDetailData[0]);
  console.log("Promotion " + promotionData[0]);

  //verifyTokenPage
  const verifyToken = verifyTokenData[0];

  //generalDetailPage
  const selectedVToken = generalDetailData[0]; //selectedToken address
  const selectedImages = generalDetailData[1];
  const selectedLogo = generalDetailData[2];
  const projectTitle = generalDetailData[3];
  const shortDescription = generalDetailData[4];
  const longDescription = generalDetailData[5];

  //promotionPage
  const tokenExchangeRate = promotionData[0];
  // const amountTokenRelease = promotionData[1];
  const softCap = promotionData[1];
  const hardCap = promotionData[2];
  const minInvest = promotionData[3];
  const maxInvest = promotionData[4];
  const startDate = promotionData[5];
  const endDate = promotionData[6];
  // )
  const projectiD =  smartContractEventData[0]/*** @notice */
  const txnHashCreated = smartContractEventData[1]/*** @notice */

  //Convert date to unix time to fit the contract uint256
  const startTimed = new Date(startDate);
  const unixTime = Math.floor(startTimed.getTime() / 1000); ///FOMRATED to uint256
  const endTimed = new Date(endDate);
  const unixTimeEnd = Math.floor(endTimed.getTime() / 1000); //FORMATED to uint256

  // await prismaClient.project.create({
  //     data: {

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
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const contractABI = contractArtifact.abi;
        // const contract = new ethers.Contract(
        //     contractAddress,
        //     contractABI,
        //     signer,
        // )
        // const addProject = contract.createProjectpool(
        //     verifyToken, tokenExchangeRate, unixTime, unixTimeEnd,
        //     minInvest, maxInvest, softCap, hardCap,
        //     /**@notice reward, */
        //     selectedVToken

        const data = await prismaClient.project.create({
          data:{
            projectID:  projectiD,
            projectTitle: projectTitle,
            projectLogoImageUrl: selectedLogo,
            description: longDescription,
            shortDescription: shortDescription,
            projectImageUrls: selectedImages,
            startDate: startDate,
            endDate: endDate,
            txnHashCreated:txnHashCreated
          }  
        });
        console.log(data);
} catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
