import { z } from "zod";
import { CertificationStatus } from "@prisma/client";

const createVendorProfileSchema = z.object({
  body: z.object({
    farmName: z.string().min(1, "Farm name is required"),
    farmLocation: z.string().min(1, "Farm location is required"),
  }),
});

const updateVendorProfileSchema = z.object({
  body: z.object({
    farmName: z.string().optional(),
    farmLocation: z.string().optional(),
    certificationStatus: z.nativeEnum(CertificationStatus).optional(),
  }),
});

export const VendorValidation = {
  createVendorProfileSchema,
  updateVendorProfileSchema,
};
