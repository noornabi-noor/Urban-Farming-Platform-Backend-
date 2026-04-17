import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { VendorService } from "./vendor.service";

const createVendorProfile = catchAsync(async (req: Request, res: Response) => {
  // Assuming userId comes from auth middleware in the future
  const userId = req.body.userId; 
  const result = await VendorService.createVendorProfileIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Vendor Profile created successfully!",
    data: result,
  });
});

const getAllVendorProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorService.getAllVendorProfilesFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Vendor Profiles retrieved successfully!",
    data: result,
  });
});

const getVendorProfileById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await VendorService.getVendorProfileByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Vendor Profile retrieved successfully!",
    data: result,
  });
});

const updateVendorProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await VendorService.updateVendorProfileIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Vendor Profile updated successfully!",
    data: result,
  });
});

export const VendorController = {
  createVendorProfile,
  getAllVendorProfiles,
  getVendorProfileById,
  updateVendorProfile,
};
