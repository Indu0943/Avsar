# 🚀 AVSAR Quick Reference Card

## ⚡ Quick Start (3 Steps)

```bash
# 1. Check MongoDB
Get-Service MongoDB

# 2. Restart Dev Server
npm run dev

# 3. Test Everything
# Open browser and test all forms!
```

---

## 📍 All URLs

| Feature | URL | Status |
|---------|-----|--------|
| Money Donation | http://localhost:3000/donation/money | ✅ |
| Food Donation | http://localhost:3000/donation/food | ✅ |
| Membership | http://localhost:3000/join | ✅ |
| Complaint | http://localhost:3000/helpline/complaint | ✅ |
| Camera Upload | http://localhost:3000/helpline/camera | ✅ 📸 |
| Emergency Call | http://localhost:3000/helpline/call | ✅ |
| Admin Panel | http://localhost:3000/admin/uploads | ✅ 🔒 |

---

## 🗄️ MongoDB Quick Commands

```bash
# Connect
mongosh

# Use database
use avsar

# View collections
show collections

# Query data
db.moneydonations.find()
db.fooddonations.find()
db.memberships.find()
db.complaints.find()
db.cameraanalyses.find()

# Count records
db.cameraanalyses.countDocuments()

# View recent uploads
db.cameraanalyses.find().sort({createdAt: -1}).limit(5)

# Exit
exit
```

---

## 📁 File Locations

```
Uploaded Files:     public/uploads/camera/
MongoDB Data:       C:/data/db/ (default)
Environment:        .env.local
API Routes:         app/api/
Models:             models/
Test Scripts:       test-*.js
Documentation:      *.md files
```

---

## 🧪 Test Commands

```bash
# Test donation APIs
node test-api.js

# Test membership API
node test-membership-api.js

# Test helpline APIs
node test-helpline-api.js

# Check uploaded files
dir public\uploads\camera
```

---

## 🔧 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Toast not showing | Restart dev server |
| API not working | Check MongoDB is running |
| Files not uploading | Check `public/uploads/camera/` exists |
| Form not submitting | Check browser console for errors |
| Database error | Verify `.env.local` has correct URI |

---

## 📊 Database Collections

```
avsar
├── moneydonations      (Money donations)
├── fooddonations       (Food donations)
├── memberships         (Join applications)
├── complaints          (Helpline complaints)
└── cameraanalyses      (Photo uploads + analysis)
```

---

## 🎯 Features Checklist

- [x] Money donation form
- [x] Food donation form
- [x] Membership form
- [x] Complaint form
- [x] Camera upload with file storage
- [x] Emergency call page
- [x] Admin panel for uploads
- [x] Toast notifications (5 sec)
- [x] Form validation
- [x] Loading states
- [x] Error handling
- [x] MongoDB integration
- [x] File access via URL

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `.env.local` | MongoDB connection string |
| `lib/mongodb.ts` | Database connection |
| `app/api/upload/route.ts` | File upload handler |
| `models/CameraAnalysis.ts` | File info schema |
| `app/admin/uploads/page.tsx` | View uploads |

---

## 📸 File Upload Info

**Max Files:** 10 per upload  
**Max Size:** 5MB per file  
**Formats:** JPG, PNG, HEIC, WebP  
**Storage:** `public/uploads/camera/`  
**Access:** `http://localhost:3000/uploads/camera/[filename]`

---

## 🎨 Toast Settings

**Duration:** 5 seconds  
**Position:** Top-right  
**Z-index:** 9999  
**Auto-dismiss:** Yes  

---

## 🚨 Emergency Commands

```bash
# Restart MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check MongoDB status
Get-Service MongoDB

# Kill Node process (if stuck)
taskkill /F /IM node.exe

# Clear Next.js cache
rmdir /s /q .next
npm run dev
```

---

## 📞 Support Checklist

Before asking for help:
1. [ ] MongoDB is running
2. [ ] Dev server is restarted
3. [ ] Browser cache is cleared
4. [ ] Checked browser console
5. [ ] Checked Network tab
6. [ ] Verified `.env.local` exists
7. [ ] Checked file permissions

---

## 🎉 Success Indicators

✅ Toast appears after form submission  
✅ Form resets after success  
✅ Data appears in MongoDB  
✅ Files saved in `public/uploads/camera/`  
✅ Files accessible via URL  
✅ Admin panel shows uploads  

---

## 📚 Documentation Files

1. `MONGODB_SETUP.md` - Donation setup
2. `RESTART_INSTRUCTIONS.md` - Membership setup
3. `HELPLINE_BACKEND_SETUP.md` - Helpline setup
4. `FILE_UPLOAD_GUIDE.md` - File upload guide
5. `COMPLETE_BACKEND_SUMMARY.md` - Backend overview
6. `FINAL_SETUP_COMPLETE.md` - Complete summary
7. `SYSTEM_ARCHITECTURE.md` - System architecture
8. `QUICK_REFERENCE.md` - This file

---

## 🎯 Next Actions

1. **Restart dev server** (if not done)
2. **Test all forms** (6 pages)
3. **Upload some photos** (camera page)
4. **Check admin panel** (/admin/uploads)
5. **Verify MongoDB** (mongosh)
6. **Check file storage** (public/uploads/camera/)

---

## ⚡ One-Line Commands

```bash
# Full restart
taskkill /F /IM node.exe & npm run dev

# Check everything
Get-Service MongoDB; dir public\uploads\camera; mongosh --eval "use avsar; db.stats()"

# View latest upload
mongosh --eval "use avsar; db.cameraanalyses.find().sort({createdAt:-1}).limit(1).pretty()"
```

---

## 🎊 You're All Set!

Everything is configured and ready to use.  
Just restart your dev server and start testing!

**Happy coding!** 💻✨
