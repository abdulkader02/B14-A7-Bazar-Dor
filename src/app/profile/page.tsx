"use client";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    
      const user = session?.user;
    return (
        <div>
            {user?.image ? (
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img src={user?.image} alt={`${user?.name} avatar`} />
                </div>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
        </div>
    );
};

export default ProfilePage;