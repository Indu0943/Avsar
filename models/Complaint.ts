import mongoose from 'mongoose'

const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema)
