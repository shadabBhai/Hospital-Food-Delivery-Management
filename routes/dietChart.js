const express = require("express");
const DietChart = require("../models/DietChart"); // Path to the DietChart model
const Patient = require("../models/Patient"); // Path to the Patient model
const router = express.Router();

// Create a new diet chart
router.post("/", async (req, res) => {
  try {
    const { patientId, morningMeal, eveningMeal, nightMeal } = req.body;

    // Validate patient ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const dietChart = new DietChart({
      patientId,
      morningMeal,
      eveningMeal,
      nightMeal,
    });

    const savedDietChart = await dietChart.save();
    res.status(201).json(savedDietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all diet charts
router.get("/", async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate("patientId");
    res.status(200).json(dietCharts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific diet chart by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dietChart = await DietChart.findById(id).populate("patientId");

    if (!dietChart) {
      return res.status(404).json({ error: "Diet chart not found" });
    }

    res.status(200).json(dietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a diet chart by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { morningMeal, eveningMeal, nightMeal } = req.body;

    const updatedDietChart = await DietChart.findByIdAndUpdate(
      id,
      { morningMeal, eveningMeal, nightMeal, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedDietChart) {
      return res.status(404).json({ error: "Diet chart not found" });
    }

    res.status(200).json(updatedDietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a diet chart by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDietChart = await DietChart.findByIdAndDelete(id);

    if (!deletedDietChart) {
      return res.status(404).json({ error: "Diet chart not found" });
    }

    res.status(200).json({ message: "Diet chart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
