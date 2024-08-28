import React from 'react'
import Link from 'next/link'

function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href='#jobs'>Jobs</a></li>
                        <li><a href="">
                            Profile
                        </a>
                        </li>
                        <li><a>Recuriter</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Job.IO</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href='/'>Jobs</Link></li>
                    <li>
                        <Link href="/userProfile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/admin/signin">Recuriter</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link href="/signin">
                    <button className='btn'>
                        SignIn
                    </button>
                </Link>
                {/* <a className="btn">SignUp</a> */}
            </div>
        </div>
    )
}

export default NavBar