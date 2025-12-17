"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { saveAuth } from "@/lib/auth"
import { Hotel } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await api.login({ email, password })
      saveAuth(response.token, response.user)

      // Redirect based on role
      if (response.user.role === "ADMIN" || response.user.role === "MANAGER") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1920&h=1080&fit=crop&q=80)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="text-2xl font-serif font-semibold">Transylvania</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-serif">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
