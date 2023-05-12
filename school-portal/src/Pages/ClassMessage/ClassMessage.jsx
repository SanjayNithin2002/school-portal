import React,{useEffect} from 'react'
import Student from './Student'
import Teacher from './Teacher'
import Error404 from "../../Pages/Error404"
import {useDispatch, useSelector} from "react-redux"
import { getClassMessage } from '../../actions/classMessage'
const ClassMessage = () => {
  const dispatch = useDispatch();
  const classid = ''
  const user = useSelector(state => state.currentuserReducer)
  useEffect(() => {
    dispatch(getClassMessage(classid))
  }, [dispatch])
  const messages = useSelector(state => state.classmessageReducer)

  return (<>
  {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" && 
        <Student message={messages}/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher message={messages}/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Error404/>
    }
    </>
  )
}

export default ClassMessage