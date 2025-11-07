// Test script for Membership API
// Run with: node test-membership-api.js

const testMembershipAPI = async () => {
  const baseURL = 'http://localhost:3000'

  console.log('🧪 Testing Membership API...\n')

  // Test POST - Create membership
  console.log('1️⃣ Testing POST /api/memberships')
  try {
    const response = await fetch(`${baseURL}/api/memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        occupation: 'Software Engineer',
        membershipType: 'volunteer',
        interests: ['Animal Rescue', 'Medical Care', 'Fundraising'],
        message: 'I love animals and want to help rescue and care for them.',
        agreeTerms: true,
      }),
    })

    const data = await response.json()
    console.log('✅ POST Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ POST Error:', error.message)
  }

  console.log('\n2️⃣ Testing GET /api/memberships')
  try {
    const response = await fetch(`${baseURL}/api/memberships`)
    const data = await response.json()
    console.log('✅ GET Response:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('❌ GET Error:', error.message)
  }
}

testMembershipAPI()
