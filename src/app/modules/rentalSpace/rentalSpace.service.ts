import { prisma } from "../../lib/prisma";
import { TRentalSpace } from "./rentalSpace.interface";

const createRentalSpaceIntoDB = async (payload: TRentalSpace) => {
  const result = await prisma.rentalSpace.create({
    data: payload,
  });
  return result;
};

const getAllRentalSpacesFromDB = async () => {
  const result = await prisma.rentalSpace.findMany({
    include: {
      vendor: true,
    },
  });
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
