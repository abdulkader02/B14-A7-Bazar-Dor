"use client";

import { useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type CategoryProductsClientProps = {
  initialProducts: Product[];
  categoryNameBn: string;
  categoryIcon: string;
};

type SortOption = "default" | "asc" | "desc";

export default function CategoryProductsClient({
  initialProducts,
  categoryNameBn,
  categoryIcon,
}: CategoryProductsClientProps) {
  const [sortOption, setSortOption] =
    useState<SortOption>("default");


  const sortedProducts = [...initialProducts];

if (sortOption === "asc") {
  sortedProducts.sort(
    (productA, productB) => productA.today - productB.today
  );
}

if (sortOption === "desc") {
  sortedProducts.sort(
    (productA, productB) => productB.today - productA.today
  );
}

  return (
    <section className="w-full">
      {/* ================= CATEGORY HEADER ================= */}
      <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:p-6">
        {/* Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
          {categoryIcon || "📦"}
        </div>

        {/* Category Information */}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-gray-800 sm:text-2xl">
            {categoryNameBn || "পণ্যসমূহ"}
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            {initialProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* ================= SORT BAR ================= */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Product Count */}
        <p className="text-sm font-medium text-gray-600">
          মোট {initialProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Sort */}
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm text-gray-500"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>

            <option value="asc">
              দাম: কম থেকে বেশি
            </option>

            <option value="desc">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-4 py-12 text-center shadow-sm sm:px-6">
          <div className="mb-3 text-4xl">📦</div>

          <h2 className="text-lg font-semibold text-gray-700">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      ) : (
        /* ================= PRODUCT GRID ================= */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <article
                key={product.id}
                className="flex min-w-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                {/* Product Information */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Product Image/Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                    {product.image}
                  </div>

                  {/* Product Name */}
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-bold text-gray-800 sm:text-lg">
                      {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-sm text-gray-500">
                      প্রতি{" "}
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit}
                    </p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                  {/* Today's Price */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {product.today}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        টাকা
                      </span>
                    </p>
                  </div>

                  {/* Price Change */}
                  <div
                    className={`shrink-0 text-sm font-medium ${
                      isUp
                        ? "text-red-500"
                        : isDown
                          ? "text-green-500"
                          : "text-gray-400"
                    }`}
                  >
                    <span>
                      {isUp
                        ? "▲"
                        : isDown
                          ? "▼"
                          : "—"}
                    </span>{" "}
                    {product.change.pct}%
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}