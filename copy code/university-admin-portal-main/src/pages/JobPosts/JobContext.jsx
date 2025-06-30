"use client";

import React, { createContext, useState, useContext } from "react";

const JobContext = createContext();

const initialJobs = [
  {
    id: 1,
    title: "Software Engineer",
    jobType: "Full-time",
    location: "Lahore",
    siteType: "On-site",
    skills: ["React", "Node.js", "TypeScript"],
    active: true,
    province: "Punjab",
    country: "Pakistan",
    experience: "3-5 Years",
    requirements: "BSc in CS. 3+ years of experience.",
    responsibilities: "Develop and maintain web applications.",
    details: "This is a great opportunity to work with a talented team.",
  },
  {
    id: 2,
    title: "Product Manager",
    jobType: "Full-time",
    location: "Karachi",
    siteType: "On-site",
    skills: ["Agile", "Scrum", "JIRA"],
    active: false,
    province: "Sindh",
    country: "Pakistan",
    experience: "5+ Years",
    requirements: "MBA preferred.",
    responsibilities: "Define product vision and roadmap.",
    details: "",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    jobType: "Contract",
    location: "Remote",
    siteType: "Remote",
    skills: ["Figma", "Sketch", "Adobe XD"],
    active: true,
    province: "N/A",
    country: "N/A",
    experience: "1-2 Years",
    requirements: "Portfolio of design projects.",
    responsibilities: "Create user-friendly interfaces.",
    details: "6-month contract position.",
  },
];

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(initialJobs);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1,
      active: true,
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const deleteJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const toggleJobStatus = (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, active: !job.active } : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, toggleJobStatus, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
