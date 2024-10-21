import { prismaClient } from "@/*";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    const { projectOwnerAddress } = body;

    const projectsInfo = prismaClient.project.findMany({
        where: {
            projectOwnerAddress: projectOwnerAddress
        },
    });


    return NextResponse.json(projectsInfo, { status: 200 });





}