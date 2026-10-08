import Image from "next/image";
import banner from "@/assets/bazar-hero.png";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <div className="flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8 md:rounded-3xl md:px-10 lg:flex-row lg:gap-10 lg:px-12 lg:py-10">
        {/* Left Content */}
        <div className="w-full lg:w-3/5">
          {/* Eyebrow */}
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:text-sm">
            {date}
          </p>

          {/* Main Heading */}
          <h1 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
            আজকের বাজারের দাম <span className="text-green-600">এক নজরে</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base sm:leading-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}

          <Link
            href="#সব-পণ্য"
            className="btn btn-sm mt-5 rounded-xl border-0 bg-green-600 px-5 text-white shadow-md shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30 sm:btn-md sm:px-6"
          >
            <span>সব পণ্য দেখুন</span>

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Right Hero Image */}
        <div className="flex w-full justify-center lg:w-2/5">
          <Image
            src={banner}
            alt="বাজারের পণ্য"
            width={600}
            height={400}
            priority
            className="h-auto w-full max-w-xs object-contain sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
