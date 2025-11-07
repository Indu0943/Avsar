// Test script for Camera Upload with proper file structure
// Run with: node test-camera-upload.js

const testCameraUpload = async () => {
  const baseURL = 'http://localhost:3000'

  console.log('🧪 Testing Camera Upload with File Structure...\n')

  // Test with proper file structure
  console.log('1️⃣ Testing POST /api/helpline/camera with file objects')
  try {
    const testData = {
      name: 'Rajesh Kumar',
      contact: '+91 9876543210',
      address: '123 MG Road, Near City Park, Bangalore - 560001',
      files: [
        {
          originalName: 'test_dog.jpg',
          filename: '1760898352830_test_dog.jpg',
          path: '/uploads/camera/1760898352830_test_dog.jpg',
          size: 12345,
          type: 'image/jpeg',
        },
        {
          originalName: 'test_location.jpg',
          filename: '1760898352831_test_location.jpg',
          path: '/uploads/camera/1760898352831_test_location.jpg',
          size: 23456,
          type: 'image/jpeg',
        },
      ],
      fileCount: 2,
      urgencyLevel: 'high',
    }

    console.log('Sending data:', JSON.stringify(testData, null, 2))

    const response = await fetch(`${baseURL}/api/helpline/camera`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    console.log('Response status:', response.status)
    const data = await response.json()
    
    if (data.success) {
      console.log('✅ SUCCESS! Analysis created:')
      console.log(JSON.stringify(data, null, 2))
    } else {
      console.log('❌ FAILED:', data.error)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }

  console.log('\n2️⃣ Testing GET /api/helpline/camera')
  try {
    const response = await fetch(`${baseURL}/api/helpline/camera`)
    const data = await response.json()
    
    if (data.success) {
      console.log(`✅ Retrieved ${data.data.length} analyses`)
      if (data.data.length > 0) {
        console.log('Latest analysis:')
        console.log(JSON.stringify(data.data[0], null, 2))
      }
    } else {
      console.log('❌ FAILED:', data.error)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testCameraUpload()
