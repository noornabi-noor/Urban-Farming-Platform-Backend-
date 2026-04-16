import { CertificationStatus } from "@prisma/client";

export type TVendorProfile = {
  id: string;
  userId: string;
  farmName: string;
  certificationStatus: CertificationStatus;
  farmLocation: string;
  createdAt: Date;
  updatedAt: Date;
};
