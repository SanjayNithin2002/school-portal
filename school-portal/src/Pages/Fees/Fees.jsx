import React from 'react'
import Student from './Student'
import Admin from './Admin'
import Error404 from '../Error404'

const Fees = ({status,onLoading}) => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student onLoading={(status1)=>onLoading(status1)} status={status} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Error404/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin onLoading={(status1)=>onLoading(status1)} status={status} />
    }
    </>
  )
}

export default Fees
