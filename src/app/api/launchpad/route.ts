import { prismaClient } from "@/*";
import { DBProject, ProjectStatus } from "@/interfaces/interface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const projectList = await prismaClient.project.findMany({});
    const launchpadData = await prismaClient.launchpad.findMany();

    const investedProjects: DBProject[] = projectList.map((launchpad) => {
      const presentTime = new Date().getTime() / 1000;
      const projectStartTime = launchpad.startDate.getTime() / 1000;
      const status: ProjectStatus =
        projectStartTime > presentTime ? "upcoming" : "pending";
      return {
        id: launchpad.id,
        projectID: launchpad.projectID,
        projectOwnerAddress: launchpad.projectOwnerAddress,
        description: launchpad.description,
        shortDescription: launchpad.shortDescription,
        projectImageUrls: launchpad.projectImageUrls,
        txnHashCreated: launchpad.txnHashCreated,
        projectTitle: launchpad.projectTitle,
        projectLogoImageUrl: launchpad.projectLogoImageUrl,
        endDate: launchpad.endDate,
        startDate: launchpad.startDate,
        isWithdrawn: launchpad.isWithdrawn,
        status: status,
      };
    });

    return NextResponse.json(
      { investedProjects, launchpadData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
