"use client";

export default function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="bg-gray-300 h-32 w-full rounded-lg flex items-center">
        <div className="ml-auto flex mr-4">
          <div className="bg-gray-500 mr-4 h-8 w-16 md:h-10 rounded-lg"></div>
          <div className="bg-gray-500 mr-4 h-8 w-16 md:h-10 rounded-lg"></div>
          <div className="bg-gray-500 mr-4 h-8 w-16 md:h-10 rounded-lg"></div>
        </div>
      </div>
      {/* Landing Section */}
      <section id="landing" className="container">
        <div className="landing__wrapper flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <div className="bg-gray-300 ml-24 h-20 w-3/4 rounded-lg"></div>
            <div className="bg-gray-300 ml-24 h-20 w-3/4 rounded-lg"></div>
            <div className="bg-gray-300 ml-24 h-10 w-64 rounded-lg mt-4"></div>
          </div>
          {/* Image */}
          <div className="flex-1">
            <div className="bg-gray-300 ml-72 md:h-40 w-1/3 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container">
        <div className="section__title bg-gray-300 mx-auto h-8 w-1/2 rounded-lg mb-6"></div>
        <div className="features__wrapper flex flex-col md:flex-row gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="features flex flex-col items-start gap-2">
              <div className="bg-gray-300 ml-4 h-12 w-12 rounded-full"></div>
              <div className="bg-gray-300 h-8 w-1/2 rounded-lg"></div>
              <div className="bg-gray-300 h-12 w-3/4 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="container">
        <div className="ml-10 items-center">
          <div className="flex gap-48 justify-center">
            <div className="section__title bg-gray-300 h-80 w-1/3 rounded-lg mb-6"></div>
            <div className="section__title bg-gray-300 h-80 w-1/3 rounded-lg mb-6"></div>
          </div>
          <div className="flex gap-48 justify-center">
            <div className="section__title bg-gray-300 h-80 w-1/3 rounded-lg mb-6"></div>
            <div className="section__title bg-gray-300 h-80 w-1/3 rounded-lg mb-6"></div>
          </div>
        </div>
      </section>

      <section id="reviews" className="container">
        
        <div className="section__title bg-gray-300 h-8 w-1/3 rounded-lg mb-6 mx-auto"></div>
        <div className="reviews__wrapper flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="review bg-gray-300 h-32 w-full rounded-lg"></div>
          ))}
        </div>
      </section>

      <section id="numbers" className="container">
        <div className="section__title bg-gray-300 h-8 w-1/3 rounded-lg mb-6 mx-auto"></div>
        <div className="numbers__wrapper flex flex-col md:flex-row gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="numbers flex-1 flex flex-col items-center gap-2"
            >
              <div className="bg-gray-300 h-12 w-12 rounded-full"></div>
              <div className="bg-gray-300 h-6 w-1/2 rounded-lg"></div>
              <div className="bg-gray-300 h-4 w-3/4 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
