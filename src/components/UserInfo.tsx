"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/signin");
        },
      },
    });

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
    }
  };

  // Session loading
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

        <div className="hidden h-4 w-20 animate-pulse rounded bg-gray-200 sm:block" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          {/* User Button */}
          <button
            type="button"
            tabIndex={0}
            className="m-1 flex cursor-pointer items-center gap-2"
          >
            {/* Avatar */}
            {user.image ? (
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img src={user.image} alt={`${user.name} avatar`} />
                </div>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {/* User Name */}
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </button>

          {/* Dropdown */}
          <ul
            tabIndex={0}
            className="dropdown-content menu z-10 mt-2 w-64 rounded-box border border-gray-100 bg-base-100 p-2 shadow-lg"
          >
            {/* User Information */}
            <li className="menu-title px-4 py-2">
              <span className="text-base font-bold text-gray-900">
                {user.name}
              </span>

              <span className="text-xs font-normal normal-case text-gray-500">
                {user.email}
              </span>
            </li>

            {/* Divider */}
            <li className="my-1 border-t border-gray-100" />

            {/* Profile */}
            <li>
              <Link href="/profile" className="flex items-center gap-2 py-2.5">
                <span>👤</span>
                আমার প্রোফাইল
              </Link>
            </li>

            {/* Sign Out */}
            <li>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 py-2.5 text-error hover:bg-error/10"
              >
                <span>🚪</span>
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Link href="/signin">
            <button className="btn btn-sm flex-1 sm:btn-md sm:flex-none">
              সাইন ইন
            </button>
          </Link>

          <Link href="/signup">
            <button className="btn btn-sm flex-1 bg-green-600 text-white hover:bg-green-700 sm:btn-md sm:flex-none">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
