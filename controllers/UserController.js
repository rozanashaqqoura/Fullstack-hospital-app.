const asyncHandler = require('express-async-handler')
const User = require('../Model/UserSchema');
const jwt = require('jsonwebtoken');

module.exports.registerUser =  asyncHandler(async (req , res )=>{
   const {name , email , password  , role} = req.body ;
   if(!name || !email || !password ){
    return res.status(400).json({message : "All Fieldes are required "})

   }
   const userExist = await User.findOne({email});
   if(userExist) return res.status(400).json({message : "User Already exists"});


   const newUser = await User.create({name , email , password , role});

   const token = jwt.sign({email , id : newUser._id , role:newUser.role},process.env.SECRT_KEY , {expiresIn:"30d"});

   res.status(201).json({message : "User Created Successfully " , user : newUser , token});

})


/**
 *  @desc    Create Doctor 
 *  @route   POST /api/doctor/addDoctor
 *  @access  Private
 */

// Login User
module.exports.LoginUser = asyncHandler(async (req, res) => {
  const { email , password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ email, id: user._id  , role : user.role}, process.env.SECRT_KEY, { expiresIn: "30d" });
  res.status(200).json({ message: "Login successful", user, token });

});