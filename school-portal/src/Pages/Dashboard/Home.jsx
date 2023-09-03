import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSpotlight, getSpotlight } from '../../actions/spotlight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons"

function Home() {


 const handleSubmit = (ID) => {
    if(window.confirm("Are you sure, you want to delete the message?"))
      dispatch(deleteSpotlight(ID));
  }


  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token"))
      dispatch(getSpotlight());
  }, [dispatch])
  const spotlight = useSelector((state) => state.spotlightReducer);
  console.log(spotlight)

  const checkDate = (a, b) => {
    let date1 = new Date(a);
    let date2 = new Date(b);
    return date1 - date2;
  }
  return (
    <div className="Main">
      <div className="Home">
        <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
          <h2>Dashboard</h2>
          <hr style={{ border: "1px solid gray" }} />
          <div style={{ width: "100%" }} className="AddStudent-container">
            <div style={{ minWidth: "400px" }}>
              <div className='Message-Main-Container'>
                <ul className='message-ul'>
                  {
                    spotlight && spotlight.message.length > 0 &&
                    spotlight.message.sort((a, b) => checkDate(a.postedOn, b.postedOn)).map((item) => (
                      <li>
                        <div>
                          <div className='message-operation'>
                            <div className='message-title'>{item.title}</div>&emsp;
                            <div className='message-action'>
                              <span onClick={()=>handleSubmit(item._id)} >
                                <FontAwesomeIcon icon={solid.faTrash} /> Delete
                              </span>
                            </div>

                          </div>
                          <div className='message-content1'>
                            <div className='message-user'>To : {item.users}</div>
                            <div className='message-description' dangerouslySetInnerHTML={{ __html: item.description }} />

                          </div>
                        </div>
                      </li>
                    ))

                  }
                  {
                    (!spotlight || spotlight.message.length === 0) &&
                    <li>
                      <div><span style={{ borderRadius: "8px", backgroundColor: "#cadeef", padding: "10px 5px", fontSize: "18px", fontWeight: "bold" }}><FontAwesomeIcon icon={solid.faExclamationTriangle} />&emsp;No Message</span></div>
                      </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
