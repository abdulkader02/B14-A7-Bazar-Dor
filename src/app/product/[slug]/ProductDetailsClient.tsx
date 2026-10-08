"use client";

import Link from "next/link";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
}

type ProductDetailsClientProps = {
  product: Product;
};

const toBengaliNumber = (value: number | string) => {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => bengaliDigits[Number(digit)],
  );
};

const getUnitText = (unit: string) => {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";

    case "liter":
      return "প্রতি লিটার";

    case "dozen":
      return "প্রতি ডজন";

    case "piece":
      return "প্রতি পিস";

    default:
      return `প্রতি ${unit}`;
  }
};

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const unitText = getUnitText(product.unit);

  const priceDifference = Math.abs(
    product.today - product.yesterday,
  );

  const bengaliPrice = toBengaliNumber(product.today);

  const bengaliPercentage = toBengaliNumber(
    product.change.pct.toFixed(1),
  );

  const bengaliDifference = toBengaliNumber(
    priceDifference,
  );

  const isPriceUp = product.change.dir === "up";
  const isPriceDown = product.change.dir === "down";

  const changeText = isPriceUp
    ? `গতকালের তুলনায় আজ দাম বেড়েছে • ${bengaliDifference} টাকা`
    : isPriceDown
      ? `গতকালের তুলনায় আজ দাম কমেছে • ${bengaliDifference} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const lowestPrice = Math.min(
    ...product.markets.map((market) => market.min),
  );

  const highestPrice = Math.max(
    ...product.markets.map((market) => market.max),
  );

  const averagePrice = product.today;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8">

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="transition hover:text-green-700"
            >
              হোম
            </Link>

            <span>›</span>

            <Link
              href={`/category/${product.category}`}
              className="transition hover:text-green-700"
            >
              {product.categoryNameBn}
            </Link>

            <span>›</span>

            <span className="font-medium text-gray-900">
              {product.nameBn}
            </span>
          </div>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">

            {/* Product information */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                  {product.image || product.categoryIcon}
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {product.nameBn}
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    {unitText} • {product.categoryNameBn}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {product.categoryNameBn}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {unitText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p
                  className={`text-sm font-medium ${
                    isPriceUp
                      ? "text-red-600"
                      : isPriceDown
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {changeText}
                </p>
              </div>
            </div>

            {/* Today's price */}
            <div className="rounded-2xl bg-green-50 p-5 sm:p-6">
              <p className="text-sm font-medium text-gray-600">
                আজকের দাম
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {bengaliPrice}
                </span>

                <span className="text-sm text-gray-600">
                  টাকা / {product.unit}
                </span>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    isPriceUp
                      ? "bg-red-100 text-red-600"
                      : isPriceDown
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isPriceUp
                    ? `▲ ${bengaliPercentage}%`
                    : isPriceDown
                      ? `▼ ${bengaliPercentage}%`
                      : `—${bengaliPercentage}%`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Minimum */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBengaliNumber(lowestPrice)}{" "}
                <span className="text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-2 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBengaliNumber(highestPrice)}{" "}
                <span className="text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-2 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBengaliNumber(averagePrice)}{" "}
                <span className="text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-2 text-xs text-gray-500">
                প্রতি {product.unit}-এর হিসেবে
              </p>
            </div>
          </div>
        </section>

        {/* Market-wise Prices */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারে আজকের {product.nameBn}-এর দামের তুলনা
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-600">
                  <tr>
                    <th className="px-4 py-4 sm:px-5">
                      বাজার
                    </th>

                    <th className="px-4 py-4 sm:px-5">
                      বিভাগ
                    </th>

                    <th className="px-4 py-4 sm:px-5">
                      সর্বনিম্ন
                    </th>

                    <th className="px-4 py-4 sm:px-5">
                      সর্বাধিক
                    </th>

                    <th className="px-4 py-4 sm:px-5">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {product.markets.map((market) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900 sm:px-5">
                          {market.market}
                        </td>

                        <td className="px-4 py-4 text-gray-600 sm:px-5">
                          {market.division}
                        </td>

                        <td className="px-4 py-4 text-gray-700 sm:px-5">
                          {toBengaliNumber(market.min)} টাকা
                        </td>

                        <td className="px-4 py-4 text-gray-700 sm:px-5">
                          {toBengaliNumber(market.max)} টাকা
                        </td>

                        <td className="px-4 py-4 font-semibold text-gray-900 sm:px-5">
                          {toBengaliNumber(
                            Math.round(marketAverage),
                          )}{" "}
                          টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}