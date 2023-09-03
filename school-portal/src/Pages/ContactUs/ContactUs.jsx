import React from 'react'
import Student from './Student'
import Error404 from '../Error404'

const ContactUs = () => {
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
        <Error404/>
    }
    </>
  )
}

export default ContactUs
