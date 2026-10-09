
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  // Email Registration
  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isLoading || isGoogleLoading || isGithubLoading) return;

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!name) {
      toast.error("নাম দিন");
      return;
    }

    if (!email) {
      toast.error("ইমেইল দিন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/signin",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে");
      router.push("/signin");
    } catch {
      toast.error("রেজিস্ট্রেশন করতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Registration / Login
  const handleGoogleLogin = async () => {
    if (isLoading || isGoogleLoading || isGithubLoading) return;

    setIsGoogleLoading(true);

    toast.loading("Google দিয়ে চালিয়ে যাচ্ছেন...", {
      id: "google-signup",
    });

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে লগইন করা যায়নি", {
          id: "google-signup",
        });
        setIsGoogleLoading(false);
      }
    } catch {
      toast.error("Google দিয়ে লগইন করতে সমস্যা হয়েছে", {
        id: "google-signup",
      });
      setIsGoogleLoading(false);
    }
  };

  // GitHub Registration / Login
  const handleGithubLogin = async () => {
    if (isLoading || isGoogleLoading || isGithubLoading) return;

    setIsGithubLoading(true);

    toast.loading("GitHub দিয়ে চালিয়ে যাচ্ছেন...", {
      id: "github-signup",
    });

    try {
      const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে লগইন করা যায়নি", {
          id: "github-signup",
        });
        setIsGithubLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      toast.error("GitHub login URL পাওয়া যায়নি", {
        id: "github-signup",
      });
      setIsGithubLoading(false);
    } catch {
      toast.error("GitHub দিয়ে লগইন করতে সমস্যা হয়েছে", {
        id: "github-signup",
      });
      setIsGithubLoading(false);
    }
  };

  const isAnyLoading =
    isLoading || isGoogleLoading || isGithubLoading;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            BazarDor-এ নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার নাম"
              required
              disabled={isAnyLoading}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              disabled={isAnyLoading}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              minLength={8}
              disabled={isAnyLoading}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:opacity-60"
            />
          </div>

          {isLoading ? (
            <div
              className="h-12 w-full animate-pulse rounded-xl bg-gray-200"
              aria-label="অ্যাকাউন্ট তৈরি হচ্ছে"
            />
          ) : (
            <button
              type="submit"
              disabled={isGoogleLoading || isGithubLoading}
              className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              সাইন আপ করুন
            </button>
          )}
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isAnyLoading}
          className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading
            ? "Google দিয়ে লগইন হচ্ছে..."
            : "Google দিয়ে চালিয়ে যান"}
        </button>

        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={isAnyLoading}
          className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGithubLoading
            ? "GitHub দিয়ে লগইন হচ্ছে..."
            : "GitHub দিয়ে চালিয়ে যান"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;