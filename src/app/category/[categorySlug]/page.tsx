import CategoryProductsClient from "./CategoryProductsClient";

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

type CategoryProductsPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

async function getCategoryProducts(
  categorySlug: string
): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

export default async function CategoryProductsPage({
  params,
}: CategoryProductsPageProps) {
  const { categorySlug } = await params;

  const products = await getCategoryProducts(categorySlug);

  const categoryNameBn = products[0]?.categoryNameBn ?? "";
  const categoryIcon = products[0]?.categoryIcon ?? "";

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <CategoryProductsClient
          initialProducts={products}
          categoryNameBn={categoryNameBn}
          categoryIcon={categoryIcon}
        />
      </div>
    </main>
  );
}