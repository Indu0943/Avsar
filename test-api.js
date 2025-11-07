// Test script to check if MongoDB API is working
const testMoneyDonation = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/donations/money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        amount: 1000,
        frequency: 'one-time',
        message: 'Test donation'
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ SUCCESS! Donation saved to MongoDB');
      console.log('Donation ID:', data.data._id);
    } else {
      console.log('❌ ERROR:', data.error);
    }
  } catch (error) {
    console.log('❌ FETCH ERROR:', error.message);
  }
};

testMoneyDonation();
