import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'UserName is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validation()) {
      try {
        const response = await fetch('https://server-it5647uij-buddysuccess7-gmailcom.vercel.app//login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.warn(data);
          if (data.message === 'Found') {
            alert('Login Successfully');
            setFormData({
                username: '',
                password: '',
              });
              navigate('/home');
          } else if (data.message === 'Not Found') {
            alert('Please enter a correct Data');
            return;
          }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  return (
    <div className="pt-24 bg-gray-50">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:pt-0 bg-gray-50">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">Login</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="username"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.username}
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username}</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
            </div>
            <Link to="/signup" className="text-xs text-purple-600 hover:underline">
              Forgot Password?
            </Link>
            <div className="flex items-center mt-5">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={(e)=>handleSubmit(e)}
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <span>
              <Link className="text-purple-600 hover:underline" to="/signup">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

