const asyncHandler = require('express-async-handler');
const Doctor = require('../Model/DoctorSchema');
const Department = require('../Model/Department');
const Appointment = require('../Model/AppointmentSchema'); 

module.exports.getCounts = asyncHandler(async (req, res) => {
  const doctorCount = await Doctor.countDocuments();
  const departmentCount = await Department.countDocuments();
  const appointmentCount = await Appointment.countDocuments();

  res.status(200).json({
    doctors: doctorCount,
    departments: departmentCount,
    appointments: appointmentCount,
  });
});
