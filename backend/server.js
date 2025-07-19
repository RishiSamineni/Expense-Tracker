require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware to handle CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-frontend-956m.onrender.com",
  "https://expense-tracker-2-e31h.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if sending cookies or auth headers
  })
);

// NOTE: Helmet (CSP) middleware was removed.
// If you want to re-add it for security, place it here,
// making sure 'fontSrc' is correctly configured:
/*
const helmet = require("helmet");
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https:", "'unsafe-inline'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"], // Allow fonts from self, https, and data URIs
      connectSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
*/

app.use(express.json());

connectDB();

// API Routes - These MUST come BEFORE the static file serving for the frontend
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve Uploads Folder - This can be before or after API routes, as its specific path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve Frontend Static Files in Production
// This block MUST be placed AFTER all API routes, so API requests are handled first.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/expense-tracker/build")));

  // Catch-all route to serve the frontend's index.html for any unmatched GET requests
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/expense-tracker/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
