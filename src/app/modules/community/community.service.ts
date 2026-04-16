import { prisma } from "../../lib/prisma";
import { TCommunityPost } from "./community.interface";

const createPostIntoDB = async (payload: TCommunityPost) => {
  const result = await prisma.communityPost.create({
    data: payload,
  });
  return result;
};

const getAllPostsFromDB = async () => {
  const result = await prisma.communityPost.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updatePostInDB = async (id: string, payload: Partial<TCommunityPost>) => {
  const result = await prisma.communityPost.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await prisma.communityPost.delete({
    where: { id },
  });
  return result;
};

export const CommunityService = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostInDB,
  deletePostFromDB,
};
