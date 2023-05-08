require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS;
const rateLimit = require("express-rate-limit");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
};

// Limit number of requests
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.LIMITER_WINDOW_MS), // 15 minutes
  max: Number.parseInt(process.env.LIMITER_MAX), // Limit each IP to 50 requests per windowMs
});

const sanitizeOptions = {
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] is sanitized`, req);
  },
};

const corsError = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(403).send("Forbidden");
  }
};

module.exports = {
  helmet,
  cors,
  xss,
  mongoSanitize,
  hpp,
  allowedOrigins,
  corsOptions,
  limiter,
  sanitizeOptions,
  corsError,
};
