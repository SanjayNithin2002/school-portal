import React from 'react'
import Img1 from "../../assests/loading-1.gif"
import Img2 from "../../assests/loading-2.gif"
import "./Loading.css"

const Loading = ({status}) => {
  return (
    status &&
    <div className='loading-background '>
        <img src={Img1} alt='no-img' className='img-1'/>
        <img src={Img2} alt='no-img' className='img-2'/>
    </div>
  )
}

export default Loading
