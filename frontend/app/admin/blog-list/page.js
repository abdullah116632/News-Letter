'use client';
import React from 'react';

const dummyBlogs = [
  {
    id: 1,
    title: 'Understanding React Server Components',
    description:
      'React Server Components let you build modern user interfaces while keeping performance in mind...',
    image: '/blog1.jpg',
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS',
    description:
      'Tailwind CSS provides utility-first classes that enable fast and consistent styling across your web apps...',
    image: '/blog2.jpg',
  },
  // Add more dummy blogs here
];

const BlogList = () => {
  const handleUpdate = (id) => {
    console.log('Update blog with id:', id);
    // redirect or open update form
  };

  const handleDelete = (id) => {
    console.log('Delete blog with id:', id);
    // confirmation + API call
  };

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-400">All Blogs</h2>

      <div className="space-y-6">
        {dummyBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-900 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-48 h-32 object-cover rounded-lg border border-white/10"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-3">
                {blog.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 md:mt-0 md:flex-col">
              <button
                onClick={() => handleUpdate(blog.id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
