import { prisma } from "../../lib/prisma";
import { TOrder } from "./order.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { orderFilterableFields, orderSearchableFields } from "./order.constant";

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await prisma.order.create({
    data: payload,
  });
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(prisma.order, query, {
    searchableFields: orderSearchableFields,
    filterableFields: orderFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .include({ user: true, produce: true });

  const result = await orderQuery.execute();
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
