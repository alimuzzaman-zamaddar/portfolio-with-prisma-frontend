"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { http } from "@/lib/http";
import Editor from "@/components/Editor";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug must be URL-safe (letters, numbers, hyphen)"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  techStack: z.string().optional().or(z.literal("")),
  isFeatured: z.boolean().optional().default(false),
  order: z.coerce
    .number()
    .int()
    .min(0, "Order must be 0 or greater")
    .default(0),
});

type FormValues = z.infer<typeof schema>;

export default function NewProjectPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { isFeatured: false, order: 0 },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await http.post("/projects", {
        ...values,
        techStack: values.techStack
          ? values.techStack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      });
      toast.success("Project created");
      router.push("/dashboard/projects");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create project");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10">
      <h1 className="text-2xl font-bold text-slate-900">Create New Project</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            {...register("title")}
            aria-invalid={!!errors.title}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Slug
          </label>
          <input
            {...register("slug")}
            aria-invalid={!!errors.slug}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={3}
            {...register("description")}
            aria-invalid={!!errors.description}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Content
          </label>
          <Editor
            onChange={(html) =>
              setValue("content", html, { shouldValidate: true })
            }
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Thumbnail URL
            </label>
            <input
              {...register("thumbnail")}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Live URL
            </label>
            <input
              {...register("liveUrl")}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.liveUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.liveUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              GitHub URL
            </label>
            <input
              {...register("githubUrl")}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.githubUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.githubUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Tech stack (comma-separated)
            </label>
            <input
              placeholder="Next.js, Tailwind, Prisma"
              {...register("techStack")}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isFeatured"
              type="checkbox"
              {...register("isFeatured")}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isFeatured" className="text-sm text-slate-700">
              Featured
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Order
            </label>
            <input
              type="number"
              {...register("order", { valueAsNumber: true })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.order && (
              <p className="mt-1 text-sm text-red-600">
                {errors.order.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Creating…" : "Create Project"}
        </button>
      </form>
    </main>
  );
}
