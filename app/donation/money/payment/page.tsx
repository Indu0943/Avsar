"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock, CheckCircle, AlertCircle, ArrowLeft, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const [paymentData, setPaymentData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 0,
    donationId: ""
  })
  
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  })
  
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [countdown, setCountdown] = useState(5)
  const [showInvalidRequest, setShowInvalidRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState("") // Added state for detailed error messages

  // Get data from URL parameters
  useEffect(() => {
    const name = searchParams.get("name") || ""
    const email = searchParams.get("email") || ""
    const phone = searchParams.get("phone") || ""
    const amountParam = searchParams.get("amount")
    const amount = amountParam ? Number(amountParam) : 0
    const donationId = searchParams.get("donationId") || ""
    
    // Debug logging
    console.log('Payment page params:', { name, email, phone, amountParam, amount, donationId });
    
    setPaymentData({
      name,
      email,
      phone,
      amount,
      donationId
    })
    
    // Check if required payment data is missing or invalid
    const isInvalid = !name || !email || !phone || amount <= 0 || !donationId;
    if (isInvalid) {
      setShowInvalidRequest(true)
      const errorMsg = "Payment information is missing or invalid. Please go back and submit the donation form again."
      setErrorMessage(errorMsg)
      // Show error toast for better visibility
      toast({
        title: "Invalid Payment Request",
        description: errorMsg,
        variant: "destructive",
        duration: 15000, // Show for 15 seconds instead of default 5
      })
    }
  }, [searchParams, toast])

  // Countdown for success redirect
  useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (paymentStatus === "success" && countdown === 0) {
      router.push("/donation/money/success")
    }
  }, [paymentStatus, countdown, router])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus("processing")
    setErrorMessage("") // Clear previous error messages
    
    // Simulate payment processing
    setTimeout(async () => {
      // In a real implementation, this would connect to a payment gateway
      // For now, we'll simulate a successful payment
      const isSuccess = Math.random() > 0.2 // 80% success rate for simulation
      
      if (isSuccess) {
        try {
          // Store payment information in the database
          const response = await fetch('/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              donationId: paymentData.donationId,
              name: paymentData.name,
              email: paymentData.email,
              phone: paymentData.phone,
              amount: paymentData.amount,
              paymentMethod: 'card',
              cardLastFour: cardData.cardNumber.slice(-4),
              paymentStatus: 'completed',
              transactionId: 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
              paymentGateway: 'simulated'
            }),
          })
          
          const result = await response.json()
          
          if (result.success) {
            setPaymentStatus("success")
            toast({
              title: "Payment Successful",
              description: "Your donation has been processed successfully!",
            })
          } else {
            throw new Error(result.error || 'Failed to store payment information')
          }
        } catch (error: any) {
          console.error('Error storing payment:', error)
          setPaymentStatus("failed")
          const errorMsg = "Payment was successful but we couldn't store the information in our database. This might be due to a temporary system issue. Please contact support with transaction ID: txn_" + Date.now() + "_" + Math.floor(Math.random() * 10000)
          setErrorMessage(errorMsg)
          toast({
            title: "Payment Storage Failed",
            description: errorMsg,
            variant: "destructive",
            duration: 15000,
          })
        }
      } else {
        try {
          // Store failed payment attempt
          await fetch('/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              donationId: paymentData.donationId,
              name: paymentData.name,
              email: paymentData.email,
              phone: paymentData.phone,
              amount: paymentData.amount,
              paymentMethod: 'card',
              paymentStatus: 'failed',
              transactionId: 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
              paymentGateway: 'simulated'
            }),
          })
        } catch (error) {
          console.error('Error storing failed payment:', error)
        }
        
        setPaymentStatus("failed")
        const errorMsg = "There was an issue processing your payment. This could be due to incorrect card details or a temporary system issue. Please check your card details and try again."
        setErrorMessage(errorMsg)
        toast({
          title: "Payment Failed",
          description: errorMsg,
          variant: "destructive",
          duration: 15000, // Show for 15 seconds for better visibility
        })
      }
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardData({ ...cardData, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setCardData({ ...cardData, expiryDate: value })
  }

  // Show invalid request page if data is missing
  if (showInvalidRequest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Invalid Payment Request
            </h1>
            
            <p className="text-gray-600 mb-6">
              {errorMessage || "Payment information is missing or invalid. Please go back and submit the donation form again."}
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <p className="text-sm text-gray-600 mb-2">Debug Information:</p>
              <p className="text-xs font-mono">Name: {paymentData.name || 'null'}</p>
              <p className="text-xs font-mono">Email: {paymentData.email || 'null'}</p>
              <p className="text-xs font-mono">Phone: {paymentData.phone || 'null'}</p>
              <p className="text-xs font-mono">Amount Param: {searchParams.get("amount") || 'null'}</p>
              <p className="text-xs font-mono">Parsed Amount: {paymentData.amount}</p>
              <p className="text-xs font-mono">Donation ID: {paymentData.donationId || 'null'}</p>
            </div>
            
            <Button 
              onClick={() => router.push("/donation/money")}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Donation Form
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">Secure Payment</h1>
          <p className="text-gray-600 mt-2">Complete your donation securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Payment Details */}
          <div className="flex flex-col">
            <Card className="flex-1 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Donation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Donor Name</span>
                  <span className="font-medium">{paymentData.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{paymentData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{paymentData.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-lg">₹{paymentData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 mt-4">
                  <span className="text-gray-600 font-semibold">Total</span>
                  <span className="font-bold text-xl text-primary">₹{paymentData.amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="flex flex-col">
            {paymentStatus === "idle" || paymentStatus === "processing" ? (
              <Card className="flex-1 flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Your payment details are securely encrypted
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Error message display */}
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Payment Error</p>
                        <p className="text-sm text-red-700">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handlePayment} className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        required
                        value={cardData.nameOnCard}
                        onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        required
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          required
                          value={cardData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          required
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex items-end">
                      <Button 
                        type="submit" 
                        className="w-full mt-6" 
                        disabled={paymentStatus === "processing"}
                        size="lg"
                      >
                        {paymentStatus === "processing" ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Pay ₹{paymentData.amount.toLocaleString()}
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-blue-800">
                          This is a simulated payment system for demonstration purposes. In a production environment, this would connect to a real payment gateway.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      <Lock className="inline h-3 w-3 mr-1" />
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </form>
                </CardContent>
              </Card>
            ) : paymentStatus === "success" ? (
              <Card className="border-green-200 bg-green-50 flex flex-col h-full">
                <CardContent className="flex-1 flex flex-col justify-center p-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6 text-center">
                    Thank you for your donation of ₹{paymentData.amount.toLocaleString()}
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg mb-6 shadow-sm mx-auto max-w-xs w-full">
                    <p className="text-sm text-gray-600 text-center">
                      Redirecting to success page in <span className="font-bold">{countdown}</span> seconds...
                    </p>
                  </div>
                  
                  <div className="max-w-xs mx-auto w-full">
                    <Button 
                      size="lg"
                      onClick={() => router.push("/donation/money/success")}
                      className="w-full">
                      Continue Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-red-200 bg-red-50 flex flex-col h-full">
                <CardContent className="flex-1 flex flex-col justify-center p-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Payment Failed</h3>
                  <p className="text-gray-600 mb-6 text-center">
                    There was an issue processing your payment. Please try again.
                  </p>
                  
                  {/* Detailed error message */}
                  {errorMessage && (
                    <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-md">
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </div>
                  )}
                  
                  <div className="max-w-xs mx-auto w-full">
                    <Button 
                      size="lg"
                      onClick={() => {
                        setPaymentStatus("idle")
                        setErrorMessage("")
                      }}
                      variant="outline" 
                      className="w-full">
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}