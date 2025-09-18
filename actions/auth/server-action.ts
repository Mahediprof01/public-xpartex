"use server";

import { cookies } from "next/headers";
import { api } from "@/config/fetch-request";
import { AUTH_ENDPOINTS } from "@/constant/api-path";
import { RegisterRequest, LoginRequest } from "./type";

export async function registerUser(data: RegisterRequest): Promise<{ success: boolean; message: string; error?: string }> {
  const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);
  return response;
}


export async function loginUser(data: LoginRequest): Promise<{ success: boolean; message: string; data?: { accessToken: string }; error?: string }> {
  const response = await api.post(AUTH_ENDPOINTS.LOGIN, data);
  return response;
}

export async function storeAuthToken(token: string, rememberMe: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
  
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
}

/**
 * Get authentication token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  return token?.value || null;
}

/**
 * Remove authentication token
 */
export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}