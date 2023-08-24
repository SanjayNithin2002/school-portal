import React from "react"

import "../App.css"
import SideNavBar from "../components/SideNavBar/SideNavBar"

function Error404() {
    return (
        <div className="Main">
            <div className="Home">
                <div style={{padding:"20px 40px"}} class="container1 container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="error-template">
                                <h1>
                                    Oops!</h1>
                                <h2>
                                    404 Not Found</h2>
                                <div class="error-details">
                                    Sorry, an error has occured, Requested page not found!
                                </div>
                                <div class="error-actions">
                                    <a href="/Home" style={{ textDecoration: "none" }} class="btn btn-primary btn-lg">
                                        <span class="glyphicon glyphicon-home"></span>
                                        Take Me Home
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Error404