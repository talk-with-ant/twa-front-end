import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import RegisFormAllCourses from "../components/RegisFormAllCourses";
// import Success from "../components/Success";
// import Register from "../components";

//import RegisterByCourse from "../components/RegisFormByCourse";
import Success from "../components/Success";

export default class Routing extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/courses" component={RegisFormAllCourses} />
                    <Route exact path="/success" component={Success} />


                </Switch>
            </BrowserRouter>
        );
    }
}