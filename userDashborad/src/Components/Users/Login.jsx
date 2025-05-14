import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sawir from './imagesUser/login.png';

const Login = () => {
    const [linkData, setLinkData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setLinkData({ ...linkData, [event.target.name]: event.target.value });
    };

  
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:2000/api/users/login', linkData);
            const token = response.data.token;
            if(linkData.email || linkData.password){
                if (token) {
                    localStorage.setItem('token', token); 
                    navigate("Dashboard");
                } else {
                    toast.error("Email or passwor was incorrect");
                    
                }
            }else{
                setErrorMessage("fill the email or password")
                return
            }
           
        } catch (error) {
            setErrorMessage("Email ama password-ka waa khalad");
            return 
        }
       
    };
     


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 
        bg-singin-pattern bg-cover bg-center md:gap-16">
            <img src={sawir} className='hidden md:block' alt="" srcset="" />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-semibold mb-4">Log In Foam</h1>
                <p className="text-gray-500 mb-8 ">Please enter your details</p>
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            value={linkData.email}
                            className={`w-full p-2 border rounded ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            value={linkData.password}
                            className={`w-full p-2 border rounded ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                            name="password"
                            onChange={handleChange}
                        />
                        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
                    >
                        Sign in
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don’t have an account? <Link to="/SignUp" className="text-blue-500 font-semibold">Sign up</Link>
                    </p>
                </form>
                <ToastContainer position='top-center' theme='dark'/>
            </div>
            
        </div>
    );
};

export default Login;
