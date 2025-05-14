import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MainSection from './MainSection'



const Dashboard = () => {
  return (
    
    <div className='relative'>
      <div className='md:flex '>
        <Sidebar />
        <div className='flex-1'>
         <Header />

         <MainSection/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
