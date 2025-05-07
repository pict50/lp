const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No:Number,
  WAD:Number,
  DSBDA:Number,
  CNS:Number,
  CC:Number,
  AI:Number,
});

module.exports = mongoose.model('Student', studentSchema)