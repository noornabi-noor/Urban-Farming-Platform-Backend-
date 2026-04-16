export type TPlantTracking = {
  id: string;
  userId: string;
  rentalSpaceId: string;
  plantName: string;
  healthStatus: string;
  growthStage: string;
  lastWatered?: Date;
  harvestTime?: Date;
  createdAt: Date;
  updatedAt: Date;
};
