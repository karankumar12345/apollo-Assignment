import mongoose, { Schema, models } from 'mongoose';

const doctorSchema = new Schema({
  name: String,
  specialization: String,
  experience: Number,
  consultationFee: Number,
  rating: Number,
  gender: String,
  imageUrl: String,
}, { timestamps: true });

export default models.Doctor || mongoose.model('Doctor', doctorSchema);
