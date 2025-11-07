import mongoose from 'mongoose'

const FileInfoSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const CameraAnalysisSchema = new mongoose.Schema({
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
  files: {
    type: [FileInfoSchema],
    required: true,
  },
  fileCount: {
    type: Number,
    required: true,
  },
  recommendations: {
    type: [String],
    default: [],
  },
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Clear the model if it exists to ensure we use the updated schema
if (mongoose.models.CameraAnalysis) {
  delete mongoose.models.CameraAnalysis
}

export default mongoose.model('CameraAnalysis', CameraAnalysisSchema)
