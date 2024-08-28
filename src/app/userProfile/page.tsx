"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Experience {
  name: string;
  About: string;
  StartDate: string;
  EndDate: string;
  location: string;
}

interface Project {
  name: string;
  About: string;
  link: string;
}

interface Education {
  name: string;
  Type: string;
  startDate: string;
  EndDate: string;
}
interface Job {
  Role: string;
  Description: string;
  Company: string;
}

interface ProfileData {
  profileImage: string;
  Username: string;
  bio: string;
  resume: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  async function logout() {
    try {
      await axios.post("/api/auth/logout");
      Router.push("/signin");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("/api/profile/get");
        setData(response.data.data[0] as ProfileData);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-3xl font-bold text-center mt-10">Loading...</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={data?.profileImage}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-semibold">{data?.Username}</h1>
          <p className="text-gray-600">{data?.bio}</p>
          <a
            href={data?.resume}
            download="Resume.pdf"
            className="text-blue-500 underline mt-2 inline-block"
          >
            Download Resume
          </a>
        </div>
        <button onClick={logout} className="btn">Logout</button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <ul className="space-y-4">
          {data?.experience?.map((exp, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">{exp.name}</h3>
              <p className="text-gray-600">{exp.About}</p>
              <p className="text-gray-500">
                {exp.StartDate} - {exp.EndDate} | {exp.location}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul className="space-y-4">
          {data?.projects?.map((project, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-gray-600">{project.About}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Project
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <ul className="space-y-4">
          {data?.education?.map((edu, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">{edu.name}</h3>
              <p className="text-gray-600">{edu.Type}</p>
              <p className="text-gray-500">
                {edu.startDate} - {edu.EndDate}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
        <ul className="space-y-4">
          {jobs?.map((job, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">{job.Role}</h3>
              <p className="text-gray-600">{job.Description}</p>
              <p className="text-gray-500">{job.Company}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
