import { prisma } from "../../lib/prisma";
import { TProduce } from "./produce.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { produceFilterableFields, produceSearchableFields } from "./produce.constant";

const createProduceIntoDB = async (payload: TProduce) => {
  const result = await prisma.produce.create({
    data: payload,
  });
  return result;
};

const getAllProducesFromDB = async (query: Record<string, unknown>) => {
  const produceQuery = new QueryBuilder(prisma.produce, query, {
    searchableFields: produceSearchableFields,
    filterableFields: produceFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .include({ vendor: true });

  const result = await produceQuery.execute();
  return result;
};

const getProduceByIdFromDB = async (id: string) => {
  const result = await prisma.produce.findUnique({
    where: { id },
    include: {
      vendor: true,
    },
  });
  return result;
};

const updateProduceIntoDB = async (id: string, payload: Partial<TProduce>) => {
  const result = await prisma.produce.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteProduceFromDB = async (id: string) => {
  const result = await prisma.produce.delete({
    where: { id },
  });
  return result;
};

export const ProduceService = {
  createProduceIntoDB,
  getAllProducesFromDB,
  getProduceByIdFromDB,
  updateProduceIntoDB,
  deleteProduceFromDB,
};
