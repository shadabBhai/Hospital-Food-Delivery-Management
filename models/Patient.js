const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diseases: { type: String },
  allergies: { type: String },
  roomNumber: { type: String, required: true },
  bedNumber: { type: String, required: true },
  floorNumber: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactInfo: { type: String },
  emergencyContact: { type: String },
});

module.exports = mongoose.model("Patient", patientSchema);
