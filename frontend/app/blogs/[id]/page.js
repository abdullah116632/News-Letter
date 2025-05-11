import { use } from "react";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BlogDetails = ({ params }) => {
  const { id } = use(params);

  const blog = blogs.find((b) => b.id.toString() === id);
  if (!blog) {
    notFound();
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 border-b-1 border-b-fuchsia-700">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          ← Back
        </Link>
      </div>

      {/* Blog Layout */}
      <div className="flex flex-col h-72 w-full  lg:flex-row gap-10 items-start">
        {/* Blog Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={blog.image}
            alt={blog.title}
            width={600}
            height={400}
            className="rounded-xl shadow-xl object-cover w-full max-h-[500px]"
          />
        </div>

        {/* Blog Content */}
        <div className="w-full h-full overflow-y-scroll hide-scrollbar">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-roboto bg-gradient-to-r from-[#FF00FB] via-[#9B00FF] to-[#00D9FF] bg-clip-text text-transparent mb-6">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-roboto">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
