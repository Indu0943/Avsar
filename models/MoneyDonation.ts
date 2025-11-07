import mongoose from 'mongoose'

const MoneyDonationSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'yearly'],
    default: 'one-time',
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.MoneyDonation || mongoose.model('MoneyDonation', MoneyDonationSchema)
