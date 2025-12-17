"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { getAuth, isAdmin } from "@/lib/auth"
import { format, parseISO } from "date-fns"
import { Plus, HotelIcon, Bed, Calendar, TrendingUp, DollarSign, MapPin, Edit } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [hotels, setHotels] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showHotelDialog, setShowHotelDialog] = useState(false)
  const [showRoomDialog, setShowRoomDialog] = useState(false)
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null)

  // Hotel form state
  const [hotelName, setHotelName] = useState("")
  const [hotelLocation, setHotelLocation] = useState("")
  const [hotelDescription, setHotelDescription] = useState("")
  const [hotelPrice, setHotelPrice] = useState("")
  const [hotelRating, setHotelRating] = useState("4.5")

  // Room form state
  const [roomType, setRoomType] = useState("")
  const [roomPrice, setRoomPrice] = useState("")
  const [roomCapacity, setRoomCapacity] = useState("2")
  const [roomDescription, setRoomDescription] = useState("")

  useEffect(() => {
    const { user } = getAuth()
    if (!user || !isAdmin()) {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const [hotelsData, bookingsData] = await Promise.all([api.getHotels(), api.getAllBookings()])
        setHotels(hotelsData)
        setBookings(bookingsData)
      } catch (error) {
        console.error("[v0] Failed to fetch admin data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  const handleCreateHotel = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newHotel = await api.createHotel({
        name: hotelName,
        location: hotelLocation,
        description: hotelDescription,
        pricePerNight: Number(hotelPrice),
        rating: Number(hotelRating),
        amenities: ["Wifi", "Breakfast", "Parking"],
      })
      setHotels([...hotels, newHotel])
      setShowHotelDialog(false)
      // Reset form
      setHotelName("")
      setHotelLocation("")
      setHotelDescription("")
      setHotelPrice("")
      setHotelRating("4.5")
    } catch (error) {
      console.error("[v0] Failed to create hotel:", error)
    }
  }

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHotelId) return

    try {
      await api.createRoom(selectedHotelId, {
        type: roomType,
        pricePerNight: Number(roomPrice),
        capacity: Number(roomCapacity),
        description: roomDescription,
        available: true,
      })
      setShowRoomDialog(false)
      // Reset form
      setRoomType("")
      setRoomPrice("")
      setRoomCapacity("2")
      setRoomDescription("")
      setSelectedHotelId(null)
    } catch (error) {
      console.error("[v0] Failed to create room:", error)
    }
  }

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  const activeBookings = bookings.filter((b) => b.status !== "cancelled").length

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your hotels, rooms, and bookings</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
            <div className="h-96 bg-muted animate-pulse rounded-lg" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <HotelIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Hotels</p>
                      <p className="text-2xl font-bold">{hotels.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{bookings.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Bookings</p>
                      <p className="text-2xl font-bold">{activeBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${totalRevenue.toFixed(0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="hotels" className="space-y-6">
              <TabsList>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </TabsList>

              {/* Hotels Tab */}
              <TabsContent value="hotels" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-semibold">Manage Hotels</h2>
                  <Dialog open={showHotelDialog} onOpenChange={setShowHotelDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Hotel
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Hotel</DialogTitle>
                        <DialogDescription>Create a new hotel listing in the system</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateHotel} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hotelName">Hotel Name</Label>
                            <Input
                              id="hotelName"
                              value={hotelName}
                              onChange={(e) => setHotelName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hotelLocation">Location</Label>
                            <Input
                              id="hotelLocation"
                              value={hotelLocation}
                              onChange={(e) => setHotelLocation(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hotelDescription">Description</Label>
                          <textarea
                            id="hotelDescription"
                            className="w-full min-h-24 px-3 py-2 text-sm rounded-md border border-input bg-background"
                            value={hotelDescription}
                            onChange={(e) => setHotelDescription(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hotelPrice">Price per Night ($)</Label>
                            <Input
                              id="hotelPrice"
                              type="number"
                              min="1"
                              value={hotelPrice}
                              onChange={(e) => setHotelPrice(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hotelRating">Rating (out of 5)</Label>
                            <Input
                              id="hotelRating"
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={hotelRating}
                              onChange={(e) => setHotelRating(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button type="button" variant="outline" onClick={() => setShowHotelDialog(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Create Hotel</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {hotels.map((hotel) => (
                    <Card key={hotel.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-serif font-semibold mb-1">{hotel.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {hotel.location}
                            </div>
                          </div>
                          <Badge variant="secondary">{hotel.rating} ★</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${hotel.pricePerNight}/night</span>
                          <div className="flex gap-2">
                            <Dialog
                              open={showRoomDialog && selectedHotelId === hotel.id}
                              onOpenChange={(open) => {
                                setShowRoomDialog(open)
                                if (!open) setSelectedHotelId(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedHotelId(hotel.id)}>
                                  <Bed className="h-4 w-4 mr-1" />
                                  Add Room
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Room to {hotel.name}</DialogTitle>
                                  <DialogDescription>Create a new room for this hotel</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCreateRoom} className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="roomType">Room Type</Label>
                                    <Input
                                      id="roomType"
                                      placeholder="e.g., Deluxe Suite"
                                      value={roomType}
                                      onChange={(e) => setRoomType(e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="roomPrice">Price per Night ($)</Label>
                                      <Input
                                        id="roomPrice"
                                        type="number"
                                        min="1"
                                        value={roomPrice}
                                        onChange={(e) => setRoomPrice(e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="roomCapacity">Capacity (Guests)</Label>
                                      <Input
                                        id="roomCapacity"
                                        type="number"
                                        min="1"
                                        value={roomCapacity}
                                        onChange={(e) => setRoomCapacity(e.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="roomDescription">Description</Label>
                                    <textarea
                                      id="roomDescription"
                                      className="w-full min-h-20 px-3 py-2 text-sm rounded-md border border-input bg-background"
                                      value={roomDescription}
                                      onChange={(e) => setRoomDescription(e.target.value)}
                                    />
                                  </div>
                                  <div className="flex gap-2 justify-end">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        setShowRoomDialog(false)
                                        setSelectedHotelId(null)
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button type="submit">Create Room</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">All Bookings</h2>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Hotel</p>
                              <p className="font-semibold">{booking.hotelName || "Hotel"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Guest</p>
                              <p className="font-semibold">{booking.userName || "Guest"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Dates</p>
                              <p className="text-sm">
                                {format(parseISO(booking.checkInDate), "MMM d")} -{" "}
                                {format(parseISO(booking.checkOutDate), "MMM d, yyyy")}
                              </p>
                            </div>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Total</p>
                                <p className="font-bold text-primary">${booking.totalPrice?.toFixed(2)}</p>
                              </div>
                              <Badge variant={booking.status === "cancelled" ? "destructive" : "secondary"}>
                                {booking.status || "confirmed"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No bookings yet</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
