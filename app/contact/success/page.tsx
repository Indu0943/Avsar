import Link from 'next/link'
import { CheckCircle, Home, MessageCircle } from 'lucide-react'

export default function ContactSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Message Sent Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We have received your message and will get back to you within 24 hours. 
            Our team is committed to providing you with the best support possible.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Another Message
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need immediate assistance? Call our helpline at{' '}
              <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}