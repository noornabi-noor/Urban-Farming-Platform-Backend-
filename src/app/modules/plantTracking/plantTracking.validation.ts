import { z } from "zod";

const createPlantTrackingSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    rentalSpaceId: z.string().min(1, "Rental Space ID is required"),
    plantName: z.string().min(1, "Plant name is required"),
    healthStatus: z.string().min(1, "Health status is required"),
    growthStage: z.string().min(1, "Growth stage is required"),
    lastWatered: z.string().datetime().optional(),
    harvestTime: z.string().datetime().optional(),
  }),
});

const updatePlantTrackingSchema = z.object({
  body: z.object({
    plantName: z.string().optional(),
    healthStatus: z.string().optional(),
    growthStage: z.string().optional(),
    lastWatered: z.string().datetime().optional(),
    harvestTime: z.string().datetime().optional(),
  }),
});

export const PlantTrackingValidation = {
  createPlantTrackingSchema,
  updatePlantTrackingSchema,
};
