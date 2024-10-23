import { prismaClient } from "@/*";
import { NextRequest, NextResponse } from "next/server";
import { ProjectStatus } from "@prisma/client";
/**
 * @Note This function is used to query the postgres database to get all the projects created by the user
 */

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    const { projectOwnerAddress } = body;
    console.debug(`projectOwnerAddress is: ${projectOwnerAddress}`);

    // let projects: any[] = [];
    // for (let i = 12; i < 17; i++) {
    //   let projectA = await prismaClient.project.create({
    //     data: {
    //       projectID: i.toString(),
    //       projectOwnerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //       description: "This is a test project",
    //       shortDescription: "This is a short description",
    //       projectImageUrls: ["https://www.google.com"],
    //       txnHashCreated: "0x123456789" + 10 * i,
    //       projectTitle: "Test Project",
    //       projectLogoImageUrl: [
    //         "https://suno.vn/blog/wp-content/uploads/2014/12/nike-lich-su-thiet-ke-logo.jpg",
    //       ],
    //       endDate: new Date(),
    //       startDate: new Date(),
    //       status: "pending",
    //     },
    //   });
    //   projects.push(projectA);
    // }
    // console.log(projects);

    const projectsInfo = await prismaClient.project.findMany({
        where: {
            projectOwnerAddress: projectOwnerAddress as string,
        },
    });
    projectsInfo.forEach((project) => {
        console.log(`
            Project Id: ${project.id}
            Project Title: ${project.projectTitle}
            Project Description: ${project.description}
            Project Owner Address: ${project.projectOwnerAddress}
            Project Logo Image Url: ${project.projectLogoImageUrl}
            Project Image Urls: ${project.projectImageUrls}
            Start Date: ${project.startDate}
            End Date: ${project.endDate}
            Transaction Hash Created: ${project.txnHashCreated}
            Status: ${project.status}
        `);
    });
    //   const currentDate = new Date();
    //   const projectWithStatus = projectsInfo.map((project) => {
    //     let status = Status.Pending;
    //     if (project.endDate <= currentDate) {
    //       status = Status.Ended;
    //     } else {
    //       status = Status.Pending;
    //     }
    //     console.log("projectWithStatus: " + projectWithStatus);
    //     return {
    //       ...project,
    //       status: status /**@notice */,
    //     };
    //   });
    // console.log(projectsInfo);

    return NextResponse.json({ projectsInfo }, { status: 200 });
}
