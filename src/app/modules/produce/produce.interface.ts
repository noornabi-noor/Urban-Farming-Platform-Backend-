import { CertificationStatus } from "@prisma/client";

export type TProduce = {
  id?: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  certificationStatus?: CertificationStatus;
  availableQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
