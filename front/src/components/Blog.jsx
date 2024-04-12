import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BlogPost() {
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState([]);
    const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
    const [expandedPostId, setExpandedPostId] = useState(null); // State to track expanded post
    const [likes, setLikes] = useState({}); // State to track likes for each post
    const [users, setUsers] = useState({}); // State to store users data
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [postsPerPage] = useState(4); // State to track number of posts per page

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const [usersResponse, postsResponse] = await Promise.all([
                    fetch('http://localhost:3000/users').then(response => response.json()),
                    fetch('http://localhost:3000/posts').then(response => response.json())
                ]);

                // Process users data
                const usersData = {};
                usersResponse.forEach(user => {
                    usersData[user._id] = user;
                });
                setUsers(usersData);

                // Process posts data
                setBlogPosts(postsResponse);
                
                // Initialize likes state with 0 likes for each post
                const initialLikes = {};
                postsResponse.forEach(post => {
                    initialLikes[post._id] = 0;
                });
                setLikes(initialLikes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategorySearchInputChange = (event) => {
        setSearchCategoryQuery(event.target.value);
        setCurrentPage(1); // Reset current page when search query changes
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filteredPosts = blogPosts.filter(post =>
        post.category.toLowerCase().includes(searchCategoryQuery.toLowerCase())
    );
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const scrollToBlogSection = () => {
        const blogSection = document.getElementById('blogSection');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section bg-cover bg-center h-[46.16vw] flex items-center justify-center text-center text-white" style={{backgroundImage: "url('src/components/Auth/score.jpeg')", transition: "background-color 0.5s"}}>
    <div className="container mx-auto">
        <h1 className="text-7xl font-bold mb-4 hover:text-[#A87C7C] transition-colors duration-300">Welcome to Our Blog</h1>
        <p className="text-lg mb-8 hover:text-[#A87C7C] transition-colors duration-300">Discover our posts from different categories within our community</p>
        <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-[#A87C7C] text-white py-2 px-10 rounded-md text-lg hover:bg-opacity-80 transition duration-300">Sign In</Link>
            <button onClick={scrollToBlogSection} className="bg-[#A87C7C] text-white py-2 px-10 rounded-md text-lg hover:bg-opacity-80 transition duration-300">View Posts</button>
        </div>
    </div>
</div>


            {/* Blog Posts Section */}
            <div id="blogSection" className="container mx-auto px-4 py-8 my-9">
                <h1 className="text-3xl font-bold mb-8">Posts</h1>
                <div className="flex justify-between mb-4 ">
                    <input
                        type="text"
                        placeholder="Search by category"
                        value={searchCategoryQuery}
                        onChange={handleCategorySearchInputChange}
                        className="border border-[#A87C7C] rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>
                <div className="posts lg:grid grid-cols-3 gap-2">
                    {currentPosts.length > 0 ? (
                        currentPosts.map(post => (
                            <div key={post._id} className="bg-white rounded-lg shadow-md p-6 my-10 hover:bg-gray-100 transition duration-300">
                                <h2 className="text-2xl font-bold mb-4 min-h-24">{post.title}</h2>
                                {post.image && (
                                    <img src={post.image} alt="Post" className="mb-4 w-full h-auto min-h-52" />
                                )}
                                {/* Display user email and role */}
                                {users[post.userId] && (
                                    <p className="text-gray-600 mb-2">
                                        By {users[post.userId].email} <span className="font-bold underline">{users[post.userId].role}</span>
                                    </p>
                                )}
                                <p className="text-[#7E6363] mt-2 font-bold">Category: {post.category}</p>
                                <div>
                                    <p className="text-gray-800 mb-6">
                                        {expandedPostId === post._id ? post.content : `${post.content.slice(0, 100)}...`}
                                    </p>
                                    <button className="text-[#A87C7C] hover:underline focus:outline-none" onClick={() => setExpandedPostId(post._id)}>
                                        {expandedPostId === post._id ? 'Collapse' : 'Read More'}
                                    </button>
                                </div>
                               
                                {/* Like button */}
                                <button className="text-[#A87C7C] hover:text-red-500 focus:outline-none" onClick={() => setLikes({ ...likes, [post._id]: (likes[post._id] || 0) + 1 })}>
                                    ❤️ {likes[post._id] || 0}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
                    )}
                </div>
{/* Pagination */}
{filteredPosts.length > postsPerPage && (
    <nav className="flex justify-center mt-4">
        <ul className="pagination flex space-x-4">
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                <li key={i} className={currentPage === i + 1 ? 'active' : ''} style={{ marginRight: i === Math.ceil(filteredPosts.length / postsPerPage) - 1 ? '0' : '1rem' }}>
                    <button onClick={() => paginate(i + 1)} className="text-[#A87C7C] hover:underline focus:outline-none" style={{ fontSize: '1.2rem' }}>
                        {i + 1}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
)}


            </div>
        </div>
    );
}

export default BlogPost;
