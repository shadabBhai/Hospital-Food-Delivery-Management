const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PantryStaff",
    required: true,
  },
  dietChartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DietChart",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Delivered"],
    default: "Pending",
  },
  assignedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
  deliveryNotes: { type: String },
});

module.exports = mongoose.model("Delivery", deliverySchema);
