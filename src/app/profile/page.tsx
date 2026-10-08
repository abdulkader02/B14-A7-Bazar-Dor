"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUser = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    await authClient.updateUser({
      name: newUser.name,
    });

    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signin";
        },
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-neutral">আমার প্রোফাইল</h1>

        <p className="text-sm text-neutral/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User Info Card */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-base-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <div className="avatar">
              <div className="h-16 w-16 overflow-hidden rounded-2xl shadow">
                <img
                  src={user.image}
                  alt={`${user.name} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700 shadow">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-neutral">{user?.name}</h2>

            <p className="text-sm text-neutral/60">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          সাইন আউট
        </button>
      </div>

      {/* Details / Update Form Section */}
      <div className="rounded-2xl border border-base-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-neutral">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral">
              নাম
            </label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-xl border border-base-300 bg-base-100/50 px-4 py-3 text-sm text-neutral outline-none transition-colors focus:border-green-600 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-800 active:scale-[0.99]"
          >
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
