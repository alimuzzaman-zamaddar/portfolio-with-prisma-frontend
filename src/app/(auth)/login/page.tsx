/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { http } from "@/lib/http";
import { setAuthToken } from "@/lib/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await http.post("/auth/login", values);
      const token = res.data?.token;
      if (!token) throw new Error("Missing token in response");

      setAuthToken(token);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 text-center">
          Owner Login
        </h1>
        <p className="mt-1 text-center text-sm text-slate-600">
          Access your dashboard securely
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              aria-invalid={!!errors.password}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in…" : "Login"}
          </button>
        </form>

      </div>
    </main>
  );
}
