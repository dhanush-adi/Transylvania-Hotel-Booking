"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HotelCard } from "@/components/hotel-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { Filter, Search } from "lucide-react"

export default function HotelsPage() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<any[]>([])
  const [filteredHotels, setFilteredHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await api.getHotels()
        setHotels(data)
        setFilteredHotels(data)
      } catch (error) {
        console.error("[v0] Failed to fetch hotels:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [])

  useEffect(() => {
    let result = [...hotels]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by price range
    result = result.filter((hotel) => hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1])

    // Filter by rating
    result = result.filter((hotel) => hotel.rating >= minRating)

    // Sort
    result.sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerNight - b.pricePerNight
      if (sortBy === "price-high") return b.pricePerNight - a.pricePerNight
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

    setFilteredHotels(result)
  }, [hotels, searchQuery, priceRange, minRating, sortBy])

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Discover Hotels</h1>
          <p className="text-muted-foreground">Find your perfect accommodation from our curated collection</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Hotel name or location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="pt-2">
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Minimum Rating */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Select value={minRating.toString()} onValueChange={(val) => setMinRating(Number(val))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setPriceRange([0, 1000])
                    setMinRating(0)
                    setSortBy("rating")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Hotel Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {loading ? "Loading..." : `${filteredHotels.length} hotels found`}
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filteredHotels.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No hotels match your criteria. Try adjusting your filters.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
