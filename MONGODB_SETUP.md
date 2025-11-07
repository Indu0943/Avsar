# MongoDB Backend Setup for AVSAR Donation System

## ✅ What's Been Set Up

I've created a complete MongoDB backend for your donation forms:

### Files Created:

1. **Database Connection**: `lib/mongodb.ts`
2. **Models**:
   - `models/MoneyDonation.ts` - Schema for money donations
   - `models/FoodDonation.ts` - Schema for food donations

3. **API Routes**:
   - `app/api/donations/money/route.ts` - POST & GET endpoints for money donations
   - `app/api/donations/food/route.ts` - POST & GET endpoints for food donations

4. **Updated Pages**:
   - `app/donation/money/page.tsx` - Now saves to MongoDB
   - `app/donation/food/page.tsx` - Now saves to MongoDB

5. **Environment**: `.env.local` - MongoDB connection string

## 🚀 How to Start MongoDB

### Option 1: Start MongoDB Service (Requires Admin)

Open PowerShell **as Administrator** and run:
```powershell
net start MongoDB
```

### Option 2: Start MongoDB Manually

Open Command Prompt **as Administrator** and run:
```cmd
mongod
```

### Option 3: Check if MongoDB is Running

```powershell
Get-Service MongoDB
```

## 📝 How It Works

### Money Donation Flow:
1. User fills form on `/donation/money`
2. Form submits to `/api/donations/money` (POST)
3. Data saved to MongoDB `MoneyDonation` collection
4. Success toast shown to user

### Food Donation Flow:
1. User fills form on `/donation/food`
2. Form submits to `/api/donations/food` (POST)
3. Data saved to MongoDB `FoodDonation` collection
4. Success toast shown to user

## 🗄️ Database Schema

### MoneyDonation Collection:
```javascript
{
  name: String (required)
  email: String (required)
  phone: String (required)
  amount: Number (required)
  frequency: String (one-time/monthly/yearly)
  message: String
  createdAt: Date
}
```

### FoodDonation Collection:
```javascript
{
  name: String (required)
  email: String (required)
  phone: String (required)
  foodType: String (required)
  quantity: String (required)
  address: String (required)
  pickupDate: Date (required)
  message: String
  createdAt: Date
}
```

## 🧪 Testing the API

### Test Money Donation:
```bash
curl -X POST http://localhost:3000/api/donations/money \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "amount": 1000,
    "frequency": "one-time"
  }'
```

### Test Food Donation:
```bash
curl -X POST http://localhost:3000/api/donations/food \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "foodType": "dry-food",
    "quantity": "10",
    "address": "123 Test Street",
    "pickupDate": "2025-10-20"
  }'
```

### Get All Donations:
```bash
# Get money donations
curl http://localhost:3000/api/donations/money

# Get food donations
curl http://localhost:3000/api/donations/food
```

## 🔧 MongoDB Connection Options

### Local MongoDB (Current Setup):
```
MONGODB_URI=mongodb://localhost:27017/avsar
```

### MongoDB Atlas (Cloud - Recommended for Production):
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avsar
```

## 📊 View Your Data

### Using MongoDB Compass (GUI):
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. View database: `avsar`
4. Collections: `moneydonations` and `fooddonations`

### Using MongoDB Shell:
```bash
mongosh
use avsar
db.moneydonations.find()
db.fooddonations.find()
```

## ✨ Features Implemented

- ✅ Form validation
- ✅ Loading states during submission
- ✅ Success/error toast notifications
- ✅ Automatic form reset after submission
- ✅ MongoDB connection pooling
- ✅ Error handling
- ✅ TypeScript types
- ✅ RESTful API endpoints

## 🎯 Next Steps

1. **Start MongoDB** (see instructions above)
2. **Restart your dev server** (if running)
3. **Test the forms** at:
   - http://localhost:3000/donation/money
   - http://localhost:3000/donation/food
4. **Check data** in MongoDB

## 🐛 Troubleshooting

**Error: "Cannot connect to MongoDB"**
- Make sure MongoDB service is running
- Check `.env.local` has correct connection string

**Error: "Access denied"**
- Run PowerShell/CMD as Administrator to start MongoDB

**Forms not submitting**
- Check browser console for errors
- Verify dev server is running
- Check MongoDB is running

## 📦 Dependencies Installed

- `mongodb` - Official MongoDB driver
- `mongoose` - MongoDB ODM for Node.js
