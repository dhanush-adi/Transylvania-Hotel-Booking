// API utility functions for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role?: "USER" | "ADMIN" | "MANAGER"
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: string
  }
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

import { mockHotels, mockRooms, mockBookings } from "./mock-data"

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "An error occurred" }))
      throw new ApiError(response.status, errorData.message || `Error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    // If backend is unavailable, use mock data
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.log("[v0] Backend unavailable, using mock data for demo")
      return handleMockResponse<T>(endpoint, options.method || "GET")
    }
    throw error
  }
}

function handleMockResponse<T>(endpoint: string, method: string): T {
  // Hotels endpoints
  if (endpoint.includes("/hotels") && method === "GET") {
    if (endpoint.match(/\/hotels\/\d+\/rooms/)) {
      return mockRooms as T
    }
    if (endpoint.match(/\/hotels\/\d+/)) {
      const id = Number.parseInt(endpoint.split("/").pop() || "1")
      const hotel = mockHotels.find((h) => h.id === id) || mockHotels[0]
      return hotel as T
    }
    return mockHotels as T
  }

  // Bookings endpoints
  if (endpoint.includes("/bookings")) {
    if (endpoint.includes("/bookings/user") || endpoint.includes("/bookings/all")) {
      return mockBookings as T
    }
  }

  // Auth endpoints - throw error to show login won't work in demo mode
  if (endpoint.includes("/auth")) {
    throw new ApiError(503, "Authentication requires backend server. Demo mode active.")
  }

  // Default empty response
  return [] as T
}

export const api = {
  // Auth
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Hotels
  getHotels: async (params?: { location?: string; minPrice?: number; maxPrice?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>)
    return fetchApi(`/hotels?${query}`)
  },

  getHotelById: async (id: number) => {
    return fetchApi(`/hotels/${id}`)
  },

  getRoomsByHotelId: async (hotelId: number) => {
    return fetchApi(`/hotels/${hotelId}/rooms`)
  },

  // Bookings
  createBooking: async (bookingData: any) => {
    return fetchApi("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  },

  getUserBookings: async () => {
    return fetchApi("/bookings/user")
  },

  cancelBooking: async (bookingId: number) => {
    return fetchApi(`/bookings/${bookingId}`, {
      method: "DELETE",
    })
  },

  // Admin
  getAllBookings: async () => {
    return fetchApi("/bookings/all")
  },

  createHotel: async (hotelData: any) => {
    return fetchApi("/hotels", {
      method: "POST",
      body: JSON.stringify(hotelData),
    })
  },

  updateHotel: async (id: number, hotelData: any) => {
    return fetchApi(`/hotels/${id}`, {
      method: "PUT",
      body: JSON.stringify(hotelData),
    })
  },

  createRoom: async (hotelId: number, roomData: any) => {
    return fetchApi(`/hotels/${hotelId}/rooms`, {
      method: "POST",
      body: JSON.stringify(roomData),
    })
  },
}

export { ApiError }
