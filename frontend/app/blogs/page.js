import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
  return (
    <div className="relative px-4 sm:px-8 md:px-14 py-10">
      {/* Heading */}
      <div className="flex justify-start items-center gap-10 mb-12 mx-14">
        <Link
          href="/"
          className="absolute z-20 hidden lg:inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          ← Back
        </Link>

        <h2 className="flex-grow text-center font-roboto font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent relative">
          Our Blogs
          <span className="block h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] rounded-full"></span>
        </h2>
      </div>

      {/* Blog Cards Container */}
      <div className="w-full flex justify-center flex-wrap gap-8 md:gap-12 xl:gap-16">
        {blogs.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#00200A4A] border-2 border-white/10 rounded-2xl px-4 py-6 w-full sm:w-[22rem] md:w-[24rem] lg:w-[26rem] shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Image & Title */}
            <div className="flex flex-col justify-center items-center mb-4">
              <Image
                src={item.image}
                alt="blog image"
                height={300}
                width={350}
                className="rounded-lg w-full object-cover max-h-[250px]"
              />
              <h6 className="text-base sm:text-lg md:text-xl font-roboto font-semibold text-center px-4 py-3 max-h-[3.5em] overflow-y-auto hide-scrollbar">
                {item.title}
              </h6>
            </div>

            {/* Description & Button */}
            <div className="font-roboto flex flex-col justify-between items-center text-center">
              <p className="text-sm sm:text-base text-gray-200 px-4 max-h-[11em] overflow-hidden mb-4">
                {item.description}
              </p>
              <Link href={`/blogs/${item.id}`}>
                <button className="bg-white text-black font-bold text-sm sm:text-base px-5 sm:px-6 py-1.5 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FF00FB] hover:via-[#9B00FF] hover:to-[#00D9FF] hover:text-white cursor-pointer">
                  READ MORE
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
