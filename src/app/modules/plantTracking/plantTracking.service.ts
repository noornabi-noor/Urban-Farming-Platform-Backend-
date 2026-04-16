import { prisma } from "../../lib/prisma";
import { TPlantTracking } from "./plantTracking.interface";

const createPlantTrackingIntoDB = async (payload: TPlantTracking) => {
  const result = await prisma.plantTracking.create({
    data: payload,
  });
  return result;
};

const getMyPlantTrackingsFromDB = async (userId: string) => {
  const result = await prisma.plantTracking.findMany({
    where: { userId },
    include: {
      rentalSpace: true,
    },
  });
  return result;
};

const getPlantTrackingByIdFromDB = async (id: string) => {
  const result = await prisma.plantTracking.findUnique({
    where: { id },
    include: {
      rentalSpace: true,
    },
  });
  return result;
};

const updatePlantTrackingInDB = async (id: string, payload: Partial<TPlantTracking>) => {
  const result = await prisma.plantTracking.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletePlantTrackingFromDB = async (id: string) => {
  const result = await prisma.plantTracking.delete({
    where: { id },
  });
  return result;
};

export const PlantTrackingService = {
  createPlantTrackingIntoDB,
  getMyPlantTrackingsFromDB,
  getPlantTrackingByIdFromDB,
  updatePlantTrackingInDB,
  deletePlantTrackingFromDB,
};
