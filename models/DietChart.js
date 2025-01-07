const mongoose = require("mongoose");

const DietChartSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient collection
    required: true,
  },
  morningMeal: {
    meal: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, default: "" }, // e.g., "no salt"
  },
  eveningMeal: {
    meal: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, default: "" },
  },
  nightMeal: {
    meal: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

DietChartSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Update the timestamp whenever the document is saved
  next();
});

module.exports = mongoose.model("DietChart", DietChartSchema);
