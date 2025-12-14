import { createClient, RedisClientType } from 'redis'

// Create a Redis client
let redisClient: RedisClientType | null = null

// Initialize Redis client
export async function initRedis() {
  if (redisClient) {
    return redisClient
  }

  try {
    // Only initialize Redis in production or when explicitly enabled
    if (process.env.REDIS_URL || process.env.NODE_ENV === 'production') {
      redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      })
      
      redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err)
      })
      
      await redisClient.connect()
      console.log('Redis client connected')
    } else {
      // Redis intentionally not configured for development
      // console.log('Redis not initialized - no REDIS_URL provided')
    }
  } catch (error) {
    console.error('Failed to initialize Redis:', error)
    redisClient = null
  }
  
  return redisClient
}

// Get value from cache
export async function getFromCache(key: string) {
  if (!redisClient) {
    return null
  }
  
  try {
    const value = await redisClient.get(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error('Error getting from cache:', error)
    return null
  }
}

// Set value in cache
export async function setInCache(key: string, value: any, ttl: number = 300) {
  if (!redisClient) {
    return false
  }
  
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error setting in cache:', error)
    return false
  }
}

// Delete value from cache
export async function deleteFromCache(key: string) {
  if (!redisClient) {
    return false
  }
  
  try {
    await redisClient.del(key)
    return true
  } catch (error) {
    console.error('Error deleting from cache:', error)
    return false
  }
}

// Initialize Redis on startup
if (typeof window === 'undefined') {
  initRedis().catch(console.error)
}