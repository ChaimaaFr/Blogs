// AboutUs.jsx
import React from 'react';
import aboutImage from './Auth/images.jpg'; // Import the image file

function AboutUs() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="flex justify-center mb-9">
                <img src={aboutImage} alt="About Us" className="w-full max-w-lg" />
            </div>
            <p className="text-gray-900"> 
            In the BlogApp, users have the ability to create posts and share them with the community. They can write about their interests, experiences, or any topic they are passionate about. Users can easily manage their own posts, including editing or deleting them as needed.

The platform provides a simple and intuitive interface for creating posts, allowing users to format their content with text, images, and other media. They can also add tags or categories to their posts to make them easily searchable for other users.

Users can engage with each other's posts by liking, commenting, and sharing them with their friends or followers. This fosters a sense of community and encourages interaction among users.

Overall, the BlogApp is a platform that empowers users to share their thoughts, stories, and ideas with others in a collaborative and supportive environment.







            </p>
            <p className="text-gray-800">
               
               
            </p>
        </div>
    );
}

export default AboutUs;
