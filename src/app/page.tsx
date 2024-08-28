"use client";
import axios from "axios";
import Job from "./_component/Job/Job";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  Role: string;
  companyName: string;
  description: string;
  location: string;
  Type: string;
  Compensation: string;
  yearsOfExperience: string;
}

export default function Home() {
  const [data, setData] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    jobTitle: "",
    compensation: ""
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get("/api/job/get");
        setData(response.data?.data);
        console.log(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredJobs = data.filter((job) => {
    return (
      (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.jobType === "" || job.Type.toLowerCase().includes(filters.jobType.toLowerCase())) &&
      (filters.jobTitle === "" || job.Role.toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
      (filters.compensation === "" || parseInt(job.Compensation) >= Number(filters.compensation))
    );
  });

  return (
    <>
      <div
        className="hero min-h-[40rem]"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold mb-5">Filter Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="jobType"
            placeholder="Job Type (e.g., Full-time, Part-time, Remote)"
            value={filters.jobType}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={filters.jobTitle}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="compensation"
            placeholder="Minimum Compensation"
            value={filters.compensation}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Jobs list */}
      <div id="jobs" className="flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-center pb-10">List of Jobs</h1>
        {filteredJobs.map((ele, index) => (
          <Job
            companyName={ele.companyName}
            role={ele.Role}
            description={ele.description}
            img={"https://via.placeholder.com/150"} // Placeholder image URL
            location={ele.location}
            key={index}
            link={ele._id}
            exyearsOfExperience={ele.yearsOfExperience || "0"} // Ensure it is a string if that’s how it is defined in Job component
            Compensation={ele.Compensation}
          />
        ))}
      </div>
    </>
  );
}
