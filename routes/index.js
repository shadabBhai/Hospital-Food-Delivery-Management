const express = require("express");
const patientsRouter = require("./patients");
const dietChartRoutes = require("./dietChart");
const pantryStaffRoutes = require("./pantryStaff");
const deliveryRoutes = require("./delivery");
const authRoutes = require("./auth");

const router = express.Router();

// Define your routes here
router.use("/patients", patientsRouter);
router.use("/dietcharts", dietChartRoutes);
router.use("/pantrystaff", pantryStaffRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/auth", authRoutes);

module.exports = router;
