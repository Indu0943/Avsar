// Test script for Contact API
const API_BASE = 'http://localhost:3000/api'

// Test data for contact form
const testContactData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phone: '+919876543210',
  subject: 'Inquiry about Pet Adoption Process',
  message: 'Hi, I am interested in adopting a dog and would like to know more about the adoption process, requirements, and available pets. Could you please provide me with detailed information?',
  inquiryType: 'adoption'
}

// Test POST - Create contact submission
async function testCreateContact() {
  console.log('🧪 Testing POST /api/contact - Create contact submission')
  
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContactData)
    })
    
    const result = await response.json()
    console.log('✅ Response:', result)
    
    if (result.success) {
      console.log('✅ Contact form submitted successfully!')
      console.log('📝 Contact ID:', result.data._id)
      console.log('📧 Email:', result.data.email)
      console.log('📋 Subject:', result.data.subject)
      console.log('🏷️ Inquiry Type:', result.data.inquiryType)
      console.log('📊 Status:', result.data.status)
      return result.data._id
    } else {
      console.log('❌ Failed to submit contact form:', result.error)
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Test GET - Fetch all contact submissions
async function testGetContacts() {
  console.log('\n🧪 Testing GET /api/contact - Fetch all contact submissions')
  
  try {
    const response = await fetch(`${API_BASE}/contact`)
    const result = await response.json()
    
    console.log('✅ Response:', result)
    
    if (result.success) {
      console.log('✅ Fetched contact submissions successfully!')
      console.log('📊 Total submissions:', result.data.length)
      
      if (result.data.length > 0) {
        console.log('📋 Latest submission:')
        const latest = result.data[0]
        console.log(`   - Name: ${latest.firstName} ${latest.lastName}`)
        console.log(`   - Email: ${latest.email}`)
        console.log(`   - Subject: ${latest.subject}`)
        console.log(`   - Inquiry Type: ${latest.inquiryType}`)
        console.log(`   - Status: ${latest.status}`)
        console.log(`   - Priority: ${latest.priority}`)
        console.log(`   - Created: ${new Date(latest.createdAt).toLocaleString()}`)
      }
    } else {
      console.log('❌ Failed to fetch contact submissions:', result.error)
    }
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Test with different inquiry types
async function testDifferentInquiryTypes() {
  console.log('\n🧪 Testing different inquiry types')
  
  const inquiryTypes = ['general', 'donation', 'volunteer', 'helpline', 'other']
  
  for (const type of inquiryTypes) {
    const testData = {
      ...testContactData,
      firstName: `Test${type.charAt(0).toUpperCase() + type.slice(1)}`,
      email: `test.${type}@example.com`,
      subject: `Test ${type} inquiry`,
      inquiryType: type
    }
    
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log(`✅ ${type} inquiry submitted successfully`)
      } else {
        console.log(`❌ ${type} inquiry failed:`, result.error)
      }
    } catch (error) {
      console.log(`❌ ${type} inquiry error:`, error.message)
    }
  }
}

// Test with invalid data
async function testInvalidData() {
  console.log('\n🧪 Testing POST /api/contact - Invalid data')
  
  const invalidData = {
    firstName: 'John',
    // Missing required fields
  }
  
  try {
    const response = await fetch(`${API_BASE}/contact`, {
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
  console.log('🚀 Starting Contact API Tests...\n')
  
  await testCreateContact()
  await testGetContacts()
  await testDifferentInquiryTypes()
  await testInvalidData()
  
  console.log('\n✨ All tests completed!')
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests()
}

module.exports = {
  testCreateContact,
  testGetContacts,
  testDifferentInquiryTypes,
  testInvalidData,
  runTests
}