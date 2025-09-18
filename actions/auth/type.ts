// Registration request matching /auth/signup API
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  registrationdate: string;
}

// Login request matching /auth/signin API
export interface LoginRequest {
  email: string;
  password: string;
}

// User roles
export type UserRole = "buyer" | "supplier" | "both";

// Alert types for UI
export type AlertType = "success" | "error" | "warning" | "info";