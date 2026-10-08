"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  nameBn: string;
  slug: string;
  icon: string;
}

const NavLinks = () => {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <nav className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex min-w-max items-center gap-1 overflow-x-auto py-2">
          {categories.map((category) => {
            const categoryPath = `/category/${category.slug}`;

            const isActive =
              pathname === categoryPath ||
              pathname.startsWith(`${categoryPath}/`);

            return (
              <Link
                key={category.id}
                href={categoryPath}
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                }`}
              >
                <span>{category.icon}</span>

                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
