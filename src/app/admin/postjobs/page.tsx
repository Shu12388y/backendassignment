"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



function Page() {
    const Router = useRouter();
    const [role, setRole] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [compensation, setCompensation] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");


    async function postJob() {
        try {
            const response   =  await axios.post("/api/job/create",{
                Role:role,companyName,description,location,Type:type,Compensation:compensation,yearsOfExperience
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        async function verifyUser() {
            try {
                const response = await axios.get("/api/admin/checkadmin")
                if (response.status == 401) {
                    Router.push("/admin/signin")
                }
            } catch (error) {
                console.log(error)
            }
        }
        verifyUser()
    }, [])




    return (
        <div><div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold text-center mb-6">Post a Job</h1>
            <div className="space-y-4">
                {/* Role */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter job role"
                        required
                    />
                </div>

                {/* Company Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="companyName">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter company name"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter job description"
                        required
                    ></textarea>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter job location"
                        required
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="type">
                        Type
                    </label>
                    <input
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter job type (e.g., Remote, On-site)"
                        required
                    />
                </div>

                {/* Compensation */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="compensation">
                        Compensation
                    </label>
                    <input
                        type="number"
                        id="compensation"
                        value={compensation}
                        onChange={(e) => setCompensation(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter compensation (in USD)"
                        required
                    />
                </div>

                {/* Years of Experience */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="yearsOfExperience">
                        Years of Experience
                    </label>
                    <input
                        type="number"
                        id="yearsOfExperience"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter required years of experience"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button onClick={postJob}
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        Post Job
                    </button>
                </div>
            </div>
        </div></div>
    )
}

export default Page