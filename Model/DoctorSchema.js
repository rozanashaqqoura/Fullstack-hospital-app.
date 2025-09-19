const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experienceYears: Number,
  image: String,
  description: String,
},{timestamps: true});

module.exports = mongoose.model('Doctor', DoctorSchema);