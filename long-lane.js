const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const app = express();
const port = 3000;

// Apply security middleware
app.use(helmet());

// CORS
const allowedOrigins = ["https://long-lane.co.uk"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Apply rate limiter middleware to prevent DOS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 3 requests per windowMs
});
app.use(limiter);

// Apply middleware to sanitize user input
app.use(xss());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Apply middleware to prevent HTTP parameter pollution attacks
app.use(hpp());

// Define the route for the POST request
app.post("/send-message", (req, res) => {
  const data = req.body.data;

  // Do something with the data, such as store it in a database
  console.log(data);

  return res.status(200).json({ message: "Data received" });
});

// Middleware to handle errors thrown by the cors package
app.use((err, req, res, next) => {
  if (err) {
    res.status(403).send('Forbidden');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
