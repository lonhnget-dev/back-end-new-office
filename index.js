const express = require("express");
const cors = require("cors");
const db = require("./models");
require('dotenv').config();

// 1. Import Routes
const factoryRoute = require("./src/routes/factory");
const provinceRoute = require("./src/routes/province");
const districtRoute = require("./src/routes/district"); // Added
const communeRoute = require("./src/routes/commune");   // Added
const villageRoute = require("./src/routes/village");   // Added
const locationRoutes = require('./src/routes/location');
const inspectionRoutes = require('./src/routes/inspectionRoutes');

const app = express();
const port = 3000;

// 2. Middleware
app.use(cors({
  origin: 'https://inspect-office-five.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Routes
app.use("/api/v1/factories", factoryRoute);
app.use("/api/v1/provinces", provinceRoute);
app.use("/api/v1/districts", districtRoute); // Registered
app.use("/api/v1/communes", communeRoute);   // Registered
app.use("/api/v1/villages", villageRoute);   // Registered
// Add this with your other app.use statements
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/inspections', inspectionRoutes);

// 4. Database Connection & Server Start
// Using { alter: true } keeps your data while updating table structures
db.sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("✅ Database synced successfully (Alter mode active)");
    app.listen(port, () => {
      console.log(`🚀 Server live at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Database Error:", err.message);
  });

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Helpful for debugging in terminal
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

module.exports = app;