import cors from "cors";
import * as dotenv from "dotenv";
import express, { Response } from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";
import routes from "./routes";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // Reject null-origin requests in production
      if (!origin) {
        if (isProduction) {
          return callback(new Error("Requests without origin not allowed"));
        }
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "50kb" }));

app.use(pinoHttp({ logger }));

app.use("/api", apiLimiter);
app.use("/api", routes);
app.get("/", (_req, res: Response) => {
  res.json({ message: "Candidate Management API" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info({ port: PORT }, "Server started");
});

AppDataSource.initialize()
  .then(() => {
    logger.info("Data Source initialized");
  })
  .catch((err) => {
    logger.error({ err }, "Data Source initialization failed");
    process.exit(1);
  });
