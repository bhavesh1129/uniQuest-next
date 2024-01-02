'use client'

import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {

    const showDummyMessage = () => {
        toast.success("Your message is sent successfully!");
    };

    return (
        <>
            <Toaster />
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col space-y-8 pb-10 pt-6 md:pt-12">
                    <div className="mx-auto mb-4 max-w-2xl text-center">
                        <span className="mb-4 inline-block rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-black">
                            SHARE YOUR THOUGHTS
                        </span>
                        <h1 className="text-5xl font-bold">Love to hear from you</h1>
                    </div>
                    <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
                        neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
                    </p>
                </div>
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
                        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                            <iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.89796339086!2d77.04416717106561!3d28.52755441229373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1704001009685!5m2!1sen!2sin"></iframe>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                            <h2 className="text-gray-900 text-4xl mb-1 font-bold title-font">Get in touch</h2>
                            <p className="leading-relaxed mb-5 text-gray-600">Our friendly team would love to hear from you.</p>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                            <button className="text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded font-bold text-lg" onClick={showDummyMessage}>Send Message
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <hr className="mt-6" />
        </>
    )
}
