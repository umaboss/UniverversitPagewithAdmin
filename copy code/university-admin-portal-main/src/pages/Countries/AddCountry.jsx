"use client";

import { useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const currencyOptions = ["USD", "PKR", "EUR", "GBP", "AUD", "CAD", "AED", "SAR"];

const AddCountry = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    amount: "",
    currency: "USD",
    consultationFee: "",
    consultationDiscountFee: "",
    featureImage: ""
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, featureImage: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("countries");
    const countries = stored ? JSON.parse(stored) : [];
    countries.push({ id: Date.now(), ...formData });
    localStorage.setItem("countries", JSON.stringify(countries));
    alert("Country has been successfully added.");
    router.push("/countries");
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.push("/countries")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Country</h1>
          <p className="text-gray-600 mt-1">Add a new country to the system</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Country Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Country Code *</label>
              <input
                type="text"
                name="code"
                maxLength={3}
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Currency *</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              >
                {currencyOptions.map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Consultation Fee *</label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Consultation Discount Fee</label>
              <input
                type="number"
                name="consultationDiscountFee"
                value={formData.consultationDiscountFee}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Feature Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                  />
                ) : (
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/countries")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0B6D76] text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:shadow-xl"
          >
            <Save className="w-5 h-5" />
            <span>Add Country</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCountry;
