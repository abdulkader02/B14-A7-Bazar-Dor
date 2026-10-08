import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";


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

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getProduct = async (slug: string): Promise<Product | null> => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  const product = products.find(
    (currentProduct) => currentProduct.slug === slug,
  );

  return product ?? null;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
