import React from "react";
import { Routes,Route,BrowserRouter} from "react-router-dom"

import App from "./App"
import Navbar from "./components/NavBar/Navbar";
import Home from "./Pages/Home"
import Error404 from "./Pages/Error404";

const AllRoutes = () => {
    return(
        <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default AllRoutes;