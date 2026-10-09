
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const bengaliDigits = "০১২৩৪৫৬৭৮৯";

const toBengaliNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);

const formatUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    g: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] ?? unit;
};

const Marquee = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await res.json();
  } catch (error) {
    console.error("Marquee products fetch failed:", error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeText direction="right" duration={15}>
        <div className="flex w-max items-center gap-6 whitespace-nowrap px-4 py-3 sm:gap-8">
          {products.map((product) => {
            const direction = product.change?.dir;
            const isUp = direction === "up";
            const isDown = direction === "down";
            const isFlat = !isUp && !isDown;

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex shrink-0 items-center gap-2 text-xs transition-opacity hover:opacity-70 sm:text-sm"
              >
                <span aria-hidden="true">{product.image}</span>

                <span className="font-medium text-gray-800">
                  {product.nameBn}
                </span>

                <span className="text-gray-700">
                  {toBengaliNumber(product.today)} টাকা/
                  {formatUnit(product.unit)}
                </span>

                <span
                  className={
                    isUp
                      ? "font-medium text-green-600"
                      : isDown
                        ? "font-medium text-red-500"
                        : "font-medium text-gray-500"
                  }
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBengaliNumber(product.change?.pct ?? 0)}%
                </span>
              </Link>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;