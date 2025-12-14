'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Log performance metrics
    const logPerformance = () => {
      if ('performance' in window) {
        // Log page load time
        const perfData = performance.getEntriesByType('navigation')[0]
        if (perfData) {
          console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms')
          console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms')
        }
        
        // Log resource loading
        const resources = performance.getEntriesByType('resource')
        console.log('Resource Count:', resources.length)
        
        // Log memory usage if available
        if ('memory' in performance) {
          // @ts-ignore
          console.log('Memory Usage:', performance.memory)
        }
      }
    }
    
    // Log after page is fully loaded
    if (document.readyState === 'complete') {
      logPerformance()
    } else {
      window.addEventListener('load', logPerformance)
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('load', logPerformance)
    }
  }, [])
  
  return null
}