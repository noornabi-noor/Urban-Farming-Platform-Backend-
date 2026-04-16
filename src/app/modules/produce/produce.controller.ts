import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { ProduceService } from "./produce.service";

const createProduce = catchAsync(async (req: Request, res: Response) => {
  const result = await ProduceService.createProduceIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Produce created successfully!",
    data: result,
  });
});

const getAllProduces = catchAsync(async (req: Request, res: Response) => {
  const result = await ProduceService.getAllProducesFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Produces retrieved successfully!",
    data: result,
  });
});

const getProduceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ProduceService.getProduceByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Produce retrieved successfully!",
    data: result,
  });
});

const updateProduce = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ProduceService.updateProduceIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Produce updated successfully!",
    data: result,
  });
});

const deleteProduce = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ProduceService.deleteProduceFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Produce deleted successfully!",
    data: result,
  });
});

export const ProduceController = {
  createProduce,
  getAllProduces,
  getProduceById,
  updateProduce,
  deleteProduce,
};
