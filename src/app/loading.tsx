export default function Loading() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        
        {/* Category Header Skeleton */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:p-6">
          <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-gray-200 sm:h-20 sm:w-20" />

          <div className="w-full">
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200 sm:h-7" />

            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Sort Skeleton */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200 sm:w-48" />
        </div>

        {/* Product Skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
            >
              {/* Product top */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-gray-200 sm:h-14 sm:w-14" />

                <div className="min-w-0 flex-1">
                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

                  <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              </div>

              {/* Product price */}
              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                  <div className="mt-2 h-7 w-24 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}