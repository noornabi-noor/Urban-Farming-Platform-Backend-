import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { CommunityService } from "./community.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await CommunityService.createPostIntoDB({ ...req.body, userId });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Post created successfully!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await CommunityService.getAllPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrieved successfully!",
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await CommunityService.updatePostInDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post updated successfully!",
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await CommunityService.deletePostFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post deleted successfully!",
    data: result,
  });
});

export const CommunityController = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
