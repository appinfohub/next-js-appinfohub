import React from "react";
import { blogs } from "../data/blogs";
import Link from "next/link";

const BlogsSection = () => (
  <section className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Blogs</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Link
          to={`/posts/blogs/${blog.id}`}
          key={blog.id}
          className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col hover:shadow-xl transition border border-gray-100"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <span className="text-xs text-blue-700 font-semibold mb-1">{blog.category}</span>
            <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{blog.title}</h3>
            <span className="text-xs text-gray-500 mb-2">{blog.date}</span>
            <span className="text-blue-600 font-semibold text-sm mt-2">READ MORE</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default BlogsSection;

