"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { api } from "@/lib/api"
import { getAuth } from "@/lib/auth"
import { format, isPast, isFuture, parseISO } from "date-fns"
import { Calendar, MapPin, Users, Clock, X, CheckCircle2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<number | null>(null)

  useEffect(() => {
    const { user } = getAuth()
    if (!user) {
      router.push("/login?redirect=/dashboard")
      return
    }

    const fetchBookings = async () => {
      try {
        const data = await api.getUserBookings()
        setBookings(data)
      } catch (error) {
        console.error("[v0] Failed to fetch bookings:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [router])

  const handleCancelBooking = async (bookingId: number) => {
    setCancellingId(bookingId)
    try {
      await api.cancelBooking(bookingId)
      setBookings(bookings.filter((b) => b.id !== bookingId))
    } catch (error) {
      console.error("[v0] Failed to cancel booking:", error)
    } finally {
      setCancellingId(null)
    }
  }

  const getBookingStatus = (booking: any) => {
    const checkInDate = parseISO(booking.checkInDate)
    const checkOutDate = parseISO(booking.checkOutDate)
    const now = new Date()

    if (booking.status === "cancelled") return "cancelled"
    if (isPast(checkOutDate)) return "completed"
    if (isFuture(checkInDate)) return "upcoming"
    if (isPast(checkInDate) && isFuture(checkOutDate)) return "active"
    return "upcoming"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
      case "active":
        return (
          <Badge className="bg-primary">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const upcomingBookings = bookings.filter((b) => getBookingStatus(b) === "upcoming")
  const activeBookings = bookings.filter((b) => getBookingStatus(b) === "active")
  const pastBookings = bookings.filter((b) => ["completed", "cancelled"].includes(getBookingStatus(b)))

  const BookingCard = ({ booking }: { booking: any }) => {
    const status = getBookingStatus(booking)
    const canCancel = status === "upcoming"

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-serif font-semibold mb-1">{booking.hotelName || "Hotel Booking"}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {booking.location || "Location"}
              </div>
            </div>
            {getStatusBadge(status)}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Check-in:</span>
                <span className="font-medium">{format(parseISO(booking.checkInDate), "PPP")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Check-out:</span>
                <span className="font-medium">{format(parseISO(booking.checkOutDate), "PPP")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Guests:</span>
                <span className="font-medium">{booking.guests || 1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-semibold text-primary">${booking.totalPrice?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Special Requests</p>
                <p className="text-sm">{booking.specialRequests}</p>
              </div>
            </>
          )}

          <Separator className="my-4" />

          <div className="flex gap-2">
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <a href={`/hotels/${booking.hotelId}`}>View Hotel</a>
            </Button>
            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1" disabled={cancellingId === booking.id}>
                    {cancellingId === booking.id ? "Cancelling..." : "Cancel Booking"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your booking will be cancelled and you may be subject to
                      cancellation fees.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleCancelBooking(booking.id)} className="bg-destructive">
                      Cancel Booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your hotel reservations</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring our luxury hotels and make your first reservation
            </p>
            <Button onClick={() => router.push("/hotels")}>Browse Hotels</Button>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                All Bookings
                <Badge variant="secondary" className="ml-2">
                  {bookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming
                <Badge variant="secondary" className="ml-2">
                  {upcomingBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
                <Badge variant="secondary" className="ml-2">
                  {activeBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="past">
                Past
                <Badge variant="secondary" className="ml-2">
                  {pastBookings.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No upcoming bookings</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeBookings.length > 0 ? (
                activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No active bookings</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past bookings</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
