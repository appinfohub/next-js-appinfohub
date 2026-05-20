import React from "react";
import { editorsChoiceTopics } from "../data/editorsChoiceTopics";
import Link from "next/link";

const EditorsChoiceSection = () => (
  <section className="w-full max-w-6xl mx-auto mt-10 mb-8 px-4">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Editors' Choice</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {editorsChoiceTopics.map((topic) => (
        <Link
          to={`/posts/topics/${topic.id}`}
          key={topic.id}
          className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden flex flex-col hover:shadow-xl transition border border-gray-100"
        >
          <img
            src={topic.image}
            alt={topic.title}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{topic.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default EditorsChoiceSection;

