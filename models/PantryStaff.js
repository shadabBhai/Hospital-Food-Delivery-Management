const mongoose = require("mongoose");

const pantryStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  role: {
    type: String,
    enum: ["Food Preparation", "Delivery"],
    required: true,
  },
  assignedTasks: [
    {
      taskType: {
        type: String,
        enum: ["Preparation", "Delivery"],
        required: true,
      },
      dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart" },
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
      },
      assignedAt: { type: Date, default: Date.now },
      completedAt: { type: Date },
    },
  ],
});

module.exports = mongoose.model("PantryStaff", pantryStaffSchema);
