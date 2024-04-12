import React, { useState } from 'react';

function EditPostModal({ post, onClose, onUpdate }) {
    const [updatedTitle, setUpdatedTitle] = useState(post.title);
    const [updatedContent, setUpdatedContent] = useState(post.content);
    const [updatedCategory, setUpdatedCategory] = useState(post.category);
    
    const handleSubmit = () => {
        // Handle form submission and update post
        onUpdate(post._id, { title: updatedTitle, content: updatedContent, category: updatedCategory });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-3xl"> {/* Increase max-width to make the modal bigger */}
                <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            rows="4"
                            placeholder="Leave a comment..."
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={updatedCategory}
                            onChange={(e) => setUpdatedCategory(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>

                    
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-900 mr-4 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-[#3E3232] hover:bg-[#7E6363] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPostModal;
