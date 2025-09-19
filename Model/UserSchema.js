const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  name :{
    type: String,
    required: true,
    trim: true,
  } ,
  email : {
    type: String,
    unique: true,
    required: true,
    trim: true,
  } ,
  password : {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Do not return password by default
  },
  role : {
    type:String ,
    default : "user"
  }
} , {timestamps: true});


//Hashing Password 
UserSchema.pre('save' , async function(next){
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password , salt)
   next();
})

//Method to match password
UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model('User', UserSchema);