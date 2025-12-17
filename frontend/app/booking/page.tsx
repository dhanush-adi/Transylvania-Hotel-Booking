"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { getAuth } from "@/lib/auth"
import { format, differenceInDays } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, ArrowLeft, Check, MapPin, Bed } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotelId = searchParams.get("hotelId")
  const roomId = searchParams.get("roomId")

  const [hotel, setHotel] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [error, setError] = useState("")

  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)
  const [specialRequests, setSpecialRequests] = useState("")

  useEffect(() => {
    if (!hotelId || !roomId) {
      router.push("/hotels")
      return
    }

    const { user } = getAuth()
    if (!user) {
      router.push(`/login?redirect=/booking?hotelId=${hotelId}&roomId=${roomId}`)
      return
    }

    const fetchBookingDetails = async () => {
      try {
        const [hotelData, roomsData] = await Promise.all([
          api.getHotelById(Number(hotelId)),
          api.getRoomsByHotelId(Number(hotelId)),
        ])
        setHotel(hotelData)
        const selectedRoom = roomsData.find((r: any) => r.id === Number(roomId))
        setRoom(selectedRoom || roomsData[0])
      } catch (error) {
        console.error("[v0] Failed to fetch booking details:", error)
        setError("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }
    fetchBookingDetails()
  }, [hotelId, roomId, router])

  const numberOfNights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  const roomPrice = room?.pricePerNight || hotel?.pricePerNight || 0
  const subtotal = numberOfNights * roomPrice
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates")
      return
    }

    if (numberOfNights < 1) {
      setError("Check-out date must be after check-in date")
      return
    }

    if (guests < 1 || (room?.capacity && guests > room.capacity)) {
      setError(`Number of guests must be between 1 and ${room?.capacity || 4}`)
      return
    }

    setBookingLoading(true)

    try {
      const bookingData = {
        hotelId: Number(hotelId),
        roomId: Number(roomId),
        checkInDate: format(checkIn, "yyyy-MM-dd"),
        checkOutDate: format(checkOut, "yyyy-MM-dd"),
        guests,
        specialRequests: specialRequests || "",
        totalPrice: total,
      }

      console.log("Creating booking with data:", bookingData)
      const response = await api.createBooking(bookingData)
      console.log("Booking created successfully:", response)
      setBookingSuccess(true)
    } catch (err: any) {
      console.error("Booking error:", err)
      const errorMessage = err.message || err.toString() || "Failed to create booking. Please try again."
      setError(errorMessage)
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    )
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-8 text-balance">
                Your reservation at {hotel?.name} has been successfully confirmed. We've sent a confirmation email with
                all the details.
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
          <h1 className="text-4xl font-serif font-bold mb-2">Complete Your Booking</h1>
          <p className="text-muted-foreground">You're just a few steps away from your perfect stay</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dates */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Dates</CardTitle>
                  <CardDescription>Choose your check-in and check-out dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkIn && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOut && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) => (checkIn ? date <= checkIn : date < new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {checkIn && checkOut && numberOfNights > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You've selected <span className="font-semibold text-foreground">{numberOfNights} night(s)</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Guest Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                  <CardDescription>How many guests will be staying?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={room?.capacity || 4}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      required
                    />
                    {room?.capacity && (
                      <p className="text-sm text-muted-foreground">Maximum capacity: {room.capacity} guests</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <textarea
                      id="requests"
                      className="w-full min-h-24 px-3 py-2 text-sm rounded-md border border-input bg-background"
                      placeholder="Any special requirements or requests..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}

              <Button 
                type="button" 
                size="lg" 
                className="w-full" 
                disabled={!checkIn || !checkOut || numberOfNights < 1}
                onClick={() => {
                  if (!checkIn || !checkOut) {
                    setError("Please select check-in and check-out dates")
                    return
                  }
                  if (numberOfNights < 1) {
                    setError("Check-out date must be after check-in date")
                    return
                  }
                  // Store booking data and redirect to payment
                  const bookingData = {
                    hotelId: Number(hotelId),
                    roomId: Number(roomId),
                    hotelName: hotel?.name,
                    roomType: room?.type,
                    checkInDate: format(checkIn, "yyyy-MM-dd"),
                    checkOutDate: format(checkOut, "yyyy-MM-dd"),
                    guests,
                    specialRequests: specialRequests || "",
                    nights: numberOfNights,
                    roomPrice,
                    subtotal,
                    tax,
                    total,
                  }
                  localStorage.setItem("pendingBooking", JSON.stringify(bookingData))
                  router.push("/payment")
                }}
              >
                Proceed to Payment
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hotel && (
                  <>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hotel.location}
                      </div>
                    </div>

                    <Separator />

                    {room && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{room.type || "Standard Room"}</span>
                        </div>
                        {room.bedType && <p className="text-sm text-muted-foreground">{room.bedType}</p>}
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      {checkIn && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Check-in</span>
                          <span className="font-medium">{format(checkIn, "PPP")}</span>
                        </div>
                      )}
                      {checkOut && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Check-out</span>
                          <span className="font-medium">{format(checkOut, "PPP")}</span>
                        </div>
                      )}
                      {numberOfNights > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Nights</span>
                          <span className="font-medium">{numberOfNights}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Guests</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${roomPrice} x {numberOfNights || 0} night(s)
                        </span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & fees (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>

                    <Badge variant="secondary" className="w-full justify-center py-2">
                      Free cancellation within 24 hours
                    </Badge>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
