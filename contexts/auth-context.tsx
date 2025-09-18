"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getCookie, setCookie, deleteCookie } from "@/lib/utils"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  role: "buyer" | "supplier"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Dummy user data for testing
const DUMMY_USER: User = {
  id: "demo-user-123",
  email: "demo@example.com",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  role: "buyer",
  avatar: "/placeholder-user.jpg"
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = getCookie("auth_token")
      const userData = getCookie("user_data")
      
      if (authToken && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error("Failed to parse user data:", error)
          // Clear invalid cookies
          deleteCookie("auth_token")
          deleteCookie("user_data")
        }
      }
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check dummy credentials
      if (email === "demo@example.com" && password === "Demo123!") {
        // Set auth cookies
        setCookie("auth_token", "dummy_token_12345", 7) // 7 days
        setCookie("user_data", JSON.stringify(DUMMY_USER), 7)
        
        setUser(DUMMY_USER)
        setIsLoading(false)
        return true
      }
      
      // Allow any other credentials for testing purposes
      const testUser: User = {
        id: "test-user-" + Date.now(),
        email: email,
        firstName: email.split("@")[0],
        lastName: "User",
        fullName: email.split("@")[0] + " User",
        role: "buyer",
        avatar: "/placeholder-user.jpg"
      }
      
      setCookie("auth_token", "test_token_" + Date.now(), 7)
      setCookie("user_data", JSON.stringify(testUser), 7)
      
      setUser(testUser)
      setIsLoading(false)
      return true
      
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    deleteCookie("auth_token")
    deleteCookie("user_data")
    deleteCookie("remember_token")
    
    // Redirect to home page after logout
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}