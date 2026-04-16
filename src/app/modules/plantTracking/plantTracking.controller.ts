import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { PlantTrackingService } from "./plantTracking.service";

const createPlantTracking = catchAsync(async (req: Request, res: Response) => {
  // Ensure the plant tracking belongs to the logged-in user if not provided in body
  if (!req.body.userId && req.user) {
    req.body.userId = req.user.id;
  }

  const result = await PlantTrackingService.createPlantTrackingIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Plant tracking created successfully!",
    data: result,
  });
});

const getMyPlantTrackings = catchAsync(async (req: Request, res: Response) => {
  // Extract user ID from authenticated token context
  const userId = req.user?.id as string;
  const result = await PlantTrackingService.getMyPlantTrackingsFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Plant trackings retrieved successfully!",
    data: result,
  });
});

const getPlantTrackingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await PlantTrackingService.getPlantTrackingByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Plant tracking retrieved successfully!",
    data: result,
  });
});

const updatePlantTracking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await PlantTrackingService.updatePlantTrackingInDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Plant tracking updated successfully!",
    data: result,
  });
});

const deletePlantTracking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await PlantTrackingService.deletePlantTrackingFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Plant tracking deleted successfully!",
    data: result,
  });
});

export const PlantTrackingController = {
  createPlantTracking,
  getMyPlantTrackings,
  getPlantTrackingById,
  updatePlantTracking,
  deletePlantTracking,
};
