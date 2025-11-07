import Link from 'next/link'

export default function AdoptionSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your interest in pet adoption. We have received your application and will review it within 2-3 business days. Our team will contact you soon.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Back to Home
            </Link>
            <Link
              href="/adoption"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Submit Another Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}