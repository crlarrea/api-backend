const { connection } = require("./database/connection");
const express = require("express");
const app = express();
const {
  helmet,
  cors,
  xss,
  mongoSanitize,
  hpp,
  corsOptions,
  limiter,
  sanitizeOptions,
  corsError,
} = require("./helpers/security");
const formRoutes = require("./routes/form");
console.log("Starting App");

// Connect to database
connection();

// Apply security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Middleware to handle errors thrown by the cors package
app.use(corsError);

// Hide server fingerprint
app.disable("x-powered-by");

// Apply rate limiter middleware to prevent DOS attacks
app.use(limiter);

// Convert body to a JS object
app.use(express.json()); // Receive data using content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

// Apply middleware to sanitize user input
app.use(xss());
app.use(mongoSanitize(sanitizeOptions));

// Apply middleware to prevent HTTP parameter pollution attacks
app.use(hpp());

// Loading the routes
app.use("/api", formRoutes);

// Start the server
app.listen((port = process.env.PORT), () => {
  console.log(`Server running on port ${port}`);
});
