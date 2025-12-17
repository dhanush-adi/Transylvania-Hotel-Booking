"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Hotel, User, LogOut, LayoutDashboard } from "lucide-react"
import { getAuth, clearAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const { user: authUser } = getAuth()
    setUser(authUser)
  }, [])

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="text-xl font-serif font-semibold">Transylvania</span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {(user.role === "ADMIN" || user.role === "MANAGER") && (
                <Button variant={isActive("/admin") ? "default" : "ghost"} asChild>
                  <Link href="/admin">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button variant={isActive("/dashboard") ? "default" : "ghost"} asChild>
                <Link href="/dashboard">My Bookings</Link>
              </Button>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
