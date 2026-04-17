import { prisma } from "../../lib/prisma";
import { TVendorProfile } from "./vendor.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { vendorFilterableFields, vendorSearchableFields } from "./vendor.constant";

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

const getAllVendorProfilesFromDB = async (query: Record<string, unknown>) => {
  const vendorQuery = new QueryBuilder(prisma.vendorProfile, query, {
    searchableFields: vendorSearchableFields,
    filterableFields: vendorFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .include({ user: true });

  const result = await vendorQuery.execute();
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
