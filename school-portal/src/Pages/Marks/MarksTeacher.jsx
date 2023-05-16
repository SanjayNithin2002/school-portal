import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from "react-bootstrap/Table";
import { TagGroup, Tag } from 'rsuite';

const data = [
  {
    rollno: 1,
    fname: "Arvind",
    lname: "M M",
    marks: 89,
    grade: "B"
  },
  {
    rollno: 2,
    fname: "Dharan",
    lname: "Kumar",
    marks: 66,
    grade: 'B'
  },
  {
    rollno: 3,
    fname: "Keerthy",
    lname: "Suresh",
    marks: 87,
    grade: 'B'
  },
  {
    rollno: 4,
    fname: "Muthu",
    lname: "Kumar",
    marks: 56,
    grade: 'B'
  },
  {
    rollno: 5,
    fname: "Ramya",
    lname: "Pandian",
    marks: 43,
    grade: 'B'
  },
  {
    rollno: 6,
    fname: "Yeshwanth",
    lname: "J D",
    marks: 92,
    grade: 'B'
  },
];

const MarksTeacher = () => {
  const [stardard, setStardard] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  let sum=0;
  for(let i=0;i<data.length;i++){
   sum+=data[i].marks;
  }
  const avg=(sum/data.length).toFixed(2);
  let lmark=data[0].marks;
  let hmark=data[0].marks;
  for(let i=0;i<data.length;i++){
    if(lmark>data[i].marks)
    lmark=data[i].marks;
    if(hmark<data[i].marks)
    hmark=data[i].marks;
  }
  return (
    <>
      <div className="Main">
        <SideNavBar />
        <div className="Home">
          <div className="container rounded bg-white">
            <h2>Marks Analysis</h2>
            <hr style={{ border: "1px solid gray" }} />
            <div>
              <div className="row classmessage-container-1">
                <div className="col-lg-2">
                  <h4>Select Class : </h4>
                </div>
                <div className="col-lg-2">
                  <select
                    className="selectPicker3"
                    value={stardard}
                    onChange={(e) => setStardard(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <h4>Select Section : </h4>
                </div>
                <div className="col-lg-2">
                  <select
                    className="selectPicker3"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Section
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div className="col-lg-2">
                  <h4>Select Subject : </h4>
                </div>
                <div className="col-lg-2">
                  <select
                    className="selectPicker3"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
                    <option value="A">Physics</option>
                    <option value="B">Geography</option>
                    <option value="C">Tamil</option>
                    <option value="D">Biology</option>
                  </select>
                </div>

              </div>
              <br />
              <br />
              {stardard && section && subject && <>
                <div className="row studentlist-container">
                  <div className="col-lg-8">
                    <Table striped className="tablestyle4">
                      <thead>
                        <tr>
                          <th>Roll No</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Marks Scored</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stardard !== "" && section !== "" ? (
                          data.map((item) => (
                            <tr key={item}>
                              <td>{item.rollno}</td>
                              <td>{item.fname}</td>
                              <td>{item.lname}</td>
                              <td>{item.marks}</td>
                              <td>{item.grade}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} align="center">
                              No Data
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <hr style={{ border: "1px solid gray" }} />
                  <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Class Average</Tag>
                    <Tag size="lg">{avg}</Tag>
                  </TagGroup>
                  <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Highest Mark</Tag>
                    <Tag size="lg">{hmark}</Tag>
                  </TagGroup>
                  <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Lowest Mark</Tag>
                    <Tag size="lg">{lmark}</Tag>
                  </TagGroup>
              </>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MarksTeacher