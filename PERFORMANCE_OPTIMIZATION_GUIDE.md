# Performance Optimization Guide

This guide explains the optimizations we've implemented and additional steps you can take to further improve your Next.js application's performance.

## Implemented Optimizations

### 1. Image Optimization
- Replaced external hero images with local optimized versions
- Added proper image sizing and compression
- Used WebP format for better compression

### 2. Code Splitting & Lazy Loading
- Implemented lazy loading for heavy components like framer-motion
- Used React Suspense for better loading states
- Split large components into smaller chunks

### 3. Component Memoization
- Added `memo()` to Navigation component
- Used `useMemo` and `useCallback` for expensive computations
- Optimized re-renders in navigation

### 4. Next.js Configuration
- Enabled `swcMinify` for better minification
- Added `compress` for HTTP compression
- Configured `modularizeImports` to reduce bundle size
- Optimized image settings

### 5. Bundle Size Reduction
- Removed unused dependencies
- Optimized import statements
- Used tree-shaking friendly imports

## Additional Optimization Opportunities

### 1. Database Connection Pooling
Ensure your MongoDB connection is properly pooled:

```javascript
// In lib/mongodb.ts
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  }
}
```

### 2. API Route Caching
Add caching to your API routes:

```javascript
// In app/api/donations/money/route.ts
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import MoneyDonation from '@/models/MoneyDonation'

// Add caching headers
export async function GET() {
  try {
    await connectDB()
    
    const donations = await MoneyDonation.find({}).sort({ createdAt: -1 })
    
    const response = NextResponse.json(
      { success: true, data: donations },
      { status: 200 }
    )
    
    // Add caching headers
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
    
    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
```

### 3. Static Site Generation (SSG)
For pages that don't change frequently, use SSG:

```javascript
// In app/page.tsx or other static pages
import { getAllDonations } from '@/lib/donationService'

export async function getStaticProps() {
  const donations = await getAllDonations()
  
  return {
    props: {
      donations,
    },
    revalidate: 60, // Revalidate at most once every 60 seconds
  }
}
```

### 4. Font Optimization
Preload critical fonts:

```html
<!-- In app/layout.tsx Head section -->
<link
  rel="preload"
  href="/fonts/inter-var-latin.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### 5. Bundle Analysis
Regularly analyze your bundle size:

```bash
# Install bundle analyzer
pnpm add @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

### 6. Server-Side Rendering (SSR) Optimization
For dynamic pages, optimize SSR:

```javascript
// Use selective hydration
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('@/components/HeavyComponent'))

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Monitoring Performance

### 1. Web Vitals
Monitor Core Web Vitals using Next.js built-in reporting:

```javascript
// In app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  
  return <Component {...pageProps} />
}
```

### 2. Performance Monitoring
Use tools like:
- Lighthouse in Chrome DevTools
- WebPageTest.org
- GTmetrix
- Next.js Speed Insights

## Deployment Optimization

### 1. Vercel (Recommended)
Vercel provides automatic optimizations for Next.js apps:
- Automatic static optimization
- Serverless functions
- Global CDN
- Automatic HTTPS
- Instant cache invalidation

### 2. Custom Server
If using a custom server, ensure proper caching:

```javascript
// server.js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  
  // Cache static assets
  server.use('/_next/static', express.static('.next/static', {
    maxAge: '1y',
    immutable: true,
  }))
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

## Performance Testing

### 1. Lighthouse Testing
Run Lighthouse audits regularly:
1. Open Chrome DevTools
2. Go to the Lighthouse tab
3. Run audit with "Performance" selected
4. Fix issues based on recommendations

### 2. WebPageTest
Use WebPageTest.org for detailed performance analysis:
- First Contentful Paint (FCP)
- Speed Index
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

## Best Practices Summary

1. **Images**: Always optimize and compress images
2. **Code Splitting**: Use dynamic imports for non-critical components
3. **Caching**: Implement proper HTTP caching headers
4. **Minification**: Enable JavaScript/CSS minification
5. **Compression**: Use Gzip/Brotli compression
6. **CDN**: Serve assets from a CDN
7. **Database**: Optimize queries and use indexing
8. **Monitoring**: Continuously monitor performance metrics

By following these optimizations, you should see significant improvements in page load times and overall user experience.