import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Order placed successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Orders retrieved successfully!",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  // Assuming userId comes from auth/session
  const userId = req.body.userId; 
  const result = await OrderService.getOrdersByUserIdFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My orders retrieved successfully!",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await OrderService.updateOrderStatusInDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order status updated successfully!",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
};
