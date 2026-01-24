import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_STRICT_MAX || "20"),
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many write requests from this IP, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_AUTH_MAX || "5"),
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const createRateLimiter = (
  windowMinutes: number,
  maxRequests: number,
  message: string = "Rate limit exceeded",
) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    message: {
      status: "error",
      statusCode: 429,
      message,
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
