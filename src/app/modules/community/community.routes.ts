import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CommunityValidation } from "./community.validation";
import { CommunityController } from "./community.controller";
import { authenticate } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  authenticate,
  validateRequest(CommunityValidation.createPostSchema),
  CommunityController.createPost
);

router.get("/", CommunityController.getAllPosts);

router.patch(
  "/:id",
  authenticate,
  validateRequest(CommunityValidation.updatePostSchema),
  CommunityController.updatePost
);

router.delete(
  "/:id",
  authenticate,
  CommunityController.deletePost
);

export const CommunityRoutes = router;
