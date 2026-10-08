import ProductCard from "./ProductCard";

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

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await response.json();

  return data;
};

const ProductsCard = async () => {
  const products = await getProducts();

  // Section A: Top 6 products whose price increased
  const upProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((productA, productB) => productB.change.pct - productA.change.pct)
    .slice(0, 6);

  // Section B: Top 6 products whose price decreased
  const downProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((productA, productB) => productB.change.pct - productA.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Section A — Price Increased */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-red-600 sm:text-xl">
            ▲ আজ দাম বেড়েছে
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B — Price Decreased */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-green-600 sm:text-xl">
            ▼ আজ দাম কমেছে
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {downProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C — All Products */}
      <section id="সব-পণ্য">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজকের বাজারের সব পণ্যের সর্বশেষ দাম এক নজরে দেখুন
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsCard;
