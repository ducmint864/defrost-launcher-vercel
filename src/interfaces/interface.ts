export enum Status {
  Pending = "pending",
  Ended = "ended",
}

export interface DBProject {
  id: number;
  projectID: string;
  projectName: string;
  projectOwnerAddress: string;
  description: string;
  shortDescription: string;
  projectImageUrls: string[];
  txnHashCreated: string;
  projectTitle: string;
  projectLogoImageUrl: string[];
  endDate: Date;
  startDate: Date;
  status: Status;
  raisedAmount: string;
}
