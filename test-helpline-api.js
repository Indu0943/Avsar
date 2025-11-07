// Test script for Helpline APIs
// Run with: node test-helpline-api.js

const testHelplineAPIs = async () => {
  const baseURL = 'http://localhost:3000'

  console.log('🧪 Testing Helpline APIs...\n')

  // Test Complaint API
  console.log('1️⃣ Testing POST /api/helpline/complaints')
  try {
    const response = await fetch(`${baseURL}/api/helpline/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Rajesh Kumar',
        contact: '+91 9876543210',
        address: '123 MG Road, Bangalore, Karnataka - 560001',
        complaint: 'Found an injured dog near the park. The dog appears to have a broken leg and is in severe pain. Immediate medical attention required.',
      }),
    })

    const data = await response.json()
    console.log('✅ POST Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ POST Error:', error.message)
  }

  console.log('\n2️⃣ Testing GET /api/helpline/complaints')
  try {
    const response = await fetch(`${baseURL}/api/helpline/complaints`)
    const data = await response.json()
    console.log('✅ GET Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ GET Error:', error.message)
  }

  // Test Camera Analysis API
  console.log('\n3️⃣ Testing POST /api/helpline/camera')
  try {
    const response = await fetch(`${baseURL}/api/helpline/camera`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileNames: ['injured_dog_1.jpg', 'injured_dog_2.jpg', 'location.jpg'],
        fileCount: 3,
      }),
    })

    const data = await response.json()
    console.log('✅ POST Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ POST Error:', error.message)
  }

  console.log('\n4️⃣ Testing GET /api/helpline/camera')
  try {
    const response = await fetch(`${baseURL}/api/helpline/camera`)
    const data = await response.json()
    console.log('✅ GET Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ GET Error:', error.message)
  }
}

testHelplineAPIs()
