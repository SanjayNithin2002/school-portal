import * as api from "../api";
import axios from "axios";
import { logout } from "./logout";

/*  
    ->This Function is for Students to verfy their login credentials and make them login to the portal.
    ->To login to the portal, the login details are stored in the authData variable and data is passed with a POST api to the server
    ->After successfully getting the resposne from the server, The system store some details in the localstorage and redirect them to Home Page.
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const StudentlogIn = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://schoolportalbackend.onrender.com/students/login",
            authData
        );

        if (data.docs) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("type", "student");
            localStorage.setItem("id", data.docs._id);
            window.location.href="/Home";
        }
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Teacher to verfy their login credentials and make them login to the portal.
    ->To login to the portal, the login details are stored in the authData variable and data is passed with a POST api to the server
    ->After successfully getting the resposne from the server, The system store some details in the localstorage and redirect them to Home Page.
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const TeacherlogIn = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://schoolportalbackend.onrender.com/teachers/login",
            authData
        );
        if (data.docs) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("type", "teacher");
            localStorage.setItem("id", data.docs._id);
            window.location.href="/Home";
        }
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Admins to verfy their login credentials and make them to login to the portal.
    ->To login to the portal, the login details are stored in the authData variable and data is passed with a POST api to the server
    ->After successfully getting the resposne from the server, The system store some details in the localstorage and redirect them to Home Page.
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const AdminlogIn = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://schoolportalbackend.onrender.com/admins/login",
            authData
        );
        if (data.docs) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("type", "admin");
            localStorage.setItem("id", data.docs._id);
            window.location.href="/Home";
        }
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Admins to add the new student records in the portal.
    ->To add new students record in the portal, the new student details are stored in the authData variable and data is passed with a POST api call using AddStudent()
    ->After successfully storing the new student record, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const AddStudents =
    (location, navigate, authData) => async (dispatch) => {
        try {
            await api.AddStudent(authData);
            navigate(location, {
                state: {
                    status: 200,
                    message: "Student Record has been Created Successfully.",
                },
            });
        } catch (err) {
            if (err.response)
                navigate("/", {
                    state: {
                        status: err.response.status,
                        message: err.response.data.message,
                    },
                });
            else dispatch(logout());
        }
    };

/*  
    ->This Function is for Admins to add the new teacher records in the portal.
    ->To add new teacher record in the portal, the new teacher details are stored in the authData variable and data is passed with a POST api call using AddTeacher()
    ->After successfully storing the new teacher record, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const AddTeachers = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.AddTeacher(authData);
        navigate("/AddStaff");
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Admins to add the new admin records in the portal.
    ->To add new admin record in the portal, the new admin details are stored in the authData variable and data is passed with a POST api call using AddAdmin()
    ->After successfully storing the new admin record, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const AddAdmin = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.AddAdmin(authData);
        navigate("/AddStaff");
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Admins to add the new staff records (other than teachers and admins) in the portal.
    ->To add new staff record in the portal, the new staff details are stored in the authData variable and data is passed with a POST api call using AddWorkers()
    ->After successfully storing the new staff record, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const AddWorkers = (authData, navigate) => async (dispatch) => {
    try {
        await api.AddWorkers(authData);
        navigate("/AddStaff");
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};

/*  
    ->This Function is for Students to view contact details of the school and contact the admins with their query.
    ->To sent a query to the admin, the query details are stored in the contactData variable and data is passed with a POST api call using requestContact()
    ->After successfully sending the query to the admin, the system passes a success message to the user.
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const requestContact = (contactData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.requestContact(contactData);
        navigate("/ContactUs", { state: { status: 200, message: data.message } });
    } catch (err) {
        if (err.response)
            navigate("/", {
                state: {
                    status: err.response.status,
                    message: err.response.data.message,
                },
            });
        else dispatch(logout());
    }
};
