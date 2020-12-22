import React, { Component, useState, useEffect, setIsOpen, isOpen } from 'react';
import {
    withRouter,
    BrowserRouter as Router,
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import liff from "@line/liff";
import BannerTop from './compo-banner';

class ListParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerName: '',
            verifyId: '',
            ownerId: '',
            courseId: '',
            courseName: '',
            users: [],
            name: '',
            status: '',
            checkAttend: '',
        };
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }


    closeApp(event) {
        event.preventDefault();
        liff.sendMessages([{
            type: 'text',
            text: "ยกเลิกการดูผู้เข้าร่วม"
        }]).then(() => {
            liff.closeWindow();
        });
    }

    componentDidMount() {
        const queryString = decodeURIComponent(window.location.search);
        const params = new URLSearchParams(queryString);
        const id = params.get('courseId');
        // this.setState({ courseId: id });
        console.log(this.state.courseId)
        liff
            .init({ liffId: "1654378227-RVWaLWb5" })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
                // Start to use liff's api
                // const lineProfile = liff.getProfile();
                // console.log(lineProfile);
                // const idToken = liff.getIDToken();
                // console.log(idToken);
                // print raw idToken object
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                // liff.closeWindow();
            });
        // const profile = liff.getProfile();
        // let userId;
        // liff.getProfile().then((dataInfo) => {
        //     userId = dataInfo.userId;
        // })

        axios
            .get(`https://talk-with-ant-qv5fvdpzmq-de.a.run.app/api/owner/${id}/users`)
            .then((res) => {
                this.setState({ users: res.data.users, courseName: res.data.courseName });

            })
            .catch((error) => {
                console.log(error);
            })
            ;


    }

    getProfile() {
        liff.getProfile().then((dataInfo) => {
            this.setState({
                ownerId: dataInfo.userId,
            });
        });
    }


    render() {
        const { users } = this.state;

        return (
            <div>
                <BannerTop message="รายชื่อผู้เข้าร่วมอบรม" />
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <h2>{this.state.courseName}</h2>
                        <div className="form-group">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) =>
                                        <tr>
                                            <th scope="row">{users.indexOf(user) + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{String(user.status)}</td>
                                            <td>{String(user.checkAttend)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div>
                                <input type="button" onClick={liff.closeWindow} value="ปิด" />
                            </div>
                        </div>
                    </form>

                </div>

            </div>
            // <div>{this.state.courseName}hi</div>

        );
    }

}
export default withRouter(ListParticipant);