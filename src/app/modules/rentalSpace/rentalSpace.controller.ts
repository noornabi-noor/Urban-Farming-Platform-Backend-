import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { RentalSpaceService } from "./rentalSpace.service";

const createRentalSpace = catchAsync(async (req: Request, res: Response) => {
  const result = await RentalSpaceService.createRentalSpaceIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Rental Space created successfully!",
    data: result,
  });
});

const getAllRentalSpaces = catchAsync(async (req: Request, res: Response) => {
  const result = await RentalSpaceService.getAllRentalSpacesFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Rental Spaces retrieved successfully!",
    data: result,
  });
});

const getRentalSpaceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await RentalSpaceService.getRentalSpaceByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Rental Space retrieved successfully!",
    data: result,
  });
});

const updateRentalSpace = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await RentalSpaceService.updateRentalSpaceIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Rental Space updated successfully!",
    data: result,
  });
});

const deleteRentalSpace = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await RentalSpaceService.deleteRentalSpaceFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Rental Space deleted successfully!",
    data: result,
  });
});

export const RentalSpaceController = {
  createRentalSpace,
  getAllRentalSpaces,
  getRentalSpaceById,
  updateRentalSpace,
  deleteRentalSpace,
};
