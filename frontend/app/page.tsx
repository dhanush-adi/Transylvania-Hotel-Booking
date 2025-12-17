"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HotelSearch } from "@/components/hotel-search"
import { HotelCard } from "@/components/hotel-card"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ArrowRight, Award, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export default function HomePage() {
  const [featuredHotels, setFeaturedHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        const hotels = await api.getHotels()
        setFeaturedHotels(hotels.slice(0, 6))
      } catch (error) {
        console.error("[v0] Failed to fetch hotels:", error instanceof Error ? error.message : error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedHotels()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Spotlight */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="oklch(0.65 0.25 264)"
          />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
              Experience Luxury
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Beyond Compare
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextGenerateEffect
              words="Discover the finest hotels and resorts around the world. Your perfect stay awaits."
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            />
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HotelSearch />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center group perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-primary/10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-primary/30">
                  <Award className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">Premium Selection</h3>
                <p className="text-muted-foreground leading-relaxed">Curated collection of luxury hotels worldwide</p>
              </div>
            </motion.div>
            <motion.div
              className="text-center group perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-primary/10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-primary/30">
                  <Shield className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">Secure Booking</h3>
                <p className="text-muted-foreground leading-relaxed">Safe and protected payment processing</p>
              </div>
            </motion.div>
            <motion.div
              className="text-center group perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-primary/10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-primary/30">
                  <Clock className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">Round-the-clock customer assistance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">Featured Hotels</h2>
              <p className="text-muted-foreground">Handpicked destinations for your next getaway</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/hotels">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : featuredHotels.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHotels.map((hotel: any) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">No hotels available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4 text-balance">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-balance">
            Join thousands of travelers who trust Transylvania for their luxury hotel bookings
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Transylvania. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
