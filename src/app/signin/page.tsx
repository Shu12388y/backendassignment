"use client"
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load,setLoad]  = useState(false)
    const Router  =  useRouter()

    async function signinHandler() {
        setLoad(true)
        try {
            const response = await axios.post("api/auth/signin",{
                email,
                password
            })
            if(response.status == 200){
                toast.success("Login Sucessfull")
                Router.push("/")
            }
            else{
                setLoad(true)
                toast.error("Something went Wrong")
            }
        } catch (error) {
            setLoad(true)
            toast.error("Something went wrong")
        }

    }
    return (
        <div>
            <Toaster />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignIn now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                {load ? <button><span className="loading loading-spinner loading-md"></span></button>:<button className="btn btn-primary" onClick={signinHandler}>Login</button>}
                            </div>
                            <label className='label'>
                            <Link href="/signup" className="label-text-alt link link-hover">Don&apos;t have an account</Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page