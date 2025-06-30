"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const FreeConsultationList = () => {
  const [consultations, setConsultations] = useState([
    { id: 1, name: "John Doe", email: "john@email.com", phone: "+1234567890", lastEducation: "Bachelors", applyFor: "MS Computer Science", createdAt: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", phone: "+1234567891", lastEducation: "Intermediate", applyFor: "BS Business", createdAt: "2024-01-16" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", phone: "+1234567892", lastEducation: "Matric", applyFor: "Diploma", createdAt: "2024-01-17" },
  ]);

  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setConsultations((prev) => prev.filter((c) => c.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Free Consultation List</h1>
          <p className="text-gray-600 mt-2">Manage all consultation requests</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-l-xl">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Education</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Apply For</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created At</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-gray-600">{c.email}</td>
                  <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{c.lastEducation}</td>
                  <td className="px-6 py-4 text-gray-600">{c.applyFor}</td>
                  <td className="px-6 py-4 text-gray-500">{c.createdAt}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      onClick={() => {
                        setDeleteId(c.id);
                        setShowConfirm(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {consultations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No consultations found</div>
            <p className="text-gray-400 mt-2">Try adding a new consultation</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">This action will permanently delete the consultation.</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeConsultationList;
