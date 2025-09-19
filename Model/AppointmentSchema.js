const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } ,
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  date : Date ,
  reason : String 
} , {timestamps: true});

module.exports = mongoose.model('Appointment', AppointmentSchema);