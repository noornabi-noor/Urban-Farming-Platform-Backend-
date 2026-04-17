import { prisma } from "../../lib/prisma";
import { TCommunityPost } from "./community.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { communityFilterableFields, communitySearchableFields } from "./community.constant";

const createPostIntoDB = async (payload: TCommunityPost) => {
  const result = await prisma.communityPost.create({
    data: payload,
  });
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(prisma.communityPost, query, {
    searchableFields: communitySearchableFields,
    filterableFields: communityFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields()
    .include({ user: true });

  const result = await postQuery.execute();
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
