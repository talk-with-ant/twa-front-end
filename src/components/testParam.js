import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { responsiveFontSizes } from '@material-ui/core';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useParams
} from "react-router-dom";

class TestParam extends React.Component {

    User() {
        let { courseId } = useParams();
        return <h2>User {courseId}</h2>;
    }


    render() {
        return (

            <div>
                test  {this.props.match.params.courseId}
            </div>
        )
    }

}
export default TestParam;