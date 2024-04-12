import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPostModal({ onClose }) {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null, // Store uploaded image
  });
  const navigate = useNavigate();

  const isLoggedIn = () => {
    // checking if a token exists
    return !!token;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "image" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("content", formData.content);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("image", formData.image);

  const response = await fetch("http://localhost:3000/posts/addposts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataToSend,
  });
  if (!response.ok) {
    throw new Error("Failed to submit form");
  }
  onClose(); 
  navigate("/");
  const responseData = await response.json();
  console.log("Response data:", responseData);
};

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h1 className="text-3xl font-bold mb-6">Add Your New Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#A87C7C]"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-[#3E3232] hover:bg-[#7E6363] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  my-4"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="text-white bg-[#3E3232] hover:bg-[#7E6363] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  my-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
