const asyncHandler = require('express-async-handler');
const Department = require('../Model/Department')
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


module.exports.GetAllDepartminte = asyncHandler(async(req , res)=>{
  const departments = await Department.find({})
  if(!departments) return res.status(500).json({message : 'Faild to fetch departments'})
  res.status(200).json(departments)
})

module.exports.createDepartment = asyncHandler(async (req , res )=>{
  const {name , descrption} = req.body;

  // const image = req.file ? req.file.fieldname : null ;

  if(!name) return res.status(400).json({message : "Name is required  "})
  const department = await Department.create({
    name , descrption , image : req.file?.filename
});
  res.status(200).json(department)

})




module.exports.deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Department.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'القسم مش موجود' });
  res.status(200).json({ message: 'تم حذف القسم بنجاح' });
});