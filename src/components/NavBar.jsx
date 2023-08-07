import React from 'react'
import { useSelector } from 'react-redux'
const NavBar = () => {

  const {tasksList,error} = useSelector((state) => state.tasks)
  
  return (
    <>
    <h1 className='text-center text-primary'>Project Management</h1>
    <p className='text-center lead'>{`currently ${tasksList.length} task(s) pending/Completed`}</p>
    {
      (error !== '') ? <h5 className='text-center text-danger'>{error}</h5> : null
    }
    </>
  )
}

export default NavBar
