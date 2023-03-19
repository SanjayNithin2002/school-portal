import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"

function Home() {
    return (
        <div className="Home" style={{width:"80%"}}>
            <div class="container rounded bg-white">
                <div class="row">
                    <div class="col-md-4">
                        <div class="d-flex flex-column align-items-center text-center p-5 py-5"><img class="rounded-circle mt-5" alt="no img" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
                    </div>
                    <div class="col-md-5">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Welcome Back! </h4>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">First Name</div>
                                <div class="col-md-12">Application Number</div>
                                <div class="col-md-12">Address</div>
                                <div class="col-md-12">Standard</div>
                                <div class="col-md-12">Section</div>
                                <div class="col-md-12">Parent Name</div>
                                <div class="col-md-12">Parent Phone Number</div>
                            </div>
                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3"></div>
                            <div class="row mt-5">
                            <div class="col-md-12">Last Name</div>
                            <div class="col-md-12">Date of Birth</div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>





        </div >
    );
}

export default Home;
