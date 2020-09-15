import React, { Component } from 'react';
import ReactDOM from 'react-dom'
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

class RegisFormAllCourses extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSumbit.bind(this);
        this.state = {
            courses: [],
            userId: '',
            name: '',
            tel: '',
            email: '',
            timestamp: '',
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
            text: "Cancel Register"
        }]).then(() => {
            liff.closeWindow();
        });
    }

    componentDidMount() {
        window.addEventListener('load', this.initialize);
        axios
            .get("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses")
            .then((res) => {
                this.setState({ courses: res.data });
            })
            .catch((error) => {
                console.log(error);
            })
            ;
    }

    handleSumbit(event) {
        // if (!event.target.checkValidity()) {
        //     // form is invalid! so we do nothing
        //     return;
        //   }
        // form is valid! We can parse and submit data
        event.preventDefault();
        const data = new FormData(event.target)
        // const userId = this.state.userId
        const timestamp = new Date();

        // this.props.name = this.state.name;
        console.log("userId -> ", this.state.userId);
        console.log("name -> ", this.state.name);
        console.log("tel -> ", this.state.tel);
        console.log("email -> ", this.state.email);
        console.log("timestamp -> ", timestamp);

        fetch('https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/users', {
            method: 'POST',
            body: {
                courseName: this.state.courseName,
                userId: this.setState({ userId: '123456789' }),
                name: this.state.name,
                tel: this.state.tel,
                email: this.state.email,
                timestamp: timestamp
            },
        });


        this.props.history.push("/success")


    }

    render() {
        const { courses } = this.state;
        return (

            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h2 className="my-4 text-center">Register</h2>
                        <form onSubmit={this.handleSubmit} >

                            <div className="form-group">
                                <label >Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    required
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label >Last name</label>
                                    <input
                                        name="lastname"
                                        type="text"
                                        className="form-control"
                                        id="lastname"                                    
                                        placeholder="Enter last name"
                                        required
                                    />
                            </div> */}
                            <div className="form-group">
                                <label >Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    required
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    name="tel"
                                    type="number"
                                    className="form-control"
                                    id="tel"
                                    placeholder="0123456789"
                                    required
                                    onChange={(e) => this.setState({ tel: e.target.value })}
                                    parseInt
                                />
                            </div>
                            <div className="form-group">
                                <label >Course</label>
                                <select value="courseName" required onChange={(e) => this.setState({ courseName: e.target.value })}>
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
                                    required
                                />
                                <label className="form-check-label">
                                    Accept term and conditions
              </label>
                            </div>


                            <div>
                                {/* <Link to="/success" className="btn btn-primary" type="submit">Sign up</Link> */}
                                <button className="btn btn-primary">
                                    Submit
                                    </button>
                            </div>

                            <div>
                                <button onClick={this.closeApp} className="btn btn-warning">
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

export default withRouter(RegisFormAllCourses)