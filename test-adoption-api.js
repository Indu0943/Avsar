// Test script for Adoption API
const API_BASE = 'http://localhost:3000/api'

// Test data for adoption application
const testAdoptionData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main Street, Apartment 4B',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  occupation: 'Software Engineer',
  animalType: 'dog',
  experience: 'some',
  homeType: 'apartment',
  hasOtherPets: 'no',
  reason: 'I love animals and want to provide a loving home for a pet. I have a stable job and enough time to care for a pet properly.',
  agreeTerms: true
}

// Test POST - Create adoption application
async function testCreateAdoption() {
  console.log('🧪 Testing POST /api/adoptions - Create adoption application')
  
  try {
    const response = await fetch(`${API_BASE}/adoptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testAdoptionData)
    })
    
    const result = await response.json()
    console.log('✅ Response:', result)
    
    if (result.success) {
      console.log('✅ Adoption application created successfully!')
      console.log('📝 Application ID:', result.data._id)
      return result.data._id
    } else {
      console.log('❌ Failed to create adoption application:', result.error)
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Test GET - Fetch all adoption applications
async function testGetAdoptions() {
  console.log('\n🧪 Testing GET /api/adoptions - Fetch all applications')
  
  try {
    const response = await fetch(`${API_BASE}/adoptions`)
    const result = await response.json()
    
    console.log('✅ Response:', result)
    
    if (result.success) {
      console.log('✅ Fetched adoption applications successfully!')
      console.log('📊 Total applications:', result.data.length)
      
      if (result.data.length > 0) {
        console.log('📋 Latest application:')
        const latest = result.data[0]
        console.log(`   - Name: ${latest.firstName} ${latest.lastName}`)
        console.log(`   - Email: ${latest.email}`)
        console.log(`   - Animal Type: ${latest.animalType}`)
        console.log(`   - Status: ${latest.status}`)
        console.log(`   - Created: ${new Date(latest.createdAt).toLocaleString()}`)
      }
    } else {
      console.log('❌ Failed to fetch adoption applications:', result.error)
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Test with invalid data
async function testInvalidData() {
  console.log('\n🧪 Testing POST /api/adoptions - Invalid data')
  
  const invalidData = {
    firstName: 'John',
    // Missing required fields
  }
  
  try {
    const response = await fetch(`${API_BASE}/adoptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData)
    })
    
    const result = await response.json()
    console.log('✅ Response:', result)
    
    if (!result.success) {
      console.log('✅ Correctly rejected invalid data!')
    } else {
      console.log('❌ Should have rejected invalid data')
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Adoption API Tests...\n')
  
  await testCreateAdoption()
  await testGetAdoptions()
  await testInvalidData()
  
  console.log('\n✨ All tests completed!')
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests()
}

module.exports = {
  testCreateAdoption,
  testGetAdoptions,
  testInvalidData,
  runTests
}