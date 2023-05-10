import React from 'react'
import Student from './Student'
import Admin from './Admin'
import Error404 from '../Error404'

const Fees = () => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Error404/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin/>
    }
    </>
  )
}

export default Fees
