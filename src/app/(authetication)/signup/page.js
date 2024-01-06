'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"; 
import Image from 'next/image';

export default function SignupPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(true);

    const onSignUp = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/signup', userData);
            toast.success('Account created successfully');
            router.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAnyFieldEmpty = Object.values(userData).some((value) => value.trim() === '');
        setButtonDisabled(isAnyFieldEmpty);
    }, [userData]);

    return (
        <section>
            <Toaster />
            {/* <div>{loading ? 'Loading' : 'App'}</div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2">

                <div className="h-full w-full">
                    <Image width={1400} height={700}
                        className="mx-auto h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                        alt="image"
                    />
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/signin"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            autoComplete='off'
                                            value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email" autoComplete='off'
                                            value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={onSignUp}
                                        className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${buttonDisabled
                                            ? 'bg-black opacity-50 cursor-not-allowed'
                                            : 'bg-black hover:bg-black/80'
                                            }`}
                                        disabled={buttonDisabled}
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}