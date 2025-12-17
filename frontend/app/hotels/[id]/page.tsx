"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"
import { isAuthenticated } from "@/lib/auth"
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Wind,
  Tv,
  UtensilsCrossed,
  ArrowLeft,
  Bed,
  Users,
} from "lucide-react"

export default function HotelDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = Number(params.id)
  const [hotel, setHotel] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const [hotelData, roomsData] = await Promise.all([api.getHotelById(hotelId), api.getRoomsByHotelId(hotelId)])
        setHotel(hotelData)
        setRooms(roomsData)
      } catch (error) {
        console.error("[v0] Failed to fetch hotel details:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHotelDetails()
  }, [hotelId])

  const amenityIcons: { [key: string]: any } = {
    Wifi: Wifi,
    Breakfast: Coffee,
    Parking: Car,
    Gym: Dumbbell,
    AC: Wind,
    TV: Tv,
    Restaurant: UtensilsCrossed,
  }

  const handleBookRoom = (roomId: number) => {
    if (!isAuthenticated()) {
      router.push(`/login?redirect=/hotels/${hotelId}`)
      return
    }
    router.push(`/booking?hotelId=${hotelId}&roomId=${roomId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="h-96 bg-muted animate-pulse rounded-lg" />
            <div className="h-32 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Hotel not found</p>
            <Button className="mt-4" onClick={() => router.push("/hotels")}>
              Back to Hotels
            </Button>
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

        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2 text-balance">{hotel.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                  {hotel.rating.toFixed(1)}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Starting from</div>
              <div className="text-3xl font-bold text-primary">${hotel.pricePerNight}</div>
              <div className="text-sm text-muted-foreground">per night</div>
            </div>
          </div>

          {/* Hotel Image */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div
              className="h-96 rounded-lg bg-muted bg-cover bg-center"
              style={{
                backgroundImage: `url(${hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80'})`,
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-46 rounded-lg bg-muted bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=400&fit=crop&q=80)',
                }}
              />
              <div
                className="h-46 rounded-lg bg-muted bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&h=400&fit=crop&q=80)',
                }}
              />
              <div
                className="h-46 rounded-lg bg-muted bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop&q=80)',
                }}
              />
              <div
                className="h-46 rounded-lg bg-muted bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=400&fit=crop&q=80)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {hotel.amenities.map((amenity: any) => {
                      const Icon = amenityIcons[amenity.name] || Wifi
                      return (
                        <div key={amenity.id} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{amenity.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Rooms */}
            <Card>
              <CardHeader>
                <CardTitle>Available Rooms</CardTitle>
                <CardDescription>Choose your preferred room type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <div key={room.id}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{room.type || `Room ${index + 1}`}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{room.bedType || "King Bed"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{room.capacity || 2} Guests</span>
                            </div>
                          </div>
                          {room.description && <p className="text-sm text-muted-foreground">{room.description}</p>}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-2">
                            ${room.pricePerNight || hotel.pricePerNight}
                          </div>
                          <Button onClick={() => handleBookRoom(room.id)} disabled={!room.available}>
                            {room.available ? "Book Now" : "Not Available"}
                          </Button>
                        </div>
                      </div>
                      {index < rooms.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No rooms available at the moment</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
                <CardDescription>Reserve your room today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starting price</span>
                    <span className="font-semibold">${hotel.pricePerNight}/night</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold">{hotel.rating.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold">{hotel.location}</span>
                  </div>
                </div>
                <Separator />
                <Button className="w-full" size="lg" onClick={() => rooms[0] && handleBookRoom(rooms[0].id)}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
