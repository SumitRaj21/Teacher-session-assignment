const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  specialization: { type: String, required: true, trim: true },
  experience: { type: Number, required: true, min: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Teacher', teacherSchema);
