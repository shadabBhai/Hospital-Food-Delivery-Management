const express = require("express");
const PantryStaff = require("../models/PantryStaff"); // Path to the PantryStaff model
const DietChart = require("../models/DietChart"); // Path to the DietChart model
const router = express.Router();

// Create a new pantry staff
router.post("/", async (req, res) => {
  try {
    const { name, contactInfo, location, role } = req.body;

    const pantryStaff = new PantryStaff({
      name,
      contactInfo,
      location,
      role,
    });

    const savedPantryStaff = await pantryStaff.save();
    res.status(201).json(savedPantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pantry staff
router.get("/", async (req, res) => {
  try {
    const pantryStaff = await PantryStaff.find().populate(
      "assignedTasks.dietChartId"
    );
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific pantry staff by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pantryStaff = await PantryStaff.findById(id).populate(
      "assignedTasks.dietChartId"
    );

    if (!pantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update pantry staff details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contactInfo, location, role } = req.body;

    const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(
      id,
      { name, contactInfo, location, role },
      { new: true }
    );

    if (!updatedPantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    res.status(200).json(updatedPantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign a task to pantry staff (Food Preparation or Delivery)
router.post("/:id/assignTask", async (req, res) => {
  try {
    const { id } = req.params;
    const { taskType, dietChartId } = req.body;

    // Check if the staff member exists
    const pantryStaff = await PantryStaff.findById(id);
    if (!pantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    // Check if the diet chart exists
    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ error: "Diet chart not found" });
    }

    const task = {
      taskType,
      dietChartId,
      status: "Pending",
      assignedAt: Date.now(),
    };

    pantryStaff.assignedTasks.push(task);
    await pantryStaff.save();

    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the status of a task assigned to pantry staff
router.put("/:id/updateTask/:taskId", async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status } = req.body;

    // Check if the pantry staff exists
    const pantryStaff = await PantryStaff.findById(id);
    if (!pantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    // Find the task by taskId
    const task = pantryStaff.assignedTasks.id(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update task status
    task.status = status;
    if (status === "Completed") {
      task.completedAt = Date.now();
    }

    await pantryStaff.save();
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete pantry staff by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPantryStaff = await PantryStaff.findByIdAndDelete(id);

    if (!deletedPantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }

    res.status(200).json({ message: "Pantry staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
