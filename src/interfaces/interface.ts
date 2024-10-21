interface DBProject {
    id: number;
    projectName: string;
    projectOwnerAddress: string;
    description: string;
    shortDescription: string;
    projectImageUrls: String[];
    txnHashCreated: String;
    projectTitle: String;
    projectLogoImageUrl: String[];
    endDate: Date;
    startDate: Date;
}

enum Status{
    Pending,
    Ended,
}