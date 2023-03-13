function Home() {
    return (
        <div className="Home">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>

            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">XYZ school</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="attandance">Attandance</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Time Table</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Assessments</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Teacher details</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Payments</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container rounded bg-white">
                <div class="row">
                    <div class="col-md-2">
                        <div class="d-flex flex-column align-items-center text-center p-5 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
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


                    <div class="col-md-5">
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
