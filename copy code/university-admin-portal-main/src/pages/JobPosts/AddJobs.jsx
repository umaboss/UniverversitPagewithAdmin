"use client";

import { useState } from "react";
import { Save, ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Next.js Router
import { useJobs } from "@/pages/JobPosts/JobContext"; // ✅ Fixed import path

const initialForm = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  salary: "",
  description: "",
  requirements: "",
  skills: [],
  active: true,
};

const AddJobs = () => {
  const { addJob } = useJobs();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...form, skills };
    addJob(finalData);

    alert("✅ Job Added Successfully");
    router.push("/job-posts");
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex items-center space-x-4 mb-6">
        <button type="button" onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create Job</h1>
          <p className="text-gray-500 mt-1">Fill in the details to post a new job opportunity.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            {[
              { label: "Job Title", name: "title", placeholder: "e.g., Software Engineer" },
              { label: "City", name: "location", placeholder: "e.g., Lahore" },
              { label: "Province", name: "province", placeholder: "e.g., Punjab" },
              { label: "Country", name: "country", placeholder: "e.g., Pakistan" },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
              <select name="type" value={form.type} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                <option value="">Select Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Based</label>
              <select name="siteType" value={form.siteType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
              <select name="experience" value={form.experience} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                <option value="">Select Experience</option>
                <option>Entry Level</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
                <option>Senior Level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Add Skills</label>
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., React, Node.js"
                  className="w-full px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={handleAddSkill} className="bg-blue-500 text-white px-4 py-3 rounded-r-xl hover:bg-blue-600">
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width textareas */}
        {[
          { name: "requirements", label: "Requirements", placeholder: "List job requirements..." },
          { name: "responsibilities", label: "Responsibilities", placeholder: "List job responsibilities..." },
          { name: "details", label: "Details", placeholder: "Other job details..." },
        ].map(({ name, label, placeholder }) => (
          <div className="mt-6" key={name}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              rows={5}
              placeholder={placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button type="button" onClick={() => router.push('/job-posts')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
            <Save className="w-5 h-5" />
            <span>Post Job</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
