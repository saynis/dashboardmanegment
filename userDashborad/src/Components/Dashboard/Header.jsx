import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Sidebar from './Sidebar'
import axios from 'axios';
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const checkTokenAndLogout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    // Check token every 24 hours (86400000 milliseconds)
    const interval = setInterval(checkTokenAndLogout, 86400000);

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        
        if (response.data.status === 'Success') {
          setUserData(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If token is invalid or expired
          localStorage.removeItem('token');
          navigate('/');
        }
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <input type="text" placeholder="Search..." className="p-2 rounded border border-gray-300 w-24 md:w-auto" />
        <div className="flex space-x-4 items-center">
          <button className="p-2 text-black rounded hidden md:block">
            < IoSettingsOutline className='text-3xl'/>
          </button>
          <button className="p-2 bg-gray-300 text-white rounded-full flex items-center justify-center gap-2 py-2 px-4">
            {/* <FaRegUserCircle className="text-xl" /> */}
            <span className="max-w-[100px] truncate text-gray-900 font-bold text-1xl">
              {userData ? userData.username.charAt(0).toUpperCase() : 'Loading...'}
            </span>
          </button>

          <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">Logout</button>


          {!open && <IoMdMenu
            onClick={() => setOpen(true)}
            className='md:hidden text-3xl font-bold cursor-pointer' 
          />}


         {open && <IoCloseSharp
            onClick={() => setOpen(false)}
            className='md:hidden text-4xl font-bold cursor-pointer z-10 text-white' 
          />}


        </div>
      </div>


      <div className="md:hidden">
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Header
