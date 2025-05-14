import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sawir from '../Users/imagesUser/signup.png'

const SignUp = () => {
    const [linkData, setLinkData] = useState({
        email: "",
        username: "",
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
            const response = await axios.post('http://localhost:2000/api/users/register', linkData);
            const token = response.data.token;
            if(linkData.email || linkData.password){
                if (token) {
                    localStorage.setItem('token', token);
                    toast.success("successfully registred")
                  setTimeout(()=>{
                    navigate("/");
                  },2000)
                   
                } else {
                    toast.error("Email All Ready Registred");
                    
                }
            }else{
                setErrorMessage("fill the email or password")
            }
           
        } catch (error) {
            setErrorMessage("Email ama password-ka waa khalad");
        }

    };
     


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 
        bg-hero-pattern bg-cover bg-center md:gap-16">
            <img src={sawir} className='hidden md:block w-[450px]' alt="" srcset="" />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-semibold mb-4">Regestration Foam</h1>
                <p className="text-gray-500 mb-8 ">Please enter your details</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={linkData.username}
                            className={`w-full p-2 border rounded ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
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
                        Sign Up
                    </button>

                </form>
                <ToastContainer position='top-center' theme='dark'/>
            </div>
            
        </div>
    );
};

export default SignUp;
