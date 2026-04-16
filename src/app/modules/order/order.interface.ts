import { OrderStatus } from "@prisma/client";

export type TOrder = {
  id: string;
  userId: string;
  produceId: string;
  vendorId: string;
  status: OrderStatus;
  orderDate: Date;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
