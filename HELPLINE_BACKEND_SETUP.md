# Helpline Backend Setup for AVSAR

## ✅ What's Been Created

Complete MongoDB backend for all helpline modules:

### Files Created:

1. **Models**:
   - `models/Complaint.ts` - Schema for complaint submissions
   - `models/CameraAnalysis.ts` - Schema for photo analysis records

2. **API Routes**:
   - `app/api/helpline/complaints/route.ts` - POST & GET endpoints for complaints
   - `app/api/helpline/camera/route.ts` - POST & GET endpoints for photo analysis

3. **Updated Pages**:
   - `app/helpline/complaint/page.tsx` - Now saves to MongoDB
   - `app/helpline/camera/page.tsx` - Now saves analysis to MongoDB

4. **Test Script**: `test-helpline-api.js` - Test all helpline APIs

## 📋 Database Schemas

### Complaint Collection:
```javascript
{
  name: String (required)
  contact: String (required)
  address: String (required)
  complaint: String (required)
  status: String (pending/in-progress/resolved)
  createdAt: Date
}
```

### CameraAnalysis Collection:
```javascript
{
  fileNames: [String] (required)
  fileCount: Number (required)
  recommendations: [String]
  urgencyLevel: String (low/medium/high/critical)
  createdAt: Date
}
```

## 🚀 How to Use

### Step 1: Ensure MongoDB is Running
```powershell
Get-Service MongoDB
```

If not running:
```powershell
net start MongoDB
```

### Step 2: Restart Your Dev Server
**IMPORTANT**: Stop and restart your Next.js dev server to recognize new API routes.

```bash
# Stop with Ctrl + C, then:
npm run dev
```

### Step 3: Test the Forms

1. **Complaint Form**: http://localhost:3000/helpline/complaint
   - Fill in name, contact, address, and complaint details
   - Submit and see success toast at top-right

2. **Camera Analysis**: http://localhost:3000/helpline/camera
   - Upload 1-10 photos
   - Click "Analyze Photos"
   - See AI-generated recommendations

3. **Call Page**: http://localhost:3000/helpline/call
   - No backend needed (just displays call info)

## 🧪 Test APIs Directly

```bash
node test-helpline-api.js
```

This will test:
- Creating and retrieving complaints
- Creating and retrieving camera analyses

## 📊 View Data in MongoDB

### Using MongoDB Compass:
1. Connect to: `mongodb://localhost:27017`
2. Database: `avsar`
3. Collections: `complaints` and `cameraanalyses`

### Using MongoDB Shell:
```bash
mongosh
use avsar
db.complaints.find()
db.cameraanalyses.find()
```

## ✨ Features Implemented

### Complaint Form:
- ✅ Form validation
- ✅ Loading states during submission
- ✅ Success/error toast notifications (5 seconds, top-right)
- ✅ Automatic form reset after submission
- ✅ Status tracking (pending/in-progress/resolved)

### Camera Analysis:
- ✅ Multiple file upload support
- ✅ AI-powered recommendations (simulated)
- ✅ Urgency level assessment
- ✅ Loading animation during analysis
- ✅ Success toast notifications
- ✅ Analysis history stored in database

### Call Page:
- ✅ No backend needed
- ✅ Direct call functionality
- ✅ Emergency information display

## 🎯 Toast Notifications

All success messages now appear:
- **Position**: Top-right corner
- **Duration**: 5 seconds auto-dismiss
- **Z-index**: 9999 (always visible)
- **Style**: Clean, modern design with animations

## 🐛 Troubleshooting

**Toast not showing?**
1. Restart your dev server (Ctrl + C, then `npm run dev`)
2. Clear browser cache (Ctrl + Shift + R)
3. Check browser console (F12) for errors

**API not working?**
1. Verify MongoDB is running: `Get-Service MongoDB`
2. Check `.env.local` has: `MONGODB_URI=mongodb://localhost:27017/avsar`
3. Restart dev server after creating new API routes

**Form not submitting?**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API requests
4. Verify all required fields are filled

## 📦 Summary

All three helpline modules now have complete backend integration:

| Module | Backend | Status |
|--------|---------|--------|
| Complaint | ✅ MongoDB + API | Complete |
| Camera | ✅ MongoDB + API | Complete |
| Call | ⚪ No backend needed | N/A |

**Next Steps:**
1. Restart your dev server
2. Test all forms
3. Check MongoDB for saved data
4. Verify toast notifications appear correctly
