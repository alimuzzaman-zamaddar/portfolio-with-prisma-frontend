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
  excerpt: z.string().optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof schema>;

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get(`/posts/${params.id}`);
        const data = res.data?.data ?? res.data;
        reset({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
        });
      } catch (e: any) {
        toast.error(e?.message || "Failed to load blog");
      }
    })();
  }, [params.id, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      await http.put(`/posts/${params.id}`, values);
      toast.success("Blog updated");
      router.push("/dashboard/blogs");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update blog");
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await http.delete(`/posts/${params.id}`);
      toast.success("Blog deleted");
      router.push("/dashboard/blogs");
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete blog");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Edit Blog</h1>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          Delete Blog
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
            Excerpt
          </label>
          <textarea
            {...register("excerpt")}
            rows={3}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">
              {errors.excerpt.message}
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
