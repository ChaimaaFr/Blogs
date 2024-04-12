import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Auth/blog.jpg";


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleUsernameChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          if (!response.ok) {
            throw new Error('Failed to login');
          }
          const { token } = await response.json();
          console.log('Received token:', token); // Log the token
          localStorage.setItem('token', token); // Store token in local storage
          
          navigate('/');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
      
  
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
      >
        <div className="max-w-3xl w-full p-8 bg-white bg-opacity-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-16">
            <div>
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3E3232] hover:bg-[#503C3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#3E3232]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
  