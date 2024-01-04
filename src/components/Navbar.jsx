'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';

const menuItems = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'About',
        href: '/about',
    },
    {
        name: 'Questions',
        href: '/questions',
    },
    {
        name: 'Add Question',
        href: '/add-question',
    },
    {
        name: 'Find Friends',
        href: '/find-friends',
    },
    // {
    //     name: 'Contact',
    //     href: '/contact',
    // },
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    const router = useRouter();
    const [session, setSession] = useState({});
    const pathname = usePathname();

    const signout = async () => {
        try {
            await axios.get('/api/users/signout');
            toast.success('Signout successfully');
            router.push('/signin');
        } catch (error) {
            console.log('Signout failed', error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userInfo = await axios.get('/api/users/user');
                setSession(userInfo.data.data);
            } catch (error) {
                console.log('User info not found', error.message);
                toast.error(error.message);
            }
        };
        getUserInfo();
    }, []);

    return (
        pathname === '/' ? (
            <nav className="z-50">
                <div className="relative w-full bg-slate-950">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center space-x-2">
                            <span>
                                <svg
                                    className="text-white"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 50 56"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                        fill="white"
                                    />
                                </svg>
                            </span>
                            <span className="text-white font-bold"><Link href='/'>uniQuest</Link></span>
                        </div>
                        <div className="hidden lg:block">
                            <ul className="ml-12 inline-flex space-x-8">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center text-sm font-medium  text-gray-300 hover:text-gray-500 cursor-pointer"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex grow justify-end items-center">
                            <div className="ml-2 mt-2 hidden lg:block">
                                <span className="relative inline-block">
                                    {session ?
                                        (<Image
                                            className="h-10 w-10 rounded-full"
                                            src={session?.image}
                                            alt={session?.name}
                                            width={400} height={400}
                                        />) : ''
                                    }
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                                </span>
                            </div>
                            <div className="ml-4 hidden lg:block">
                                <button onClick={signout}
                                    type="button"
                                    className="w-full rounded-md bg-transparent px-5 py-2 text-sm font-medium text-white outline-slate-250 outline outline-1 shadow-sm hover:bg-white/90 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >Signout
                                </button>
                            </div>
                        </div>
                        <div className="ml-2 lg:hidden">
                            <Menu onClick={toggleMenu} className="text-gray-400 hover:text-gray-500 h-6 w-6 cursor-pointer" />
                        </div>
                        {isMenuOpen && (
                            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                                <div className="divide-y-2 divide-gray-50 rounded-lg bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="px-5 pb-6 pt-5">
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex items-center space-x-2">
                                                <span>
                                                    <svg
                                                        width="30"
                                                        height="30"
                                                        viewBox="0 0 50 56"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="text-white font-bold">uniQuest</span>
                                            </div>
                                            <div className="-mr-2">
                                                <button
                                                    type="button"
                                                    onClick={toggleMenu}
                                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <X className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <nav className="grid gap-y-4">
                                                {menuItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-slate-50"
                                                    >
                                                        <span className="text-gray-400 hover:text-gray-800 ml-3 items-center text-sm font-medium  cursor-pointer">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </nav>
                                        </div>
                                        <div className="ml-3 mt-4 flex items-center space-x-2">
                                            <button onClick={signout}
                                                type="button"
                                                className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                            >
                                                Signout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        ) : (
            <nav className="z-50">
                <div className="relative w-full bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center space-x-2">
                            <span>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 50 56"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                        fill="black"
                                    />
                                </svg>
                            </span>
                            <span className="font-bold"><Link href='/'>uniQuest</Link></span>
                        </div>
                        <div className="hidden lg:block">
                            <ul className="ml-12 inline-flex space-x-8">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center text-sm font-medium  text-gray-500 hover:text-gray-900 cursor-pointer"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex grow justify-end">
                            {
                                pathname && pathname === '/questions' &&
                                (
                                    <input
                                        className="flex h-10 w-[180px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Search"
                                    ></input>
                                )
                            }
                        </div>
                        <div className="ml-2 mt-2 hidden lg:block">
                            <span className="relative inline-block">
                                {session ?
                                    (<Image
                                        className="h-10 w-10 rounded-full"
                                        src={session?.image}
                                        alt={session?.name}
                                        width={400} height={400}
                                    />) : ''
                                }
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                            </span>
                        </div>
                        <div className="ml-4 hidden lg:block">
                            <button onClick={signout}
                                type="button"
                                className="w-full rounded-md bg-transparent px-5 py-2 text-sm font-medium text-black outline-slate-950 outline outline-1 shadow-sm hover:bg-black/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >Signout
                            </button>
                        </div>
                        <div className="ml-2 lg:hidden">
                            <Menu onClick={toggleMenu} className="text-gray-400 hover:text-gray-500 h-6 w-6 cursor-pointer" />
                        </div>
                        {isMenuOpen && (
                            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="px-5 pb-6 pt-5">
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex items-center space-x-2">
                                                <span>
                                                    <svg
                                                        width="30"
                                                        height="30"
                                                        viewBox="0 0 50 56"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="font-bold">DevUI</span>
                                            </div>
                                            <div className="-mr-2">
                                                <button
                                                    type="button"
                                                    onClick={toggleMenu}
                                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <X className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <nav className="grid gap-y-4">
                                                {menuItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                                    >
                                                        <span className="ml-3 items-center text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </nav>
                                        </div>
                                        <div className="ml-3 mt-4 flex items-center space-x-2">
                                            <button onClick={signout}
                                                type="button"
                                                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                Signout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        )
    )
}

export default Navbar