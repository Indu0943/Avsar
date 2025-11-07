// Script to create an admin user
// Usage: node create-admin.js

const mongoose = require('mongoose')

// IMPORTANT: Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avsar'

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'moderator'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

async function createAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    
    const Admin = mongoose.model('Admin', AdminSchema)
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!')
      console.log('Username: admin')
      console.log('If you forgot the password, delete the admin user from MongoDB and run this script again.')
      process.exit(0)
    }
    
    // For security, we'll let bcrypt hash the password when the model saves
    // But for this script, we'll use bcryptjs directly
    const bcrypt = require('bcryptjs')
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash('admin123', salt)
    
    const admin = new Admin({
      username: 'admin',
      email: 'admin@avsar.com',
      password: hashedPassword,
      role: 'super-admin',
      isActive: true,
      createdAt: new Date(),
    })
    
    await admin.save()
    
    console.log('\n🎉 Admin user created successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📝 Login Credentials:')
    console.log('   Username: admin')
    console.log('   Email: admin@avsar.com')
    console.log('   Password: admin123')
    console.log('   Role: super-admin')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n⚠️  IMPORTANT: Change the password after first login!')
    console.log('🔗 Login at: http://localhost:3000/admin/login\n')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error.message)
    process.exit(1)
  }
}

// Run the function
createAdmin()
