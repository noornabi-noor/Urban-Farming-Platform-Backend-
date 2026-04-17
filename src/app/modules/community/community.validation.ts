import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    postContent: z.string().min(1, "Post content is required"),
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    postContent: z.string().min(1, "Post content cannot be empty"),
  }),
});

export const CommunityValidation = {
  createPostSchema,
  updatePostSchema,
};
