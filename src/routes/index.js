import React from "react";
import { BrowserRouter, Switch, Route, withRouter, useParams } from "react-router-dom";

import RegisFormAllCourses from "../components/RegisFormAllCourses";
import SuccessPage from "../components/Success";
import OwnerAddCourse from "../components/Owner-AddCourse";
import SuccessAddCoursePage from "../components/SuccessAdd";
import AuthenPage from "../components/AuthenPage";
import SuccessAuth from "../components/SuccessAuth"


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

                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routing