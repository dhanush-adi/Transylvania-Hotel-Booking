// Authentication helper functions
export interface User {
  id: number
  name: string
  email: string
  role: string
}

export function saveAuth(token: string, user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token)
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getAuth(): { token: string | null; user: User | null } {
  if (typeof window === "undefined") {
    return { token: null, user: null }
  }

  const token = localStorage.getItem("authToken")
  const userStr = localStorage.getItem("user")
  const user = userStr ? JSON.parse(userStr) : null

  return { token, user }
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }
}

export function isAuthenticated(): boolean {
  const { token } = getAuth()
  return !!token
}

export function isAdmin(): boolean {
  const { user } = getAuth()
  return user?.role === "ADMIN" || user?.role === "MANAGER"
}
