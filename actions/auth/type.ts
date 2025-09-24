// Registration request matching /auth/signup API
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string; // Made optional since it's not required
  address: string;
  registrationdate: string;
}

// Login request matching /auth/signin API
export interface LoginRequest {
  email: string;
  password: string;
}

// OTP verification request matching /auth/verify-otp API
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

// User roles
export type UserRole = "buyer" | "supplier" | "both";

// Alert types for UI
export type AlertType = "success" | "error" | "warning" | "info";