import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeTable } from '../../actions/timetable';
import { getClass } from '../../actions/class';
import { setCurrentUser } from '../../actions/currentUser';

const Student = () => {

    const dispatch = useDispatch();

    const timetable = useSelector((state) => state.timeTableReducer);
    const class1 = useSelector((state) => state.allClassReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);

    useEffect(() => {

        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    if (currentUser && currentUser.docs.standard && !timetable) {
        dispatch(getTimeTable(currentUser.docs.standard))
    }



    console.log(timetable);
    console.log(class1);

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Time Table</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student
