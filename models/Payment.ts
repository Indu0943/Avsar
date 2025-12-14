import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MoneyDonation',
    required: true,
  },
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
  paymentMethod: {
    type: String,
    default: 'card',
  },
  cardLastFour: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  transactionId: {
    type: String,
  },
  paymentGateway: {
    type: String,
    default: 'simulated',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add indexes for better query performance
PaymentSchema.index({ donationId: 1 })
PaymentSchema.index({ email: 1 })
PaymentSchema.index({ createdAt: -1 })
PaymentSchema.index({ paymentStatus: 1 })

// Update the updatedAt field before saving
PaymentSchema.pre('save', function (next) {
  this.updatedAt = new Date(Date.now())
  next()
})

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)