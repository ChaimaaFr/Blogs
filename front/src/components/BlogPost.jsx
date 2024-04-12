import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencil, BsTrash } from 'react-icons/bs';
import AddPostModal from './Post/AddPostModal'; 
import EditPostModal from './Post/EditPostModal'; 

function BlogPost() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [blogPosts, setBlogPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [users, setUsers] = useState({});
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const [showAddPostModal, setShowAddPostModal] = useState(false); // State for controlling modal visibility
    const [showEditModal, setShowEditModal] = useState(false); // State for controlling edit modal visibility
    const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post for editing

    useEffect(() => {
        // Fetch blog post data from the API
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => setBlogPosts(data))
            .catch(error => console.error('Error fetching blog posts:', error));

        // Fetch users data from the API
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                const usersData = {};
                data.forEach(user => {
                    usersData[user._id] = user;
                });
                setUsers(usersData);
            })
            .catch(error => console.error('Error fetching users data:', error));

        // Decode the token and set the logged-in user ID
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setLoggedInUserId(decodedToken.userId);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }, []);

    const handleDelete = async (id) => {
        console.log('Deleting post with ID:', id);
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted');
            // After deleting the post, remove it from the state
            setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    
    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Update authentication state to false
        setIsLoggedIn(false);
        // Redirect to the login page
        navigate('/login');
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchCategoryChange = (event) => {
        setSearchCategory(event.target.value);
    };

    const handleEditModal = (post) => {
        setSelectedPost(post);
        setShowEditModal(true);
    };

    const handleEditPost = (postId, updatedData) => {
        // Update the post with the new data
        console.log('Editing post:', postId);
        console.log('Updated data:', updatedData);
        // Perform your edit operation here, e.g., make an API request to update the post
        // After editing the post, update the post in the state
        const updatedPosts = blogPosts.map(post => {
            if (post._id === postId) {
                return { ...post, ...updatedData };
            }
            return post;
        });
        setBlogPosts(updatedPosts);
    };

    const userPosts = blogPosts.filter(post => post.userId === loggedInUserId);

    return (
        <div className="container mx-auto px-4 py-8 my-9">
            <h1 className="text-3xl font-bold mb-8">My Blog</h1>
            <div className="flex justify-between mb-4">
                <button onClick={() => setShowAddPostModal(true)} className='bg-[#7E6363] hover:bg-[#A87C7C] text-white font-bold py-2 px-4 rounded-full mx-6'>Add New Post</button>
                <input
                    type="text"
                    placeholder="Search by category"
                    value={searchCategory}
                    onChange={handleSearchCategoryChange}
                    className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
            </div>
            <div className="posts lg:grid grid-cols-3 gap-2">
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <div key={post._id} className="bg-white rounded-lg shadow-md p-6 my-10">
                            <h2 className="text-2xl font-bold mb-4 min-h-24">{post.title}</h2>
                            {users[post.userId] && (
                                <p className="text-gray-600 mb-2">
                                    By {users[post.userId].email} <span className="font-bold underline">{users[post.userId].role}</span>
                                </p>
                            )}
                            {post.image && (
                                <img src={post.image} alt="Post" className="mb-4 w-full h-auto min-h-52 " />
                            )}
                            <p className="text-[#7E6363] mt-2 font-bold">Category: {post.category}</p>
                            <p className="text-gray-800">{post.content}</p>
                            <div className="mt-6">
                                <button onClick={() => handleEditModal(post)} className="text-white bg-[#A87C7C] hover:bg-[#B3A398] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <BsPencil className="inline-block mr-2" />Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(post._id)} className="focus:outline-none text-white bg-[#B3A398] hover:bg-[#A87C7C] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    <BsTrash className="inline-block mr-2" />Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
                )}
            </div>
            {showAddPostModal && <AddPostModal onClose={() => setShowAddPostModal(false)} />} {/* Render the AddPostModal component only when showAddPostModal is true */}
            {showEditModal && <EditPostModal post={selectedPost} onClose={() => setShowEditModal(false)} onUpdate={handleEditPost} />} {/* Render the EditPostModal component only when showEditModal is true */}
        </div>
    );
}

export default BlogPost;
