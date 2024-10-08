import { prismaClient } from "../index";
import fs from "fs";

async function createPicture() {
    const imageBuffer = fs.readFileSync("./bg1.jpg");
    return await prismaClient.project.create({
        data: {
            projectID: "1",
            description: "This is a project",
            shortDescription: "This is a short description",
            projectImages: [
                imageBuffer
            ],
        }
    });
}
async function loadPicture() {
    // Query the database to retrieve the image byte array
    const project = await prismaClient.project.findUnique({
        where: {
            projectID: "1",
        },
        select: {
            projectImages: true,
        },
    });

    if (project && project.projectImages.length > 0) {
        // Handle the retrieved byte array (e.g., save it to a file)
        const imageBuffer = project.projectImages[0];
        fs.writeFileSync("./retrieved_bg1.jpg", imageBuffer);
        console.log("Image retrieved and saved as retrieved_bg1.jpg");
    } else {
        console.log("No image found for the specified projectID");
    }
}


// createPicture()
loadPicture()
