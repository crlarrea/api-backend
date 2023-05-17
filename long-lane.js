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
  sanitizeOptions
} = require("./helpers/security");
const {errorHandler} = require('./helpers/errorHandler')
const formRoutes = require("./routes/form");
console.log("Starting App");

// Connect to database
connection();

// Apply security middleware
app.use(helmet());
app.use(cors(corsOptions));


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

// Middleware to handle errors
app.use(errorHandler);

// Start the server
app.listen((port = process.env.PORT), () => {
  console.log(`Server running on port ${port}`);
});
