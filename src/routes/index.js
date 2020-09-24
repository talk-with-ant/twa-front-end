import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

import RegisFormAllCourses from "../components/RegisFormAllCourses";
import SuccessPage from "../components/Success";
// import Success from "../components/Success";
// import Register from "../components";

//import RegisterByCourse from "../components/RegisFormByCourse";
import Success from "../components/Success";
import TestLine from "../components/TestLine"


class Routing extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/courses" ><RegisFormAllCourses /></Route>
                    <Route exact path="/success/:courseName" ><SuccessPage /></Route>
                    <Route exact path="/line" component={TestLine} />

                </Switch>
            </BrowserRouter>
        );
    }
}
export default withRouter(Routing)