import React from 'react'
import Student from './Student'
import Admin from './Admin'
import Error404 from '../Error404'

const Bonafide = ({status,onLoading}) => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Error404/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    </>
  )
}

export default Bonafide
