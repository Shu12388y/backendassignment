"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
interface Job {
  Role: string;
  companyName: string;
  description: string;
  location: string;
  Type: string;
  Compensation: string;
  yearsOfExperience: string;
}


export default function JobDetailPage() {
  const params = useParams(); // Get job ID from URL
  const [job, setJob] = useState<Job | null>(null); // Use Job interface here
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [apply, setApply] = useState('Apply');

  async function applyJob() {
    try {
      const response = await axios.post('/api/job/apply', {
        jobid: params.id
      });
      console.log(response);
      if (response.status === 202) {
        setApply('Applied');
        setDisabled(true);
        toast.success("Thanks for Applying");
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  }

  useEffect(() => {
    async function fetchJobDetail() {
      try {
        const response = await axios.post(`/api/job/getjob`, {
          jobId: params.id,
        });
        setJob(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    }
    fetchJobDetail();
  }, [params.id]); // Make sure the useEffect depends on params.id

  if (loading) {
    return <p className="text-3xl font-bold text-center mt-10">Loading...</p>;
  }

  if (!job) {
    return <p className="text-3xl font-bold text-center mt-10">Job not found</p>;
  }

  // Return the JSX content
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toaster />
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{job.Role} at {job.companyName}</h1>
        <p className="text-gray-600">{job.location} | {job.Type}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-800">{job.description}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Job Details</h2>
        <ul className="list-disc list-inside text-gray-800">
          <li><strong>Years of Experience:</strong> {job.yearsOfExperience} years</li>
          <li><strong>Compensation:</strong> ${job.Compensation} per year</li>
        </ul>
      </div>
      <div className="mt-6 text-center">
        <button disabled={disabled} onClick={applyJob} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          {apply}
        </button>
      </div>
    </div>
  );
}
