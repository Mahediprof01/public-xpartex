"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { loginUser, storeAuthToken, getAuthToken, removeAuthToken, getCurrentUser } from "@/actions/auth/server-action"

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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        let token = await getAuthToken()

        // If no token in cookies, check localStorage as fallback
        if (!token && typeof window !== 'undefined') {
          token = localStorage.getItem('auth_token')
        }

        console.log('Checking auth status, token found:', !!token) // Debug log
        if (token) {
          // Fetch user data from /auth/me endpoint
          try {
            const userResponse = await getCurrentUser()
            console.log('Auth check - User data response:', userResponse)

            if (userResponse.success && userResponse.data) {
              const userData = userResponse.data
              const user: User = {
                id: userData.id || "authenticated-user",
                email: userData.email || "user@example.com",
                firstName: userData.firstName || "User",
                lastName: userData.lastName || "Name",
                fullName: userData.firstName && userData.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : "User Name",
                role: (userData.role as "buyer" | "supplier") || "buyer",
                avatar: userData.avatar
              }
              setUser(user)
            } else {
              // If /auth/me fails, clear the token as it might be invalid
              console.log('Invalid token, clearing auth state')
              if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
              }
              await removeAuthToken()
            }
          } catch (error) {
            console.error('Error fetching user data during auth check:', error)
            // Clear invalid token
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth_token')
            }
            await removeAuthToken()
          }
        }
      } catch (error) {
        console.error("Failed to check auth status:", error)
      }
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await loginUser({
        email: email.toLowerCase().trim(),
        password: password,
      })

      console.log('Login response:', response) // Debug log

      // Handle different possible response structures from your backend
      let token = null;
      if (response.data) {
        // Try different possible token locations
        token = response.data.accessToken ||
                response.data.token ||
                response.data.access_token ||
                (typeof response.data === 'string' ? response.data : null);
      }

      console.log('Login successful, token extracted:', !!token); // Debug log

      if (response.success && token && typeof token === 'string') {
        // Store token in HTTP-only cookie
        await storeAuthToken(token, rememberMe)

        // Also store in localStorage as fallback for client-side requests
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token)
        }

        // Fetch user data from /auth/me endpoint
        try {
          const userResponse = await getCurrentUser()
          console.log('User data response:', userResponse)

          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data
            const user: User = {
              id: userData.id || "user-" + Date.now(),
              email: userData.email || email,
              firstName: userData.firstName || email.split("@")[0],
              lastName: userData.lastName || "User",
              fullName: userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : email.split("@")[0] + " User",
              role: (userData.role as "buyer" | "supplier") || "buyer",
              avatar: userData.avatar
            }
            setUser(user)
          } else {
            // Fallback to basic user data if /auth/me fails
            const user: User = {
              id: "user-" + Date.now(),
              email: email,
              firstName: email.split("@")[0],
              lastName: "User",
              fullName: email.split("@")[0] + " User",
              role: "buyer"
            }
            setUser(user)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Fallback to basic user data
          const user: User = {
            id: "user-" + Date.now(),
            email: email,
            firstName: email.split("@")[0],
            lastName: "User",
            fullName: email.split("@")[0] + " User",
            role: "buyer"
          }
          setUser(user)
        }

        setIsLoading(false)
        return true
      }

      console.log('Login failed - no valid token found')
      setIsLoading(false)
      return false

    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    setUser(null)
    await removeAuthToken()

    // Also clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
    }

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
