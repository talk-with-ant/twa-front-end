import React from "react";
import { BrowserRouter, Switch, Route, withRouter, useParams } from "react-router-dom";
import RegisFormAllCourses from "../components/user-regis-page";
import SuccessPage from "../components/user-success-regis";
import OwnerAddCourse from "../components/owner-add-course";
import SuccessAddCoursePage from "../components/owner-success-add";
import AuthenPage from "../components/owner-authen-page";
import SuccessAuth from "../components/owner-success-auth";
import ListParticipant from "../components/owner-list-participant"

class Routing extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/enrollcourse"><RegisFormAllCourses /></Route>
                    <Route exact path="/success/:courseName" ><SuccessPage /></Route>
                    <Route exact path="/successAddCourse/:courseName" ><SuccessAddCoursePage /></Route>
                    <Route exact path="/addcourse"><OwnerAddCourse /></Route>
                    <Route exact path="/authen"><AuthenPage /></Route>
                    <Route exact path="/successAuth"><SuccessAuth /></Route>
                    <Route exact path="/listParticipant"><ListParticipant /></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routing