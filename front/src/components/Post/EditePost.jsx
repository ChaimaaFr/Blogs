import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: '', content: '', image: '', category: '' });
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);

        // Récupérer les données du post avec l'identifiant passé dans l'URL
        fetch(`http://localhost:3000/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                // Mettre à jour l'état formData avec les données récupérées
                setFormData(data);
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }, [id]);

    const isLoggedIn = () => {
        return !!token;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'image' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('category', formData.category);

        const response = await fetch(`http://localhost:3000/post/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`
            },
            body: formDataToSend
        });
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        navigate('/');
    };

    return (
        <>
            {isLoggedIn() ? (
                <>
                    <h1 className="container font-bold ml-11 text-3xl mt-36">Edit Post</h1>
                    <form className="max-w-sm mx-auto mb-36" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" id="title" value={formData.title} name="title" onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                            <textarea id="content" value={formData.content} name="content" rows="4" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                            <input type="file" id="image" name="image" onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" id="category" value={formData.category} name="category" onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button type="submit" className="text-white bg-[#3E3232] hover:bg-[#7E6363] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  my-4">Submit</button>
                    </form>
                </>
            ) : (
                <p className="text-gray-600 m-40 text-center text-4xl">You should login </p>
            )}
        </>
    );
}
