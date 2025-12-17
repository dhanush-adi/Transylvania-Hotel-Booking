"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CalendarIcon, MapPin, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function HotelSearch() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (checkIn) params.set("checkIn", checkIn.toISOString())
    if (checkOut) params.set("checkOut", checkOut.toISOString())
    router.push(`/hotels?${params.toString()}`)
  }

  return (
    <Card className="p-6 shadow-2xl border-2 backdrop-blur-xl bg-card/80 hover:shadow-primary/10 transition-shadow duration-300">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal hover:bg-accent/50 transition-colors", !checkIn && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal hover:bg-accent/50 transition-colors", !checkOut && "text-muted-foreground")}
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
                  disabled={(date) => (checkIn ? date < checkIn : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" className="w-full hover:scale-[1.02] transition-transform" size="lg">
          <Search className="mr-2 h-4 w-4" />
          Search Hotels
        </Button>
      </form>
    </Card>
  )
}
