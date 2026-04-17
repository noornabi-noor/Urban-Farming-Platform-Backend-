import { SustainabilityCert } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const createSustainabilityCertIntoDB = async (payload: any): Promise<SustainabilityCert> => {
  const result = await prisma.sustainabilityCert.create({
    data: payload,
  });
  return result;
};

const getAllSustainabilityCertsFromDB = async (): Promise<SustainabilityCert[]> => {
  const result = await prisma.sustainabilityCert.findMany({
    include: {
      vendor: true,
    },
  });
  return result;
};

const getSustainabilityCertByIdFromDB = async (id: string): Promise<SustainabilityCert | null> => {
  const result = await prisma.sustainabilityCert.findUnique({
    where: { id },
    include: {
      vendor: true,
    },
  });
  return result;
};

const updateSustainabilityCertInDB = async (
  id: string,
  payload: Partial<SustainabilityCert>
): Promise<SustainabilityCert> => {
  const result = await prisma.sustainabilityCert.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSustainabilityCertFromDB = async (id: string): Promise<SustainabilityCert> => {
  const result = await prisma.sustainabilityCert.delete({
    where: { id },
  });
  return result;
};

export const SustainabilityCertService = {
  createSustainabilityCertIntoDB,
  getAllSustainabilityCertsFromDB,
  getSustainabilityCertByIdFromDB,
  updateSustainabilityCertInDB,
  deleteSustainabilityCertFromDB,
};
