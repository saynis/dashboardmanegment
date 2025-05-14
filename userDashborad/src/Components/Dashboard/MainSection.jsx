import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MainSection = () => {
 const[totalAuthors, setTotalAuthors] = useState(0)
 const[totalBooks, setTotalBooks] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/authors/all');
        const authors = response.data?.authors || [];
        setTotalAuthors(authors.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setTotalAuthors(0);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/books/all');
        const books = response.data?.Books || [];
        setTotalBooks(books.length);
      
      } catch (error) {
        console.error('Error fetching stats:', error);
        setTotalBooks(0);
      }
    };

    fetchStats();
  }, []);



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-green-400 p-6'>
      {/* Card 1 - Authors */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-bold mb-2'>Total Authors</h3>
        <p className='text-3xl font-bold text-blue-600'>{totalAuthors}</p>
        <p className='text-gray-600'>Registered Authors</p>
      </div>

      {/* Card 2 - Books */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-bold mb-2'>Total Books</h3>
        <p className='text-3xl font-bold text-green-600'>{totalBooks}</p>
        <p className='text-gray-600'>Available Books</p>
      </div>

      {/* Card 3 - Reading Progress */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-bold mb-2'>Reading Progress</h3>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div className='bg-blue-600 h-4 rounded-full w-[75%]'></div>
        </div>
        <p className='text-gray-600 mt-2'>75% Completed</p>
      </div>


      {/* Card 4 - Library Usage */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-bold mb-2'>Library Usage</h3>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div className='bg-green-600 h-4 rounded-full' style={{width: '60%'}}></div>
        </div>
        <p className='text-gray-600 mt-2'>60% Utilized</p>
      </div>

      {/* Card 5 - Book Return Rate */}
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-bold mb-2'>Book Return Rate</h3>
        <div className='w-full bg-gray-200 rounded-full h-4'>
          <div className='bg-yellow-600 h-4 rounded-full' style={{width: '85%'}}></div>
        </div>
        <p className='text-gray-600 mt-2'>85% Return Rate</p>
      </div>
    </div>
  )
}

export default MainSection
