import { prisma } from "../../lib/prisma";
import { TOrder } from "./order.interface";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await prisma.order.create({
    data: payload,
  });
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await prisma.order.findMany({
    include: {
      user: true,
      produce: true,
    },
  });
  return result;
};

const getOrdersByUserIdFromDB = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: { userId },
    include: {
      produce: true,
    },
  });
  return result;
};

const updateOrderStatusInDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await prisma.order.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByUserIdFromDB,
  updateOrderStatusInDB,
};
