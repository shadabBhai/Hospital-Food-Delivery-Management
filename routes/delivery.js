const express = require("express");
const Delivery = require("../models/Delivery");
const PantryStaff = require("../models/PantryStaff");
const DietChart = require("../models/DietChart");
const Patient = require("../models/Patient");
const router = express.Router();

// Create a new delivery task
router.post("/", async (req, res) => {
  try {
    const { staffId, dietChartId, patientId, deliveryNotes } = req.body;

    // Check if the pantry staff exists
    const pantryStaff = await PantryStaff.findById(staffId);
    if (!pantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    // Check if the diet chart exists
    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ error: "Diet chart not found" });
    }

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const newDelivery = new Delivery({
      staffId,
      dietChartId,
      patientId,
      deliveryNotes,
    });

    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all deliveries
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("staffId")
      .populate("dietChartId")
      .populate("patientId");
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific delivery by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findById(id)
      .populate("staffId")
      .populate("dietChartId")
      .populate("patientId");

    if (!delivery) {
      return res.status(404).json({ error: "Delivery task not found" });
    }

    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update delivery status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus, deliveryNotes } = req.body;

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      return res.status(404).json({ error: "Delivery task not found" });
    }

    delivery.deliveryStatus = deliveryStatus;
    delivery.deliveryNotes = deliveryNotes;

    if (deliveryStatus === "Delivered") {
      delivery.deliveredAt = Date.now();
    }

    const updatedDelivery = await delivery.save();
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete delivery task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDelivery = await Delivery.findByIdAndDelete(id);

    if (!deletedDelivery) {
      return res.status(404).json({ error: "Delivery task not found" });
    }

    res.status(200).json({ message: "Delivery task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
