import { AuthResponse, RegisterPayload } from "../types";

export async function loginUser(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 500));
  if (email === "admin@example.com" && password === "admin123") {
    return {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ==.mock",
      role: "admin",
    };
  }
  if (email === "user@example.com" && password === "user123") {
    return {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.mock",
      role: "user",
    };
  }
  return { success: false, message: "Invalid credentials" };
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Network error" };
  }
}