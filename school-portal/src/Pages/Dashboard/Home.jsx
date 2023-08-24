import React from 'react'
import Student from './Student'
import Teacher from './Teacher'
import Error404 from '../Error404'

const Home = () => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Teacher/>
    }
    </>
  )
}

export default Home
