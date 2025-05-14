import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ open, setOpen }) => {
  return (
    <div className='relative'> 
      <div className={`md:w-64 w-full absolute md:static md:h-screen h-48 
        bg-gray-800 text-white md:flex md:flex-col space-y-4 p-4 
        ${open ? 'top-[-74px]' : 'top-[-1000px]'}`}>
        

        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>

        <div className='flex flex-col space-y-4 items-center md:items-start'>
          <Link to="/Authormain" className="hover:bg-gray-700 p-2 rounded">Authors</Link>
          <Link to="/BooksMain" className="hover:bg-gray-700 p-2 rounded">Books</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar
