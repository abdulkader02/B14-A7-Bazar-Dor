
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient, signIn} from "@/lib/auth-client";

const SignIn = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  // =========================
  // Email Login
  // =========================
  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    // Validation
    if (!user.email.trim()) {
      toast.error("ইমেইল দিন");
      return;
    }

    if (!user.password) {
      toast.error("পাসওয়ার্ড দিন");
      return;
    }

    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়",
      );
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");

    router.push("/");
  };

  // =========================
  // Google Login
  // =========================
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    toast.loading("Google দিয়ে সাইন ইন হচ্ছে...", {
      id: "google-login",
    });

    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });

    if (error) {
      setIsGoogleLoading(false);

      toast.error(
        error.message || "Google দিয়ে সাইন ইন করা যায়নি",
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

    toast.loading("GitHub দিয়ে সাইন ইন হচ্ছে...", {
      id: "github-login",
    });

    const { data, error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });

    console.log("GitHub data:", data);
    console.log("GitHub error:", error);

    if (error) {
      setIsGithubLoading(false);

      toast.error(
        error.message || "GitHub দিয়ে সাইন ইন করা যায়নি",
        {
          id: "github-login",
        },
      );

      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    } else {
      setIsGithubLoading(false);

      toast.error("GitHub login URL পাওয়া যায়নি", {
        id: "github-login",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার BazarDor অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Login Button */}
          {isLoading ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
          ) : (
            <button
              type="submit"
              disabled={
                isGoogleLoading || isGithubLoading
              }
              className="w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              সাইন ইন করুন
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
        {isGoogleLoading ? (
          <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
        ) : (
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={
              isGithubLoading || isLoading
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Google দিয়ে চালিয়ে যান
          </button>
        )}

        {/* GitHub */}
        {isGithubLoading ? (
          <div className="mt-3 h-12 w-full animate-pulse rounded-xl bg-gray-200" />
        ) : (
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={
              isGoogleLoading || isLoading
            }
            className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        )}

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
