import React, { Component, useState, useEffect, setIsOpen, isOpen } from 'react';
import {
    withRouter,
    BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import liff from "@line/liff";
import BannerTop from './BannerTop';
import Modal from 'react-modal'


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
            courseId: '',
            showModal: false
        };
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    componentDidMount() {
        const queryString = decodeURIComponent(window.location.search);
        const params = new URLSearchParams(queryString);
        const id = params.get('courseId');
        this.setState({ courseId: id });
        console.log(this.state.courseId)
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
            });
        axios
            .get("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses")
            .then((res) => {
                this.setState({ courses: res.data });

                res.data.map((course) => {
                    if (id === course.id) {
                        this.setState({ courseName: course.data.courseName })
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
            ;
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
            .post(`https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/${this.state.courseId}/users`, {
                userId: this.state.userId,
                name: this.state.name,
                tel: this.state.tel,
                email: this.state.email
            })
            .then(response => {
                console.log("response: ", response)
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

        const { courses, courseId } = this.state;

        return (
            <div>
                <BannerTop message="Register" />
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <div className="form-group" id="COURSE_NAME">
                            <h1>{this.state.courseName}</h1>
                        </div>
                        <div className="form-group">
                            <div className="text-left">
                                <label >ชื่อ</label>
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
                                <label >อีเมล</label>
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
                                <label>เบอร์โทรศัพท์</label>
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
                            <div>
                                <a class="text-decoration-none" onClick={this.handleOpenModal}>ยอมรับ ข้อตกลงและเงื่อนไข</a>

                                <Modal
                                    isOpen={this.state.showModal}
                                    contentLabel="Minimal Modal Example"
                                    style={{
                                        overlay: {
                                            backgroundColor: "white"
                                        },
                                        content: {
                                            color: 'lightsteelblue'
                                        }
                                    }}
                                    className="Modal container mw-25 border rounded"
                                >
                                    <div>
                                        <h3 class="text-center">ข้อตกลงและเงื่อนไข</h3>
                                        [Demo ข้อตกลงและเงื่อนไข]
                                        <n />
                                        Article 1. Definitions
                                        <n />
                                        The terms used herein shall have the meanings ascribed to them in each of the following items:
                                        <n />
                                        (1) “LINE” means the “LINE” messenger service and any related services operated by the Company.
                                        <n />
                                        (2) “Services” means the “Module Channel” provided by the Company.
                                        <n />
                                        (3) “Customer” means any company or person that uses the Services wishing to place its app on the LINE Marketplace.
                                        <n />
                                        (4) “Users” means the end users who use the Services.
                                        <n />
                                        (5) “Module Channel” means “LINE Developers” which includes information, etc. necessary for the Customers to introduce the Services and other websites separately informed by the Company, as well as the information system for introducing the Services.
                                        <n />
                                        (6) “Development Environment” means the development environment provided by the Company which is necessary for the Customers to introduce the Services.
                                        <n />
                                        (7) “Operator” means the person who operates and manages the Module Channel designated by a Customer.
                                    </div>
                                    <div>
                                        <input type="button" onClick={this.handleCloseModal} value="Close Modal" />
                                    </div>
                                </Modal>
                            </div>
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