const asyncHandler = require('express-async-handler');
const Appointment = require('../Model/AppointmentSchema');
const Doctor = require('../Model/DoctorSchema')


/**
 *  @desc    Create Appointment 
 *  @route   POST /api/appointment/createAppointment
 *  @access  Private
 */


module.exports.createAppointment = asyncHandler(async (req , res )=>{
  const {doctor , date , reason} = req.body;

  //1- Basic required Fields 
  if(!doctor || !date || !reason){
    return res.status(400).json({ message: 'Missing fields: doctor, date, reason are required' });
  }


  //2- Verify doctor exists
  const exsitsDoctor = await Doctor.findById(doctor)
  if(!exsitsDoctor) return res.status(404).json({message : "doctor not found "})

  // Validate the date format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
  }

  //3- valid Date 
  const when = new Date(date);
  if(Number.isNaN(when.getTime())) return res.status(400).json({message: 'Invalid date '});

    if (when <= new Date()) {
    return res.status(400).json({ message: 'Appointment date must be in the future' });
  }

  //4- prevent double booking 
  const clash = await Appointment.findOne({doctor , date : when});
  if(clash) return res.status(409).json({message : 'This time slot is already booked for the doctor'})



  const appointment = await Appointment.create({
    user : req.user.id,
    doctor ,
    date : when,
    reason
  })
  res.status(201).json(appointment)

})


/**
 *  @desc    Get All Appointment 
 *  @route   POST /api/appointment/allAppointment
 *  @access  Private
 */


module.exports.allAppointment = asyncHandler(async (req , res )=>{
  const userId = req.user.id;
  const appointments = await Appointment.find({ user: userId }).populate({path : 'doctor' , select : "name"  })
  res.status(200).json(appointments)

})


/**
 *  @desc    Delete  Appointment 
 *  @route   POST /api/appointment/dalAppointment/:id
 *  @access  Private
 */

module.exports.dalAppointment = asyncHandler(async (req , res )=>{
  const {id} = req.params
  const deleteAppo = await Appointment.findByIdAndDelete(id)
  if(!deleteAppo) return res.status(404).json({message : " Not Found Appointment"})

  res.status(200).json({ message: "Appointment deleted successfully" });
})


