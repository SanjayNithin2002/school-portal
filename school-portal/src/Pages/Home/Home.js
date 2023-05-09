import SideNavBar from "../../components/SideNavBar/SideNavBar";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel, Table, Tag, TagGroup } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const data = [
    {
        id: 1,
        email: 'Leora13@yahoo.com',
        firstName: 'Ernest Schuppe Anderson',
        lastName: null,
        city: 'New Gust',
        companyName: 'Lebsack - Nicolas'
    },
    {
        id: 2,
        email: 'Mose_Gerhold51@yahoo.com',
        firstName: 'Janis',
        lastName: 'Bode',
        city: 'New Gust',
        companyName: 'Glover - Hermiston'
    },
    {
        id: 3,
        city: 'New Gust',
        email: 'Frieda.Sauer61@gmail.com',
        firstName: 'Makenzie Vandervort',
        lastName: null,
        companyName: 'Williamson - Kassulke'
    },
    {
        id: 4,
        email: 'Eloisa.OHara@hotmail.com',
        firstName: 'Ciara',
        lastName: 'Towne',
        city: 'Vandervort',
        companyName: 'Hilpert, Eichmann and Brown'
    },
    {
        id: 5,
        email: 'Brisa46@hotmail.com',
        firstName: 'Suzanne',
        lastName: 'Wolff',
        city: 'Vandervort',
        companyName: 'Mayer - Considine'
    },
    {
        id: 6,
        email: 'Cody.Schultz56@gmail.com',
        firstName: 'Alessandra',
        lastName: null,
        city: 'Vandervort',
        companyName: 'Nikolaus and Sons'
    },
    {
        id: 7,
        email: 'Enrico_Beer@yahoo.com',
        firstName: 'Margret',
        lastName: 'Heller',
        city: 'Vandervort',
        companyName: 'Corwin, Maggio and Wintheiser'
    },
    {
        id: 8,
        email: 'Mitchel.Herman@yahoo.com',
        firstName: 'Emiliano',
        lastName: 'Moore',
        city: 'Gilberthaven',
        companyName: 'Gulgowski - Botsford'
    },
    {
        id: 9,
        city: 'Gilberthaven',
        email: 'Gaylord_Reichel16@yahoo.com',
        firstName: 'Alessandra',
        lastName: 'Smith',
        companyName: 'Maggio LLC'
    }
];

function Home() {
    return (
        // <div className="Main">
        //     <SideNavBar/>
        // <div className="Home">
        //     <div class="container rounded bg-white">
        //             <div class="row">
        //                 <div class="col-md-4">
        //                     <div class="d-flex flex-column align-items-center text-center p-5 py-5"><img class="rounded-circle mt-5" alt="no img" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        //                 </div>
        //                 <div class="col-md-5">
        //                     <div class="p-3 py-5">
        //                         <div class="d-flex justify-content-between align-items-center mb-3">
        //                             <h4 class="text-right">Welcome Back! </h4>
        //                         </div>
        //                         <div class="row mt-3">
        //                             <div class="col-md-12">First Name</div>
        //                             <div class="col-md-12">Application Number</div>
        //                             <div class="col-md-12">Address</div>
        //                             <div class="col-md-12">Standard</div>
        //                             <div class="col-md-12">Section</div>
        //                             <div class="col-md-12">Parent Name</div>
        //                             <div class="col-md-12">Parent Phone Number</div>
        //                         </div>
        //                         <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
        //                     </div>
        //                 </div>


        //                 <div class="col-md-3">
        //                     <div class="p-3 py-5">
        //                         <div class="d-flex justify-content-between align-items-center mb-3"></div>
        //                         <div class="row mt-5">
        //                             <div class="col-md-12">Last Name</div>
        //                             <div class="col-md-12">Date of Birth</div>

        //                         </div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </div >
        // </div>



        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Welcome Back!</h2>
                    <hr style={{ border: "1px solid gray" }} />


                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                        <img src="https://via.placeholder.com/240x240" height="240" />
                        <Panel header="STUDENT NAME">
                            <p>
                                <small>
                                    A suite of React components, sensible UI design, and a friendly development experience.
                                </small>
                            </p>
                        </Panel>
                    </Panel>

                    <div style={{ display: "inline-block", float:'none' }}>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">First Name</Tag>
                        <Tag size="lg">Samuel</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block', margin:'10px' }}>
                        <Tag size="lg">Last Name</Tag>
                        <Tag size="lg">Jackson</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Standard</Tag>
                        <Tag size="lg">5th Grade</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Section</Tag>
                        <Tag size="lg">C</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Application Number</Tag>
                        <Tag size="lg">123456789</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Address</Tag>
                        <Tag size="lg">XYZ block, abc road, pqr layout, abcd Nagar, Vellore.</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Parent Name</Tag>
                        <Tag size="lg">Walter White</Tag>
                    </TagGroup>
                    <TagGroup style={{ display: 'block',margin:'10px' }}>
                        <Tag size="lg">Parent Phone</Tag>
                        <Tag size="lg">987654321</Tag>
                    </TagGroup>
                </div>


            </div>
        </div>
        </div >

    );
}

export default Home;
