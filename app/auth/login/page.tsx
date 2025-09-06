"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/auth";
import Link from "next/link";

const DEMO_ACCOUNTS = [
  {
    label: "Demo Admin",
    email: "admin@example.com",
    password: "admin123",
  },
  {
    label: "Demo User",
    email: "user@example.com",
    password: "user123",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDemo = (email: string, password: string) => {
    setForm({ email, password });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(form.email, form.password);
      if (res.success) {
        localStorage.setItem("jwt", res.token ?? "");
        if (res.role === "admin") router.push("/dashboard");
        else router.push("/branches");
      } else {
        setError(res.message || "Login failed");
      }
    } catch {
      setError("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md rounded-xl shadow-lg border-0" style={{ borderColor: "#0047ab" }}>
        <CardHeader className="text-center text-2xl font-bold text-[#0047ab]">Login</CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="w-full bg-[#0047ab] text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </form>
          <div className="flex flex-col gap-2 mt-4">
            {DEMO_ACCOUNTS.map((demo) => (
              <Button
                key={demo.label}
                variant="outline"
                className="w-full"
                onClick={() => handleDemo(demo.email, demo.password)}
              >
                {demo.label}
              </Button>
            ))}
          </div>
          <div className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-[#0047ab] font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}