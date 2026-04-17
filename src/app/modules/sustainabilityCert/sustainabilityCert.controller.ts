import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { SustainabilityCertService } from "./sustainabilityCert.service";

const createSustainabilityCert = catchAsync(async (req: Request, res: Response) => {
  const result = await SustainabilityCertService.createSustainabilityCertIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Sustainability certification submitted successfully!",
    data: result,
  });
});

const getAllSustainabilityCerts = catchAsync(async (req: Request, res: Response) => {
  const result = await SustainabilityCertService.getAllSustainabilityCertsFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sustainability certifications retrieved successfully!",
    data: result,
  });
});

const getSustainabilityCertById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await SustainabilityCertService.getSustainabilityCertByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sustainability certification retrieved successfully!",
    data: result,
  });
});

const updateSustainabilityCert = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await SustainabilityCertService.updateSustainabilityCertInDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sustainability certification updated successfully!",
    data: result,
  });
});

const deleteSustainabilityCert = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await SustainabilityCertService.deleteSustainabilityCertFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sustainability certification deleted successfully!",
    data: result,
  });
});

export const SustainabilityCertController = {
  createSustainabilityCert,
  getAllSustainabilityCerts,
  getSustainabilityCertById,
  updateSustainabilityCert,
  deleteSustainabilityCert,
};
