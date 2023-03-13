import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { useLocation,Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    return (
        location.pathname!=="/" &&
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/Home'>XYZ school</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/Home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Attandance'>Attandance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/TimeTable'>Time Table</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Assessments'>Assessments</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Teacher'>Teacher details</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Payment'>Payments</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Contact'>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar