import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"
import SideNavBar from "../../components/SideNavBar/SideNavBar";
function timetable() {

    return (
        <div className="Main">
            
            <SideNavBar/>
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Time Table</h2>
                    <hr style={{border:"1px solid gray"}}/>
                </div>
            </div >
        </div>
    );
}

export default timetable;
