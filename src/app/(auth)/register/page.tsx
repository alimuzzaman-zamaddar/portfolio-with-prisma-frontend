/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { http } from "@/lib/http";
import { setAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
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
      const { name, email, password } = values;
      await http.post("/auth/register", { name, email, password });
      const res = await http.post("/auth/login", { email, password });
      const token = res.data?.token;
      if (token) setAuthToken(token);

      toast.success("Account created");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 text-center">
          Create an Account
        </h1>
        <p className="mt-1 text-center text-sm text-slate-600">
          Join us and start building today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              {...register("name")}
              aria-invalid={!!errors.name}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating…" : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
