import Link from "next/link";

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

type ProductCardProps = {
  product: Product;
};

const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isPriceUp = product.change.dir === "up";
  const isPriceDown = product.change.dir === "down";

  const changePercentage = toBengaliNumber(
    product.change.pct.toFixed(1),
  );

  const todayPrice = toBengaliNumber(product.today);

  const changeText = isPriceUp
    ? `▲ ${changePercentage}%`
    : isPriceDown
      ? `▼ ${changePercentage}%`
      : `—${changePercentage}%`;

  const changeBadgeClass = isPriceUp
    ? "bg-green-50 text-green-600"
    : isPriceDown
      ? "bg-red-50 text-red-600"
      : "bg-gray-100 text-gray-500";

  const unitText =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "liter"
        ? "প্রতি লিটার"
        : product.unit === "dozen"
          ? "প্রতি ডজন"
          : product.unit === "piece"
            ? "প্রতি পিস"
            : `প্রতি ${product.unit}`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <article
        className="
          h-full
          rounded-2xl
          border border-gray-100
          bg-white
          p-4
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-md
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-green-600
          sm:p-5
        "
      >
        {/* Product information */}
        <div className="flex items-start gap-3">
          {/* Emoji / Product image */}
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gray-50
              text-2xl
              transition-transform
              duration-200
              group-hover:scale-105
              sm:h-12
              sm:w-12
            "
          >
            {product.image || product.categoryIcon}
          </div>

          {/* Product name + unit */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              {unitText}
            </p>
          </div>
        </div>

        {/* Price section */}
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
              {todayPrice}{" "}
              <span className="text-sm font-medium text-gray-600">
                টাকা
              </span>
            </p>
          </div>

          {/* Change badge */}
          <span
            className={`
              inline-flex
              shrink-0
              items-center
              rounded-full
              px-2.5
              py-1
              text-[11px]
              font-semibold
              sm:text-xs
              ${changeBadgeClass}
            `}
          >
            {changeText}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;