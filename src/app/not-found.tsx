import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-5 text-7xl">🔎</div>

        <h1 className="text-4xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-700">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:text-base"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}