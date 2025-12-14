import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Heart } from 'lucide-react'

export default function AdoptionSuccess() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=1080&fit=crop&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-[1]" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="backdrop-blur-sm bg-white/95 shadow-2xl rounded-2xl p-8 sm:p-12 text-center border border-white/20"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" strokeWidth={3} />
              </div>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              🎉 Application Submitted!
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 rounded-full" />
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Thank you for your interest in giving a rescued animal a loving home! We have received your application and will review it carefully within 2-3 business days.
            </p>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Our team will carefully review your application</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>We'll conduct a preliminary screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Our team will contact you within 2-3 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>If approved, we'll schedule a home visit</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center"
          >
            <Link href="/">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Back to Home
              </button>
            </Link>
            <Link href="/adoption/terms">
              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg">
                View Adoption Terms
              </button>
            </Link>
          </motion.div>
          
          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 text-sm mt-8 pt-8 border-t border-gray-200"
          >
            Questions? Contact us at <span className="font-semibold text-gray-900">contact@avsar.org</span> or call <span className="font-semibold text-gray-900">+91-XXXX-XXXX-XX</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}