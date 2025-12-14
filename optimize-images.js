// Script to optimize images for the project
// Run with: node optimize-images.js

const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

// Create public/images directory if it doesn't exist
async function createImagesDirectory() {
  const imagesDir = path.join(__dirname, 'public', 'images')
  try {
    await fs.access(imagesDir)
  } catch {
    await fs.mkdir(imagesDir, { recursive: true })
  }
}

// Optimize hero image
async function optimizeHeroImage() {
  const imagesDir = path.join(__dirname, 'public', 'images')
  
  // In a real scenario, you would download the image from the URL
  // For now, we'll just create a placeholder
  console.log('Optimizing hero image...')
  
  // Create a simple placeholder image
  const placeholder = await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: { r: 100, g: 150, b: 200, alpha: 0.8 }
    }
  })
  .jpeg({ quality: 80 })
  .toBuffer()
  
  await fs.writeFile(path.join(imagesDir, 'donation-hero.jpg'), placeholder)
  console.log('Created optimized hero image: public/images/donation-hero.jpg')
}

// Optimize all images
async function optimizeImages() {
  try {
    await createImagesDirectory()
    await optimizeHeroImage()
    console.log('✅ Image optimization complete!')
    console.log('\nNext steps:')
    console.log('1. Replace the placeholder images with actual optimized images')
    console.log('2. Update image references in your components')
    console.log('3. Run "pnpm dev" to see the improvements')
  } catch (error) {
    console.error('❌ Error optimizing images:', error)
  }
}

// Run the optimization
optimizeImages()