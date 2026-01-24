import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());

app.use("/api", apiLimiter);

import { SeedService } from "./services/SeedService";

// ... imports

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    // Run seed if needed
    await SeedService.seed(AppDataSource);

    app.use("/api", routes);
    app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Candidate Management API" });
    });
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
