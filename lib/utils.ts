import { AuthError, LoginAttempt } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Password validation utilities
export interface PasswordValidation {
  isValid: boolean
  errors: string[]
  strength: "weak" | "medium" | "strong" | "very-strong"
  score: number
}

export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = []
  let score = 0

  // Minimum length check
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  } else {
    score += 1
  }

  // Uppercase letter check
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  } else {
    score += 1
  }

  // Lowercase letter check
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  } else {
    score += 1
  }

  // Number check
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  } else {
    score += 1
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character")
  } else {
    score += 1
  }

  // Common patterns check
  const commonPatterns = [
    /(.)\1{2,}/, // Repeated characters
    /123456/, // Sequential numbers
    /password/i, // Common words
    /qwerty/i,
  ]

  if (commonPatterns.some(pattern => pattern.test(password))) {
    errors.push("Password contains common patterns and is easily guessable")
    score = Math.max(0, score - 1)
  }

  // Determine strength
  let strength: PasswordValidation["strength"] = "weak"
  if (score >= 5) strength = "very-strong"
  else if (score >= 4) strength = "strong"
  else if (score >= 3) strength = "medium"

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score: Math.min(score, 5)
  }
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Token utilities
export const generateToken = (): string => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36)
}

export const isTokenExpired = (timestamp: number, expiryMinutes: number = 15): boolean => {
  return Date.now() - timestamp > expiryMinutes * 60 * 1000
}

// Cookie utilities
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null
  
  const nameEQ = name + "="
  const cookies = document.cookie.split(";")
  
  for (let cookie of cookies) {
    let c = cookie.trim()
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
}

// Account lockout utilities
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface LoginAttemptStorage {
  attempts: LoginAttempt[]
  lockoutUntil?: number
}

export const getLoginAttempts = (email: string): LoginAttemptStorage => {
  if (typeof localStorage === "undefined") {
    return { attempts: [] }
  }
  
  const stored = localStorage.getItem(`login_attempts_${email}`)
  if (!stored) return { attempts: [] }
  
  try {
    const data = JSON.parse(stored)
    return {
      attempts: data.attempts.map((attempt: any) => ({
        ...attempt,
        timestamp: new Date(attempt.timestamp)
      })),
      lockoutUntil: data.lockoutUntil
    }
  } catch {
    return { attempts: [] }
  }
}

export const recordLoginAttempt = (email: string, success: boolean): boolean => {
  if (typeof localStorage === "undefined") return false
  
  const now = new Date()
  const storage = getLoginAttempts(email)
  
  // Check if account is locked
  if (storage.lockoutUntil && now.getTime() < storage.lockoutUntil) {
    return false // Account is locked
  }

  // Clean old attempts (older than 1 hour)
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
  storage.attempts = storage.attempts.filter(attempt => attempt.timestamp > oneHourAgo)

  // Add new attempt
  storage.attempts.push({
    email,
    timestamp: now,
    success
  })

  if (success) {
    // Clear attempts on successful login
    localStorage.removeItem(`login_attempts_${email}`)
    return true
  }

  // Check if we need to lock the account
  const recentFailures = storage.attempts.filter(
    attempt => !attempt.success && 
    attempt.timestamp > new Date(now.getTime() - 15 * 60 * 1000)
  )

  if (recentFailures.length >= MAX_LOGIN_ATTEMPTS) {
    storage.lockoutUntil = now.getTime() + LOCKOUT_DURATION
  }

  localStorage.setItem(`login_attempts_${email}`, JSON.stringify({
    attempts: storage.attempts.map(attempt => ({
      ...attempt,
      timestamp: attempt.timestamp.toISOString()
    })),
    lockoutUntil: storage.lockoutUntil
  }))

  return recentFailures.length < MAX_LOGIN_ATTEMPTS
}

export const isAccountLocked = (email: string): { locked: boolean; unlockTime?: Date } => {
  const storage = getLoginAttempts(email)
  
  if (!storage.lockoutUntil) return { locked: false }
  
  const now = Date.now()
  if (now < storage.lockoutUntil) {
    return { 
      locked: true, 
      unlockTime: new Date(storage.lockoutUntil) 
    }
  }

  // Lockout expired, clean up
  localStorage.removeItem(`login_attempts_${email}`)
  return { locked: false }
}

// Form validation utilities
export const createAuthError = (code: string, message: string, field?: string): AuthError => ({
  code,
  message,
  field
})

export const formatErrorMessage = (error: AuthError): string => {
  return error.message
}

// Social auth utilities
export const initializeGoogleAuth = (clientId: string) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Google Auth can only be initialized in the browser"))
      return
    }

    // This would typically load the Google Identity Services library
    // For now, we'll just return a mock
    resolve({
      signIn: () => Promise.resolve({ credential: "mock_google_token" })
    })
  })
}

export const initializeLinkedInAuth = (clientId: string) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("LinkedIn Auth can only be initialized in the browser"))
      return
    }

    // This would typically load the LinkedIn SDK
    // For now, we'll just return a mock
    resolve({
      authorize: () => Promise.resolve({ code: "mock_linkedin_code" })
    })
  })
}

// MFA utilities
export const generateMFASecret = (): string => {
  // In a real app, this would generate a proper TOTP secret
  return Math.random().toString(36).substr(2, 16).toUpperCase()
}

export const validateMFACode = (code: string, secret: string): boolean => {
  // In a real app, this would validate against TOTP algorithm
  // For demo purposes, we'll accept any 6-digit code
  return /^\d{6}$/.test(code)
}
