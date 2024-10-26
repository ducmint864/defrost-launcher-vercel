import { prismaClient } from "@/*";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const body = await req.json();

    const projectList = await prismaClient.project.findMany({
      //   select: {
      //     projectTitle: true,
      //     shortDescription: true,
      //   },
    });
    console.log("projectList" + projectList);
    // const launchpadDataTest = await prismaClient.launchpad.create({
    //   data: {
    //     totalUniqueUsers: 10,
    //     totalRaisedAmount: "15",
    //     totalFundedProjects: 6,
    //   },
    // });
    const launchpadData = await prismaClient.launchpad.findMany();

    return NextResponse.json({ projectList, launchpadData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
