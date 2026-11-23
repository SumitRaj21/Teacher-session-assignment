const mongoose = require('mongoose');
const { Schema } = mongoose;

const SESSION_STATUS = Object.freeze({ AVAILABLE: 'AVAILABLE', BOOKED: 'BOOKED', COMPLETED: 'COMPLETED' });
const sessionSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: Object.values(SESSION_STATUS), default: SESSION_STATUS.AVAILABLE, required: true },
  completedAt: { type: Date, default: null }
}, { timestamps: true });
sessionSchema.index({ status: 1, startTime: 1 });
sessionSchema.index({ userId: 1, status: 1, startTime: 1 });
module.exports = mongoose.model('Session', sessionSchema);
module.exports.SESSION_STATUS = SESSION_STATUS;
