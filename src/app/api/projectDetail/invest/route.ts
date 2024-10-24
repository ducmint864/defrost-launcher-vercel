import { prismaClient } from "@/*";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { projectId, userAddress, amount } = body;

        console.debug(`projectId is ${projectId}`);
        console.debug(`userAddress is ${userAddress}`);
        console.debug(`amount is ${amount}`);

        if (!projectId || !userAddress || !amount) {
            return NextResponse.json({
                success: false,
                message: "missing required data"
            }, { status: 400 });
        }

        await prismaClient.investEvent.create({
            data: {
                projectId: Number(projectId),
                userAddress: userAddress as string,
                amount: amount as string,
            }
        })
        return NextResponse.json({
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}