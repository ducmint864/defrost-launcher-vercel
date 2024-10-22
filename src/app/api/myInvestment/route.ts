import { prismaClient } from "@/*";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {

    // let projects = [];

    // for(let i = 0; i<5; i++){
    //     let project = await prismaClient.investEvent.create({
    //         data: {
    //             userAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //             projectId: i,
    //             amount: "1000"
    //         }
    //     })
    //     projects.push(project);
    // }

    // console.log(projects)



    try {

        const body = await req.json();
        const { userAddress } = body;


        const projectsInfo = await prismaClient.investEvent.findMany({
            where: {
                userAddress: userAddress
            }
        });

        console.log(projectsInfo);

        projectsInfo.forEach((project) => {

            console.log(`
                Project Id: ${project.id}
                User Address: ${project.userAddress}
                Project Id: ${project.projectId}
                Amount Invested: ${project.amount}
                `);
        })

        let projectsDetails: any[] = [];
        projectsInfo.forEach(async (project) => {
            let projectDetail = await prismaClient.project.findMany({
                where: {
                    projectID: project.projectId,
                }
            });
            projectsDetails.push(projectDetail);
        })

        return NextResponse.json({ projectsDetails }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 400 });
    }

}