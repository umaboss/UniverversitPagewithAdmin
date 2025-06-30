"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js routing
import { useGuideList } from "@/pages/GuideContext"; // ✅ Fixed import path

const initialForm = {
  type: "University",
  title: "",
  slug: "",
  subTitle: "",
  sortOrder: 1,
  description: "",
  schemaQuestion: "",
  schemaAnswer: "",
  rating: 0,
  date: "",
  authorName: "",
  publisherName: "",
  reviewDescription: "",
  reviewName: "",
  featuredImage: "",
  authorActive: true,
  popular: false,
};

const AddGuide = () => {
  const { addGuide } = useGuideList(); // ✅ Must be defined in your context
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGuide(form); // ✅ Assumes you store the guide somewhere
    router.push("/guide"); // ✅ Redirect to guide page
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Guide</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        {/* Guide Type */}
        <div>
          <label className="block mb-1 font-medium">Guide Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="University">University</option>
            <option value="Visa">Visa</option>
            <option value="Course">Course</option>
          </select>
        </div>

        {/* Common Inputs */}
        {[
          { name: "title", label: "Guide Title", required: true },
          { name: "slug", label: "Slug", required: true },
          { name: "subTitle", label: "Sub Title" },
          { name: "sortOrder", label: "Sort Order", type: "number" },
          { name: "schemaQuestion", label: "Schema Markup Question" },
          { name: "schemaAnswer", label: "Schema Markup Answer" },
          { name: "rating", label: "Rating", type: "number", min: 0, max: 5, step: 0.1 },
          { name: "date", label: "Date", type: "date" },
          { name: "authorName", label: "Author's Name" },
          { name: "publisherName", label: "Publisher's Name" },
          { name: "reviewDescription", label: "Review Description" },
          { name: "reviewName", label: "Review's Name" },
          { name: "featuredImage", label: "Featured Image URL" },
        ].map(({ name, label, ...rest }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={rest.type || "text"}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required={rest.required || false}
              min={rest.min}
              max={rest.max}
              step={rest.step}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" name="authorActive" checked={form.authorActive} onChange={handleChange} className="mr-2" />
            Author Active
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} className="mr-2" />
            Popular
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Guide
        </button>
      </form>
    </div>
  );
};

export default AddGuide;
