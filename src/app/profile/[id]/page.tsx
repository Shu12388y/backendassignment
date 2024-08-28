"use client";

import { useParams } from "next/navigation";
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

function Page() {
  const { id } = useParams();
  const userEmail = id as string;
  const replaceEmail = userEmail.replace("%40", "@");

  // States for profile information
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [experience, setExperience] = useState([{ name: '', StartDate: '', EndDate: '', About: '', location: '' }]);
  const [education, setEducation] = useState([{ name: '', Type: '', startDate: '', EndDate: '' }]);
  const [projects, setProjects] = useState([{ name: '', About: '', link: '' }]);
  const Router =  useRouter()

  const handleAddExperience = () => {
    setExperience([...experience, { name: '', StartDate: '', EndDate: '', About: '', location: '' }]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { name: '', Type: '', startDate: '', EndDate: '' }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { name: '', About: '', link: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('email',replaceEmail)
    if (profileImage) formData.append('profileImage', profileImage);
    if (resume) formData.append('resume', resume);
    formData.append('experience', JSON.stringify(experience));
    formData.append('education', JSON.stringify(education));
    formData.append('projects', JSON.stringify(projects));

    const res = await fetch('/api/profile/create', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Profile created successfully!');
      Router.push("/signin")

    } else {
      alert('Failed to create profile.');
    }
  };

  return (
    <div>
      <section className="rounded-md p-2">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-black">Create Your Profile</h2>
            <form onSubmit={handleSubmit} method="POST" className="mt-8" encType="multipart/form-data">
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="text-base font-medium text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="text-base font-medium text-gray-900">
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="profileImage" className="text-base font-medium text-gray-900">
                    Profile Image
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="resume" className="text-base font-medium text-gray-900">
                    Resume
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <label htmlFor="experience" className="text-base font-medium text-gray-900">
                    Experience
                  </label>
                  {experience.map((exp, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Company Name"
                        value={exp.name}
                        onChange={(e) =>
                          setExperience(experience.map((ex, i) =>
                            i === index ? { ...ex, name: e.target.value } : ex
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Start Date"
                        value={exp.StartDate}
                        onChange={(e) =>
                          setExperience(experience.map((ex, i) =>
                            i === index ? { ...ex, StartDate: e.target.value } : ex
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="End Date"
                        value={exp.EndDate}
                        onChange={(e) =>
                          setExperience(experience.map((ex, i) =>
                            i === index ? { ...ex, EndDate: e.target.value } : ex
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) =>
                          setExperience(experience.map((ex, i) =>
                            i === index ? { ...ex, location: e.target.value } : ex
                          ))
                        }
                      />
                      <textarea
                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        placeholder="About"
                        value={exp.About}
                        onChange={(e) =>
                          setExperience(experience.map((ex, i) =>
                            i === index ? { ...ex, About: e.target.value } : ex
                          ))
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold leading-7 text-black hover:bg-gray-300"
                    onClick={handleAddExperience}
                  >
                    Add Experience
                  </button>
                </div>

                {/* Education Section */}
                <div>
                  <label htmlFor="education" className="text-base font-medium text-gray-900">
                    Education
                  </label>
                  {education.map((edu, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Institution Name"
                        value={edu.name}
                        onChange={(e) =>
                          setEducation(education.map((ed, i) =>
                            i === index ? { ...ed, name: e.target.value } : ed
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Degree Type"
                        value={edu.Type}
                        onChange={(e) =>
                          setEducation(education.map((ed, i) =>
                            i === index ? { ...ed, Type: e.target.value } : ed
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          setEducation(education.map((ed, i) =>
                            i === index ? { ...ed, startDate: e.target.value } : ed
                          ))
                        }
                      />
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="End Date"
                        value={edu.EndDate}
                        onChange={(e) =>
                          setEducation(education.map((ed, i) =>
                            i === index ? { ...ed, EndDate: e.target.value } : ed
                          ))
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold leading-7 text-black hover:bg-gray-300"
                    onClick={handleAddEducation}
                  >
                    Add Education
                  </button>
                </div>

                {/* Projects Section */}
                <div>
                  <label htmlFor="projects" className="text-base font-medium text-gray-900">
                    Projects
                  </label>
                  {projects.map((proj, index) => (
                    <div key={index} className="mt-2">
                      <input
                        className="flex mb-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) =>
                          setProjects(projects.map((project, i) =>
                            i === index ? { ...project, name: e.target.value } : project
                          ))
                        }
                      />
                      <textarea
                        className="flex mb-2 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        placeholder="About the Project"
                        value={proj.About}
                        onChange={(e) =>
                          setProjects(projects.map((project, i) =>
                            i === index ? { ...project, About: e.target.value } : project
                          ))
                        }
                      />
                      <input
                        className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                        type="text"
                        placeholder="Link"
                        value={proj.link}
                        onChange={(e) =>
                          setProjects(projects.map((project, i) =>
                            i === index ? { ...project, link: e.target.value } : project
                          ))
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold leading-7 text-black hover:bg-gray-300"
                    onClick={handleAddProject}
                  >
                    Add Project
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Create Your Profile
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
