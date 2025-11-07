import mongoose from 'mongoose'

const AdoptionApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  animalType: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'other'],
    required: true,
  },
  experience: {
    type: String,
    enum: ['first-time', 'some', 'extensive'],
    required: true,
  },
  homeType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'farmhouse'],
    required: true,
  },
  hasOtherPets: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  agreeTerms: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.AdoptionApplication || mongoose.model('AdoptionApplication', AdoptionApplicationSchema)
