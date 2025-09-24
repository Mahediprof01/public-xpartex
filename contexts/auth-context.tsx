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

  // Helper function to clear all authentication data
  const clearAllAuthData = async () => {
    setUser(null)
    await removeAuthToken()
    
    if (typeof window !== "undefined") {
      // Clear all possible storage locations
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
      
      // Clear any other user-related data if exists
      localStorage.removeItem('user_data')
      sessionStorage.removeItem('user_data')
    }
  }

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
          // Always fetch fresh user data from /auth/me endpoint to avoid stale data
          try {
            // Clear any potentially cached user data before fetching
            setUser(null)
            
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
              await clearAllAuthData()
            }
          } catch (error) {
            console.error('Error fetching user data during auth check:', error)
            // Clear invalid token and all auth data
            await clearAllAuthData()
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

    // CRITICAL: Clear ALL existing auth state first to prevent data persistence issues
    await clearAllAuthData()
    
    // Additional cleanup - force clear browser cache for user data
    if (typeof window !== 'undefined') {
      // Clear any cached API responses that might contain user data
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
      } catch (error) {
        console.log('Cache clearing not supported or failed:', error)
      }
    }

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
          // Store timestamp to help with cache busting
          localStorage.setItem('auth_token_timestamp', Date.now().toString())
        }

        // CRITICAL: Force fresh fetch of user data with cache busting
        try {
          // Add small delay to ensure token is properly set
          await new Promise(resolve => setTimeout(resolve, 100))
          
          const userResponse = await getCurrentUser()
          console.log('Fresh user data response after login:', userResponse)

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
            
            // Force re-render by setting to null first, then the new user
            setUser(null)
            setTimeout(() => setUser(user), 10)
            
          } else {
            // Fallback to basic user data if /auth/me fails
            console.warn('Failed to fetch user data, using fallback')
            const fallbackUser: User = {
              id: "user-" + Date.now(),
              email: email,
              firstName: email.split("@")[0],
              lastName: "User",
              fullName: email.split("@")[0] + " User",
              role: "buyer"
            }
            setUser(null)
            setTimeout(() => setUser(fallbackUser), 10)
          }
        } catch (error) {
          console.error('Error fetching user data after login:', error)
          // Fallback to basic user data
          const fallbackUser: User = {
            id: "user-" + Date.now(),
            email: email,
            firstName: email.split("@")[0],
            lastName: "User",
            fullName: email.split("@")[0] + " User",
            role: "buyer"
          }
          setUser(null)
          setTimeout(() => setUser(fallbackUser), 10)
        }

        setIsLoading(false)
        return true
      }

      console.log('Login failed - no valid token found')
      setIsLoading(false)
      return false

    } catch (error) {
      console.error("Login error:", error)
      await clearAllAuthData()
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    // Clear all authentication data
    await clearAllAuthData()

    // Additional cleanup - clear browser caches
    if (typeof window !== "undefined") {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
      } catch (error) {
        console.log('Cache clearing not supported or failed:', error)
      }

      // Redirect to home page after logout
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
