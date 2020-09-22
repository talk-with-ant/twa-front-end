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
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class RegisFormAllCourses extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            courses: [],
            userId: '',
            name: '',
            tel: '',
            email: '',
            courseName: ''
            // timestamp: '',

            // pictureUrl: '',
            // statusMessage: '',
            // languageDevice: '',
            // versionSDK: '',
            // client: '',
            // isLogin: '',
            // os: ''
            // userLineID: '',
            //  pictureUrl: '',
            //  statusMessage: ''

        };
        // this.initialize = this.initialize.bind(this);
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.closeLIFF = this.closeLIFF.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // initialize() {
    //     liff.init(async (data) => {
    //         let profile = await liff.getProfile();
    //         this.setState({
    //             displayName: profile.displayName,
    //             userId: profile.userId,
    //             pictureUrl: profile.pictureUrl,
    //             statusMessage: profile.statusMessage
    //         });
    //     });
    // }

    componentDidMount() {
        // Using a Promise object
        liff.init({ liffId: "1654421462-oal2PRL7" })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
                // Start to use liff's api
                const lineProfile = liff.getProfile();
                console.log(lineProfile)
                const idToken = liff.getIDToken();
                console.log(idToken) // print raw idToken object
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                // liff.closeWindow();
            });

        // Using a callback
        // liff.init({ liffId: "1654421462-oal2PRL7" }, successCallback, errorCallback);
        // window.addEventListener('load', this.initialize);
        axios
            .get("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses")
            .then((res) => {
                this.setState({ courses: res.data });
            })
            .catch((error) => {
                console.log(error);
            })
            ;

        // getProfile();

    }

    closeLIFF() {

        liff.closeWindow();
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
                // name: dataInfo.displayName,
                userId: dataInfo.userId,
                // pictureUrl: dataInfo.pictureUrl,
                // statusMessage: dataInfo.statusMessage
            });
        });

        // const languageDevice = liff.getLanguage();
        // const versionSDK = liff.getVersion();
        // const client = liff.isInClient();
        // const isLogin = liff.isLoggedIn();
        // const os = liff.getOS();

        // this.setState({
        //     languageDevice: languageDevice,
        //     versionSDK: versionSDK,
        //     client: (client === true) ? 'YES' : 'NO',
        //     isLogin: (isLogin === true) ? 'Login' : 'Not Login',
        //     os: os
        // });
    }



    handleSubmit(event) {

        event.preventDefault();

        const data = new FormData(event.target);
        // const timestampGen = new Date().toString();
        // this.timestamp = this.setState({ timestamp: new Date() });
        console.log("course ->", this.state.courseName);
        console.log("userId -> ", this.state.userId);
        console.log("name -> ", this.state.name);
        console.log("tel -> ", this.state.tel);
        console.log("email -> ", this.state.email);
        // console.log("timestamp -> ", timestampGen);
        console.log(this.state);

        fetch(
            'https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "courseName": this.state.courseName,
                    "userId": this.state.userId,
                    "name": this.state.name,
                    "tel": this.state.tel,
                    "email": this.state.email,

                }),
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
                        <form onSubmit={this.handleSubmit} onInput={this.getProfile}>

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
                                // onClick={this.getProfile}
                                />
                            </div>
                            <div type="hidden">

                                {/* {
                                    (this.state.userId && this.state.userId != '')
                                        ?
                                        <p>LineID: {this.state.userId}</p>
                                        :
                                        null
                                } */}


                                <input required
                                    name="userId"
                                    type="hidden"
                                    onLoad
                                    className="form-control"
                                    value={this.state.userId}
                                // onChange={this.handlerChange}
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

                            {/* <div>
                                <button className="btn btn-primary" onClick={this.getProfile.bind(this)}>
                                    Submit
                                    </button>
                            </div>
                            <div>
                                <button onClick={this.closeLIFF.bind(this)} className="btn btn-warning">
                                    Cancel
            </button>
                            </div> */}

                            <input type="submit" value="Submit" onClick={this.getProfile} />
                            <input type="button" value="Close" onClick={this.closeLIFF} />



                        </form>


                    </div>
                </div>
            </div>


        )
    }
}

export default withRouter(RegisFormAllCourses)