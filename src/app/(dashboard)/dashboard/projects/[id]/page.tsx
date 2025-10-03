/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { http } from "@/lib/http";
import Editor from "@/components/Editor";
import { useParams, useRouter } from "next/navigation";

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



export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get(`/projects/${params.id}`);
        const data = res.data?.data ?? res.data;
        reset({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          content: data.content || "",
          thumbnail: data.thumbnail || "",
          liveUrl: data.liveUrl || "",
          githubUrl: data.githubUrl || "",
          techStack: Array.isArray(data.techStack)
            ? data.techStack.join(", ")
            : "",
          isFeatured: Boolean(data.isFeatured),
          order: Number(data.order) || 0,
        });
      } catch (e: any) {
        toast.error(e?.message || "Failed to load project");
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: any) => {
    try {
      await http.put(`/projects/${params.id}`, {
        ...values,
        techStack: values.techStack
          ? values.techStack
              .split(",")
              .map((s:any) => s.trim())
              .filter(Boolean)
          : [],
      });
      toast.success("Project updated");
      router.push("/dashboard/projects");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update project");
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await http.delete(`/projects/${params.id}`);
      toast.success("Project deleted");
      router.push("/dashboard/projects");
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete project");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          Delete Project
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("title")}
            aria-invalid={!!errors.title}
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
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("slug")}
            aria-invalid={!!errors.slug}
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
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            {...register("description")}
            aria-invalid={!!errors.description}
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("thumbnail")}
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("liveUrl")}
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("githubUrl")}
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("techStack")}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isFeatured"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register("isFeatured")}
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("order", { valueAsNumber: true })}
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
          {isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
