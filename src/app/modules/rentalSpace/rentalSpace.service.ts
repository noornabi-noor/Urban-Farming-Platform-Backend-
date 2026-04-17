import { prisma } from "../../lib/prisma";
import { TRentalSpace } from "./rentalSpace.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { rentalSpaceFilterableFields, rentalSpaceSearchableFields } from "./rentalSpace.constant";

const createRentalSpaceIntoDB = async (payload: TRentalSpace) => {
  const result = await prisma.rentalSpace.create({
    data: payload,
  });
  return result;
};

const getAllRentalSpacesFromDB = async (query: Record<string, unknown>) => {
  const rentalSpaceQuery = new QueryBuilder(prisma.rentalSpace, query, {
    searchableFields: rentalSpaceSearchableFields,
    filterableFields: rentalSpaceFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .include({ vendor: true });

  const result = await rentalSpaceQuery.execute();
  return result;
};

const getRentalSpaceByIdFromDB = async (id: string) => {
  const result = await prisma.rentalSpace.findUnique({
    where: { id },
    include: {
      vendor: true,
      plantTrackings: true,
    },
  });
  return result;
};

const updateRentalSpaceIntoDB = async (id: string, payload: Partial<TRentalSpace>) => {
  const result = await prisma.rentalSpace.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteRentalSpaceFromDB = async (id: string) => {
  const result = await prisma.rentalSpace.delete({
    where: { id },
  });
  return result;
};

export const RentalSpaceService = {
  createRentalSpaceIntoDB,
  getAllRentalSpacesFromDB,
  getRentalSpaceByIdFromDB,
  updateRentalSpaceIntoDB,
  deleteRentalSpaceFromDB,
};
