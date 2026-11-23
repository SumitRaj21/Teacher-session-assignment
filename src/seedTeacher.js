require('dotenv').config();
const mongoose = require('mongoose');
const { connectDatabase } = require('./config/database');
const Teacher = require('./models/Teacher');

async function seedTeacher() {
  await connectDatabase();
  const teacher = await Teacher.findOneAndUpdate(
    { email: 'teacher.demo@example.com' },
    { fullName: 'Demo Teacher', email: 'teacher.demo@example.com', specialization: 'Mathematics', experience: 5 },
    { upsert: true, new: true }
  );
  console.log('Demo teacher ID:', teacher._id.toString());
  await mongoose.disconnect();
}
seedTeacher().catch((error) => {
  console.error(error);
  process.exit(1);
});
