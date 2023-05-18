import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./actions/auth";

function App() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (type) => {
    dispatch(logIn({ userid, password, type }, navigate));
  };
  return (
    <div className="App">
      <div class="card">
        <Navbar>
          <Navbar.Brand href="#">SCHOOL NAME</Navbar.Brand>
        </Navbar>
      </div>
      <br></br>
      <br></br>
      <div class="row">

        
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Student Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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


        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Teacher Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Admin Login</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="User ID"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
                <label for="floatingInput">User ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}

export default App;
