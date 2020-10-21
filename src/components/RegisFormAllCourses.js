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
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import Routing from '../routes';
import liff from "@line/liff";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import BannerTop from './BannerTop';
import SuccessPage from './Success';
import { isConstTypeReference } from 'typescript';
import { Modal } from 'react-bootstrap';
// import { Button, Container, Row, Col, Form } from 'react-bootstrap';




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
            courseName: '',
            courseId: ''


        };
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
        // const medium = 'https://medium.com/linedevth/';
        const queryString = decodeURIComponent(window.location.search);
        // .replace("?liff.state=", "");
        const params = new URLSearchParams(queryString);
        const id = params.get('courseId');
        this.setState({ courseId: id });
        console.log(this.state.courseId)

        // if (id != null && id != '') {
        //     window.location.assign(medium + id);
        //     console.log(id);
        // } else {
        //     window.location.assign("https://developers.line.biz");
        // }
        // Using a Promise object

        /* VV Hide this when dev for conveinience */
        liff.init({ liffId: "1654378227-QwAzgAb0" })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
                // Start to use liff's api
                const lineProfile = liff.getProfile();
                console.log(lineProfile)
                const idToken = liff.getIDToken();
                console.log(idToken)
                // print raw idToken object
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                // liff.closeWindow();
            });
        /* ^^ Hide this when dev for conveinience */

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
        // console.log('courseId', this.state.courseId);
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
        console.log("course ->", this.state.courseName);
        console.log("userId -> ", this.state.userId);
        console.log("name -> ", this.state.name);
        console.log("tel -> ", this.state.tel);
        console.log("email -> ", this.state.email);
        console.log(this.state);

        liff.sendMessages([
            {
                type: 'text',
                text: "ลงทะเบียน " + this.state.courseName + " สำเร็จ"
            }
        ])
            .then(() => {
                console.log('message sent');

            })
            .catch((err) => {
                console.log('error', err);
            });

        axios
            .post("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/courseId/users", {
                courseName: this.state.courseName,
                userId: this.state.userId,
                name: this.state.name,
                tel: this.state.tel,
                email: this.state.email
            })
            .then(response => {
                console.log("response: ", response)
                // do something about response
            })
            .catch(err => {
                console.error(err)
            })



        this.props.history.push("/success/" + this.state.courseName)


    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { courses } = this.state;
        const courseId = this.state.courseId;
        return (
            <div>
                <BannerTop message="Register" />
                {/* <SuccessPage courseName={this.state.courseName} /> */}
                <div className="container mw-25">
                    {/* {courses}
                    {courses.map((course) => {
                        if (courses.id === courseId) {
                            {

                            }

                            // this.setState({ courseName: course.data.courseName })

                            // <div><h2>{course.id}</h2> <h2>{course.data.courseName}</h2> 
                            // </div>
                        }
                    })} */}

                    {console.log(this.state.courseName)}
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <div className="form-group">
                            <div className="text-left">
                                <label >Course</label>
                            </div>

                            <select
                                className="custom-select  mb-3"
                                name="courseName" required
                                onChange={this.handlerChange}>
                                <option value="" selected disabled>Please select</option>,

                                    {courses.map((course) => (
                                    <option value={course.data.courseName} key={course.id}>{course.data.courseName}</option>
                                ))}
                            </select>


                            {/* /* แก้ select ตาม css*/}

                        </div>
                        <div className="form-group">
                            <div className="text-left">
                                <label >Name</label>
                            </div>

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
                        <div type="hidden">
                            {/* {(this.state.userId && this.state.userId != '')?<p>LineID: {this.state.userId}</p>:null} */}
                            <input required
                                name="userId"
                                type="hidden"
                                onLoad
                                className="form-control"
                                value={this.state.userId}
                            />
                        </div>
                        <div className="form-group">
                            <div className="text-left">
                                <label >Email address </label>
                            </div>
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
                            <div className="text-left">
                                <label>Phone</label>
                            </div>

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


                        <div className="form-check mb-4 text-left">
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
                            <input type="submit" value="Submit" />
                        </div>
                        <div>
                            <input type="button" onClick={this.closeApp} value="Close" />


                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default withRouter(RegisFormAllCourses)