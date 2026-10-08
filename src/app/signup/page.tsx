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

  // =========================
  // Email Registration
  // =========================
  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    // Validation
    if (!user.name.trim()) {
      toast.error("নাম দিন");
      return;
    }

    if (!user.email.trim()) {
      toast.error("ইমেইল দিন");
      return;
    }

    if (user.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: "/signin",
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        error.message || "Registration failed",
      );
      return;
    }

    console.log("Registered user:", data);

    toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে");

    router.push("/signin");
  };

  // =========================
  // Google Login
  // =========================
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    toast.loading("Google দিয়ে লগইন হচ্ছে...", {
      id: "google-login",
    });

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setIsGoogleLoading(false);

      toast.error(
        error.message || "Google login failed",
        {
          id: "google-login",
        },
      );
    }
  };

  // =========================
  // GitHub Login
  // =========================
  const handleGithubLogin = async () => {
    setIsGithubLoading(true);

    toast.loading("GitHub দিয়ে লগইন হচ্ছে...", {
      id: "github-login",
    });

    const { data, error } =
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });

    console.log("GitHub data:", data);
    console.log("GitHub error:", error);

    if (error) {
      setIsGithubLoading(false);

      toast.error(
        error.message || "GitHub login failed",
        {
          id: "github-login",
        },
      );

      return;
    }

    // Better Auth returned the GitHub OAuth URL
    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    setIsGithubLoading(false);

    toast.error("GitHub login URL পাওয়া যায়নি", {
      id: "github-login",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            BazarDor-এ নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Register Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >
          {/* Name */}
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
              placeholder="আপনার নাম"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* Email */}
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
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* Password */}
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
              placeholder="আপনার পাসওয়ার্ড"
              required
              minLength={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* Register Button */}
          {isLoading ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
          ) : (
            <button
              type="submit"
              disabled={
                isGoogleLoading || isGithubLoading
              }
              className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              সাইন আপ করুন
            </button>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">
            অথবা
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={
            isGoogleLoading ||
            isGithubLoading ||
            isLoading
          }
          className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading
            ? "Google দিয়ে লগইন হচ্ছে..."
            : "Google দিয়ে চালিয়ে যান"}
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={
            isGithubLoading ||
            isGoogleLoading ||
            isLoading
          }
          className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGithubLoading
            ? "GitHub দিয়ে লগইন হচ্ছে..."
            : "GitHub দিয়ে চালিয়ে যান"}
        </button>

        {/* Sign In Link */}
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
