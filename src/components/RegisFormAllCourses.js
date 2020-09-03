import React, { Component } from 'react';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import './RegisFormAllCourses.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Routing from '../routes';

const liff = window.liff;

export default class RegisFormAllCourses extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSumbit.bind(this);
        this.state = {
            courses: [],
            displayName: '',
            userId: '',
            pictureUrl: '',
            statusMessage: ''
        };
        this.initialize = this.initialize.bind(this);
        this.closeApp = this.closeApp.bind(this);
    }



    initialize() {
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage
            });
        });
    }

    closeApp(event) {
        event.preventDefault();
        liff.sendMessages([{
            type: 'text',
            text: "Bye Bye!!!"
        }]).then(() => {
            liff.closeWindow();
        });
    }

    componentDidMount() {
        window.addEventListener('load', this.initialize);
        axios
            .get("https://asia-northeast1-antv2-xdbgna.cloudfunctions.net/twaApi/courses")
            .then((res) => {
                this.setState({ courses: res.data });
            })
            .catch((error) => {
                console.log(error);
            })
            ;
    }

    handleSumbit(event) {
        event.preventDefault();
        const data = new FormData(event.target)
        const userId = this.state.userId;

        fetch('https://asia-northeast1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/users', {
            method: 'POST',
            body: {
                userId,
                data
            },
        });

        // event.preventDefault()
        // this.props.history.push('/success'); // <--- The page you want to redirect your user to.

    }

    render() {
        const { courses } = this.state;
        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h2 className="my-4 text-center">Register</h2>
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label >First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div className="form-group">
                                <label >Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div className="form-group">
                                <label >Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputCourse1">Course</label>
                                <select>
                                    {courses.map((course) => (
                                        <option key={course.id}>{course.data.name}</option>
                                    ))}
                                </select>

                                {/* แก้ select ตาม css */}

                            </div>
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check"
                                    name="check"

                                />
                                <label className="form-check-label">
                                    Accept term and conditions
              </label>
                            </div>
                            <div>

                                {/* <Link to="/success" className="btn btn-primary" type="submit">Sign up</Link> */}

                                <button type="submit" className="btn btn-primary">
                                    Submit
                                     </button>


                            </div>
                            <div>
                                <button type="button" className="btn btn-warning">
                                    Cancel
            </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        )
    }
}
