import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 my-9">
            <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className=" rounded-md p-6 border border  -[#B3A398]">
                    <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[#A87C7C] rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" name="message" rows="4" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                        </div>
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7E6363] hover:bg-[#A87C7C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send Message</button>
                    </form>
                </div>
                {/* Contact Information */}
                <div className="bg-gray-100 rounded-md p-6 text-[#A87C7C] font-bold">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <p className="mb-2">Address: 123 Main Street, City, Country</p>
                    <p className="mb-2">Phone: +1234567890</p>
                    <p>Email: info@example.com</p>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;