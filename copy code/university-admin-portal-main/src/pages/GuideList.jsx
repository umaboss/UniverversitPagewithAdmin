"use client";
import React, { useState } from "react";
import { Eye, Pencil } from "lucide-react";

const initialGuides = [
  {
    id: 1,
    type: "University",
    title: "How to Apply for a UK Visa",
    slug: "uk-visa-guide",
    subTitle: "Step by step guide for UK student visa",
    sortOrder: 1,
    description: "A comprehensive guide for UK student visa applicants.",
    schemaQuestion: "How do I apply for a UK student visa?",
    schemaAnswer: "You need to submit an online application and required documents.",
    rating: 4.5,
    date: "2024-01-15",
    authorName: "Adeel Raza",
    publisherName: "University Portal",
    reviewDescription: "Very helpful guide!",
    reviewName: "Student Review",
    featuredImage: "https://via.placeholder.com/80",
    authorActive: true,
    popular: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    type: "University",
    title: "Choosing the Right Course",
    slug: "course-selection-guide",
    subTitle: "Tips for selecting your university course",
    sortOrder: 2,
    description: "Advice for students on picking the best course.",
    schemaQuestion: "How do I choose a university course?",
    schemaAnswer: "Consider your interests, career goals, and university rankings.",
    rating: 4.0,
    date: "2024-01-16",
    authorName: "Maria Iqbal",
    publisherName: "University Portal",
    reviewDescription: "Great insights!",
    reviewName: "Parent Review",
    featuredImage: "https://via.placeholder.com/80",
    authorActive: false,
    popular: false,
    createdAt: "2024-01-16"
  }
];

const GuideList = () => {
  const [guides, setGuides] = useState(initialGuides);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const togglePopular = (id) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, popular: !g.popular } : g
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Guide List</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Title</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Type</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Author Active</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Popular</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Created At</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guides.map((guide) => (
              <tr key={guide.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{guide.title}</td>
                <td className="py-3 px-4 text-gray-600">{guide.type}</td>
                <td className="py-3 px-4 text-center">
                  <span className={guide.authorActive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {guide.authorActive ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={guide.popular}
                    onChange={() => togglePopular(guide.id)}
                    className="w-4 h-4 accent-teal-600"
                  />
                </td>
                <td className="py-3 px-4 text-gray-600">{guide.createdAt}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelected(guide);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800" title="Edit">
                      <Pencil className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {guides.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">No guides available.</div>
        )}
      </div>

      {/* Modal */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => {
                setShowModal(false);
                setSelected(null);
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Guide Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Title:</strong> {selected.title}</p>
              <p><strong>Author:</strong> {selected.authorName}</p>
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>Rating:</strong> {selected.rating}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <p><strong>Date:</strong> {selected.date}</p>
              <p><strong>Popular:</strong> {selected.popular ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideList;
