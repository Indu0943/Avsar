import mongoose from 'mongoose'

const FoodDonationSchema = new mongoose.Schema({
  name: {
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
  foodType: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.FoodDonation || mongoose.model('FoodDonation', FoodDonationSchema)
