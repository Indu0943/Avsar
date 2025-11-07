import mongoose from 'mongoose'

const MembershipSchema = new mongoose.Schema({
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
  },
  membershipType: {
    type: String,
    enum: ['volunteer', 'supporter', 'lifetime'],
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
  message: {
    type: String,
  },
  agreeTerms: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Membership || mongoose.model('Membership', MembershipSchema)
