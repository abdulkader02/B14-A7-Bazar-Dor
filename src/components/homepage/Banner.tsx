import Image from "next/image";
import banner from "@/assets/bazar-hero.png";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white px-5 py-6 sm:flex-row sm:px-8 sm:py-8">
        {/* Left Content */}
        <div className="w-full sm:w-3/5">
          {/* Eyebrow */}
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 sm:text-sm">
            {date}
          </p>

          {/* Main Heading */}
          <h1 className="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <Link
            href="#সব-পণ্য"
            className="btn btn-sm mt-5 bg-green-600 text-white hover:bg-green-700 sm:btn-md"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full sm:w-2/5">
          <Image
            src={banner}
            alt="বাজারের পণ্য"
            width={600}
            height={400}
            className="mx-auto h-auto w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;