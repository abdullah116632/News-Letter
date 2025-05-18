'use client';
import React, { useState } from 'react';

const BlogForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can now send 'image', 'title', and 'description' to your API

    console.log({ image, title, description });

    // Reset form
    setImage(null);
    setPreview(null);
    setTitle('');
    setDescription('');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-950 rounded-2xl text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full space-y-6 border border-white/10"
      >
        <h2 className="text-2xl font-bold text-center text-red-400">
          Submit a New Blog
        </h2>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Blog Image</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-800 text-sm p-2 rounded-lg border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg max-h-48 object-cover border border-white/20"
            />
          )}
        </div>

        {/* Title Input */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your blog description..."
            rows={5}
            className="w-full p-3 rounded-lg bg-gray-800 border border-white/20 placeholder-gray-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 font-semibold transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
