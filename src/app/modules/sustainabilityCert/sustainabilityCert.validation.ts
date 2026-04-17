import { z } from "zod";

const createSustainabilityCertSchema = z.object({
  body: z.object({
    vendorId: z.string().min(1, "Vendor ID is required"),
    certifyingAgency: z.string().min(1, "Certifying agency is required"),
    certificationDate: z.string().min(1, "Certification date is required").transform((str) => new Date(str)),
    certificateUrl: z.string().url("Must be a valid URL").optional(),
  }),
});

const updateSustainabilityCertSchema = z.object({
  body: z.object({
    certifyingAgency: z.string().optional(),
    certificationDate: z.string().transform((str) => new Date(str)).optional(),
    certificateUrl: z.string().url("Must be a valid URL").optional(),
  }),
});

export const SustainabilityCertValidation = {
  createSustainabilityCertSchema,
  updateSustainabilityCertSchema,
};
