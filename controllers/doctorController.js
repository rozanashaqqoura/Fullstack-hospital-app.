const asyncHandler = require('express-async-handler')
const Doctor = require('../Model/DoctorSchema');
const multer  = require('multer')
const path = require('path');
const fs = require('fs');



const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '');
    cb(null, `doctor-${unique}${ext}`);
  }
});
const fileFilter = (req, file, cb) => {
  const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
  cb(ok ? null : new Error('Invalid image type (jpeg/png/webp only)'), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

/* expose middleware to use in route */
module.exports.uploadDoctorImage = upload.single('image');



/**
 *  @desc    Create Doctor 
 *  @route   POST /api/doctor/addDoctor
 *  @access  Private
 */


module.exports.CreateDoctor = asyncHandler(async (req, res) => {
  const { name ,specialty ,experienceYears, description } = req.body;
  const image = req.file ? req.file.fieldname : null ;
  
  if (! name || !specialty || !experienceYears || !description || image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newDoctor = await Doctor.create(req.body);

  res.status(201).json({messges : " successfully add doctor" , doctor :newDoctor })

});


/**
 *  @desc    Get All Doctor 
 *  @route   POST /api/doctor/getAllDoctor
 *  @access  Private
 */


module.exports.getAllDoctor = asyncHandler(async (req , res)=>{
  const doctor = await Doctor.find()
  if(!doctor){
    return res.status(400).json({message : "doctor not found"})
  }
  res.status(200).json({message : "succssfully " , doctor})

})


/**
 *  @desc    POST
 *  @route   POST /api/doctor/:id
 *  @access  Private
 */


module.exports.doctorID = asyncHandler(async (req , res)=>{
  const doctorId = req.params.id ;
  const doctor = await Doctor.findById(doctorId)
  if(!doctor){
    return res.status(400).json({message : "doctor not found"})
  }
  res.status(200).json({message : "succssfully " , doctor})

})

