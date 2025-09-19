const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

module.exports.Protect = asyncHandler(async(req , res , next)=>{
  let token ;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
    jwt.verify(token , process.env.SECRT_KEY , (err , decoded)=>{
      if(err){
        res.status(400).json({message :"invalied token "})
      }else{
        console.log(decoded)
        req.user = decoded ;
        next();
      }

    })
  }
})