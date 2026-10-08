import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
interface Product {
  id: number;
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
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const products: Product[] = await res.json();

  return (
      <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
          <MarqueeText direction='right' duration={15}>
      <div className="flex gap-8 whitespace-nowrap py-2">
        {products.map((product) => (
            <div
            key={product?.id}
            className="flex items-center gap-2 text-sm"
          >
            <span>{product?.image}</span>

            <span className="font-medium">
              {product?.nameBn}
            </span>

            <span>
              {product?.today} টাকা/{product?.unit}
            </span>

            <span
              className={
                product?.change.dir === "up"
                  ? "text-red-500"
                  : "text-green-600"
              }
            >
              {product?.change.dir === "up" ? "▲" : "▼"}{" "}
              {product?.change.pct}%
            </span>
          </div>
        ))}
      </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;