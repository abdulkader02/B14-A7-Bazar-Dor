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
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  const products: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeText direction="right" duration={15}>
        <div className="flex gap-8 whitespace-nowrap py-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-2 text-sm hover:opacity-70"
            >
              <span>{product.image}</span>

              <span className="font-medium">{product.nameBn}</span>

              <span>
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;