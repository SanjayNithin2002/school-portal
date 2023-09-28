import React from 'react'
import Student from './Student'
import Teacher from './Teacher'

const Home = ({status,onLoading}) => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student onLoading={(status1)=>onLoading(status1)} status={status} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher onLoading={(status1)=>onLoading(status1)} status={status} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Teacher onLoading={(status1)=>onLoading(status1)} status={status} />
    }
    </>
  )
}

export default Home
