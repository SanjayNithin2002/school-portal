import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';

function App() {
  const navigate = useNavigate();
  const handleClick = (type) =>{
    localStorage.setItem("type",type);
    navigate('/Home');
  }
  return (
    <div className="App">

      <div class="card">
      <Navbar>
    <Navbar.Brand href="#">SCHOOL NAME</Navbar.Brand>
    
    
  </Navbar>
      </div>
      <br></br><br></br>
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Student Login</h5>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Registration number</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
              </div><br/><button className="btn btn-primary" onClick={()=>handleClick('student')}>Submit</button>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Teacher Login</h5>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Employee ID</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
              </div><br/><button className="btn btn-primary" onClick={()=>handleClick('teacher')}>Submit</button>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Admin Login</h5>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Admin ID</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
              </div><br/><button className="btn btn-primary" onClick={()=>handleClick('admin')}>Submit</button>
            </div>
          </div>
        </div>


      </div>


    </div>
  );
}

export default App;
