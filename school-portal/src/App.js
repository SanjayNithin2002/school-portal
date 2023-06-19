import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { StudentlogIn, TeacherlogIn, AdminlogIn } from "./actions/auth";
const data = [
  {
    "id": 1,
    "name": "School re-open data has been postponed to 16th of July for students of Grade 1 to 5."
  },
  {
    "id": 2,
    "name": "Last date for tution fees payment for the acamadic year 2023-24 is 25th of July."
  },
  {
    "id": 3,
    "name": "Hostel registration link is available in the hostel details section."
  },
  {
    "id": 4,
    "name": "Results of the passing grade 10 students have been declared on the official ISCE website."
  },
  {
    "id": 5,
    "name": "19th of July has been delclared as a public holiday by the state government of Tamil Nadu."
  },
  {
    "id": 6,
    "name": "asdfasdf asdf asdf asdf asdf asdf."
  }
];

function App() {
  const [Studentuserid, setStudentUserid] = useState("");
  const [Studentpassword, setStudentPassword] = useState("");
  const [Teacheruserid, setTeacherUserid] = useState("");
  const [Teacherpassword, setTeacherPassword] = useState("");
  const [Adminuserid, setAdminUserid] = useState("");
  const [Adminpassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (type) => {
    if (type === "student")
      dispatch(
        StudentlogIn({ userID: Studentuserid, password: Studentpassword }, navigate)
      );
    if (type === "teacher")
      dispatch(
        TeacherlogIn({ userID: Teacheruserid, password: Teacherpassword }, navigate)
      );
    if (type === "admin")
      dispatch(
        AdminlogIn({ userID: Adminuserid, password: Adminpassword }, navigate)
      );

  };
  return (
    <div className="App">
      <div class="cards">
        <Navbar>
          <Navbar.Brand href="#"><h4>SCHOOL NAME</h4></Navbar.Brand>
          <Nav>
            <Nav.Item style={{ float: "right", letterSpacing: "1px" }}><h5> Nurturing Minds, Shaping Futures...</h5> </Nav.Item>
          </Nav>
        </Navbar>
      </div>

      <div class="container-fluid1">
        <div class="login">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Student Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={Studentuserid}
                  onChange={(e) => setStudentUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={Studentpassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>
              <br />
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit("student")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="login">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Teacher Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={Teacheruserid}
                  onChange={(e) => setTeacherUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={Teacherpassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>
              <br />
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit("teacher")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="login">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Admin Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={Adminuserid}
                  onChange={(e) => setAdminUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={Adminpassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <label for="floatingPassword">Password</label>
              </div>
              <br />
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit("admin")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container1" >
        <h5>Spotlight Announcements</h5>
        <hr style={{ border: "1px solid gray" }} />
        <ul>
          {data.map((item) => (
            <li style={{ marginBottom: "10px" }} key={item.id}><h6>{item.name}</h6></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
