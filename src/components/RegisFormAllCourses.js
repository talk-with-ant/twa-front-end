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
import liff from "@line/liff";

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
            timestamp: ''

            // userLineID: '',
            //  pictureUrl: '',
            //  statusMessage: ''

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

    getProfile() {
        liff.getProfile().then(dataInfo => {
            this.setState({
                name: dataInfo.displayName,
                userId: dataInfo.userId,
                pictureUrl: dataInfo.pictureUrl,
                statusMessage: dataInfo.statusMessage
            });
        });

        const languageDevice = liff.getLanguage();
        const versionSDK = liff.getVersion();
        const client = liff.isInClient();
        const isLogin = liff.isLoggedIn();
        const os = liff.getOS();
    }

    componentDidMount() {
        // Using a Promise object
        liff
            .init({
                liffId: "1654421462-oal2PRL7" // Use own liffId
            })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
                // Start to use liff's api
                liff.getProfile();
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                liff.closeWindow();
            });

        // Using a callback
        // liff.init({ liffId: "1654421462-oal2PRL7" }, successCallback, errorCallback);

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

        event.preventDefault();
        const data = new FormData(event.target)
        const timestamp = this.setState({ timestamp: new Date() })

        console.log("userId -> ", this.state.userId);
        console.log("name -> ", this.state.name);
        console.log("tel -> ", this.state.tel);
        console.log("email -> ", this.state.email);
        console.log("timestamp -> ", this.state.timestamp);
        console.log(this.state);

        fetch('https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/users', {
            method: 'POST',
            body: {
                courseName: this.state.courseName,
                userId: this.state.userId,
                name: this.state.name,
                tel: this.state.tel,
                email: this.state.email,
                timestamp: this.state.timestamp
            },
        });

        this.props.history.push("/success")


    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div>
                                {/* {
                                    (this.state.userId && this.state.userId != '')
                                        ?
                                        <p>LineID: {this.state.userId}</p>
                                        :
                                        null
                                } */}
                                <label >LineID</label>
                                <input required
                                    name="userId"
                                    type="hidden"
                                    onLoad
                                    className="form-control"
                                    value={this.state.userId}
                                    onChange={this.handlerChange}
                                />

                            </div>
                            <div className="form-group">
                                <label >Email address </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    name="tel"
                                    type="tel"
                                    className="form-control"
                                    id="tel"
                                    placeholder="0123456789"
                                    pattern="[0-9]{10}"
                                    required
                                    onChange={this.handlerChange}

                                />
                            </div>
                            <div className="form-group">
                                <label >Course</label>
                                <select name="courseName" required onChange={this.handlerChange}>
                                    {courses.map((course) => (
                                        <option key={course.id}>{course.data.courseName}</option>
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
                                <button className="btn btn-primary" onClick={this.getProfile.bind(this)}>
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