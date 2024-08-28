import React from 'react'
import Link from 'next/link'

function Job({ companyName, role, link, location, exyearsOfExperience, img, Compensation }: { companyName: string, role: string, link: string, location: string, description: string, img: string, exyearsOfExperience: string, Compensation: string }) {
    return (
        <div>
            <div className="overflow-x-auto">
                <div>
                    <div className='flex flex-row items-center justify-between gap-3 w-[50rem] p-2 border  mt-1 shadow'>
                        <div className="flex flex-row  gap-2">
                            <img
                                className='rounded-full w-10 h-10'
                                src="https://cdn-icons-png.freepik.com/256/15503/15503223.png?semt=ais_hybrid"
                                alt="Avatar Tailwind CSS Component" />
                            <div>
                                <div className='flex flex-col items-start w-[10rem]'>
                                    <span>{role}</span>
                                    <span>{companyName}</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-[9rem]'>
                            <span>Location</span>
                            <span>{location}</span>
                        </div>

                        <div className='flex flex-col items-center w-[10rem]'>
                            <span>Experience</span>
                            <span>{exyearsOfExperience} years</span>
                        </div>

                        <div>
                            {Compensation}K
                        </div>

                        <div>
                            <Link href={`/Jobs/${link}`}>
                                <button className="btn btn-ghost btn-xs">Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job