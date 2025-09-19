const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  } , 
  descrption : {
    type : String
  } ,
  image : {
    type : String
  }
} , {timestamps: true});


module.exports = mongoose.model('Department' ,departmentSchema )

