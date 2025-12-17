"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { ArrowLeft, CreditCard, Smartphone, QrCode, Check, Loader2 } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Card details
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // UPI details
  const [upiId, setUpiId] = useState("")
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    const pendingBooking = localStorage.getItem("pendingBooking")
    if (!pendingBooking) {
      router.push("/hotels")
      return
    }
    setBookingData(JSON.parse(pendingBooking))
  }, [router])

  const handlePayment = async () => {
    setError("")
    
    // Validate payment details
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError("Please fill in all card details")
        return
      }
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setError("Invalid card number")
        return
      }
    } else {
      if (!upiId && !showQR) {
        setError("Please enter UPI ID or use QR code")
        return
      }
    }

    setProcessing(true)

    try {
      // Create booking
      const bookingRequest = {
        hotelId: bookingData.hotelId,
        roomId: bookingData.roomId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests,
        specialRequests: bookingData.specialRequests,
        totalPrice: bookingData.total,
      }

      await api.createBooking(bookingRequest)
      
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Clear pending booking
      localStorage.removeItem("pendingBooking")
      setSuccess(true)
    } catch (err: any) {
      console.error("Payment error:", err)
      setError(err.message || "Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Payment Successful!</h2>
              <p className="text-muted-foreground mb-2">
                Your booking at {bookingData.hotelName} has been confirmed.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Confirmation email has been sent to your registered email address.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/dashboard")}>View My Bookings</Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground">Complete your payment to confirm your booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">Pay with your card</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5" />
                      <div>
                        <div className="font-medium">UPI</div>
                        <div className="text-sm text-muted-foreground">Pay using UPI ID or QR Code</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethod === "card" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "")
                          const formatted = value.match(/.{1,4}/g)?.join(" ") || value
                          setCardNumber(formatted)
                        }}
                        maxLength={19}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value
                            setExpiryDate(formatted)
                          }}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          disabled={showQR}
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowQR(!showQR)}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        {showQR ? "Hide" : "Show"} QR Code
                      </Button>

                      {showQR && (
                        <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                          <div className="w-48 h-48 bg-white p-4 rounded-lg mb-4">
                            {/* QR Code placeholder */}
                            <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                              <QrCode className="h-24 w-24 text-gray-600" />
                            </div>
                          </div>
                          <p className="text-sm text-center text-muted-foreground">
                            Scan this QR code with any UPI app to complete payment
                          </p>
                          <p className="text-lg font-semibold mt-2">₹{bookingData.total.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full" 
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay $${bookingData.total.toFixed(2)}`
              )}
            </Button>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-1">{bookingData.hotelName}</h3>
                  <p className="text-sm text-muted-foreground">{bookingData.roomType}</p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in</span>
                    <span className="font-medium">{bookingData.checkInDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out</span>
                    <span className="font-medium">{bookingData.checkOutDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nights</span>
                    <span className="font-medium">{bookingData.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">{bookingData.guests}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ${bookingData.roomPrice} x {bookingData.nights} night(s)
                    </span>
                    <span>${bookingData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees (10%)</span>
                    <span>${bookingData.tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${bookingData.total.toFixed(2)}</span>
                </div>

                <Badge variant="secondary" className="w-full justify-center py-2">
                  Secure Payment
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
