import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import status from "http-status";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: "Welcome to Interactive Urban Farming Platform API",
    version: "1.0.0"
  });
});

// API Routes
app.use("/api/v1", router);

// Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
