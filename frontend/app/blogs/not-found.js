// app/blogs/[id]/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[95vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Blog Post Not Found
      </h1>
      <p className="text-gray-300 text-lg mb-8">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/blogs"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
      >
        Browse All Blogs
      </Link>
    </div>
  );
}