import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CommunityValidation } from "./community.validation";
import { CommunityController } from "./community.controller";

const router = Router();

router.post(
  "/",
  validateRequest(CommunityValidation.createPostSchema),
  CommunityController.createPost
);

router.get("/", CommunityController.getAllPosts);

router.patch(
  "/:id",
  validateRequest(CommunityValidation.updatePostSchema),
  CommunityController.updatePost
);

router.delete("/:id", CommunityController.deletePost);

export const CommunityRoutes = router;
