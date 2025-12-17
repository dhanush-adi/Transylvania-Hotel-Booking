"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Card3D, GlowCard } from "@/components/ui/card-3d"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Wifi, Coffee, Car } from "lucide-react"

interface HotelCardProps {
  hotel: {
    id: number
    name: string
    location: string
    description: string
    rating: number
    pricePerNight: number
    imageUrl?: string
    amenities?: Array<{
      id: number
      name: string
      description: string
      available: boolean
    }>
  }
}

export function HotelCard({ hotel }: HotelCardProps) {
  const amenityIcons: { [key: string]: any } = {
    Wifi: Wifi,
    Breakfast: Coffee,
    Parking: Car,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card3D containerClassName="group">
        <GlowCard className="h-full">
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
            <div className="relative h-48 overflow-hidden">
              <motion.div
                className="w-full h-full bg-muted bg-cover bg-center"
                style={{
                  backgroundImage: `url(${hotel.imageUrl || `https://images.unsplash.com/photo-${hotel.id % 2 === 0 ? '1566073771259-6a8506099945' : '1542314831-068cd1dbfeeb'}?w=800&h=600&fit=crop&q=80`})`,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Badge className="absolute top-3 right-3 bg-background/95 text-foreground border backdrop-blur-md shadow-lg">
                <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                {hotel.rating.toFixed(1)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-serif font-bold mb-2 text-balance group-hover:text-primary transition-colors duration-300 group-hover:neon-glow">
                {hotel.name}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1 group-hover:text-primary transition-colors" />
                {hotel.location}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{hotel.description}</p>
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {hotel.amenities.slice(0, 3).map((amenity) => {
                    const Icon = amenityIcons[amenity.name]
                    return (
                      <Badge key={amenity.id} variant="secondary" className="text-xs hover:bg-primary/20 transition-colors">
                        {Icon && <Icon className="h-3 w-3 mr-1" />}
                        {amenity.name}
                      </Badge>
                    )
                  })}
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${hotel.pricePerNight}
                </span>
                <span className="text-sm text-muted-foreground">per night</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full btn-3d group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                <Link href={`/hotels/${hotel.id}`}>
                  View Details
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </GlowCard>
      </Card3D>
    </motion.div>
  )
}
