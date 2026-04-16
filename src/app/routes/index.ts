import { Router } from "express";

const router = Router();

type TRoute = {
  path: string;
  route: Router;
};

const moduleRoutes: TRoute[] = [
  // {
  //   path: "/auth",
  //   route: authRoutes,
  // },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Urban Farming Platform API V1 is live!",
  });
});

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
