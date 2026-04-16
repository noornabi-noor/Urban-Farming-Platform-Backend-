import { prisma } from "../../lib/prisma";
import { TVendorProfile } from "./vendor.interface";

const createVendorProfileIntoDB = async (userId: string, payload: Partial<TVendorProfile>) => {
  const result = await prisma.vendorProfile.create({
    data: {
      userId,
      farmName: payload.farmName as string,
      farmLocation: payload.farmLocation as string,
    },
  });
  return result;
};

const getAllVendorProfilesFromDB = async () => {
  const result = await prisma.vendorProfile.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

const getVendorProfileByIdFromDB = async (id: string) => {
  const result = await prisma.vendorProfile.findUnique({
    where: { id },
    include: {
      user: true,
      produces: true,
      rentalSpaces: true,
    },
  });
  return result;
};

const updateVendorProfileIntoDB = async (id: string, payload: Partial<TVendorProfile>) => {
  const result = await prisma.vendorProfile.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const VendorService = {
  createVendorProfileIntoDB,
  getAllVendorProfilesFromDB,
  getVendorProfileByIdFromDB,
  updateVendorProfileIntoDB,
};
