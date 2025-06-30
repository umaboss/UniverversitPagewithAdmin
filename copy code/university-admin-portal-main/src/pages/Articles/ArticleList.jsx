"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("articles");
    if (stored) {
      setArticles(JSON.parse(stored));
    }
  }, []);

  const togglePopular = (id) => {
    const updated = articles.map((a) =>
      a.id === id ? { ...a, popular: !a.popular } : a
    );
    setArticles(updated);
    localStorage.setItem("articles", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Article List</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Author</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Popular</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Active</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{article.title}</td>
                  <td className="py-3 px-4 text-gray-600">{article.authorName}</td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={article.popular}
                      onChange={() => togglePopular(article.id)}
                      className="w-5 h-5 accent-green-600"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={
                        article.active
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {article.active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{article.createdAt}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Pencil className="w-5 h-5 text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-lg">
              No articles found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
