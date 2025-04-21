import NavBar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <div className='flex-1 mt-16'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
