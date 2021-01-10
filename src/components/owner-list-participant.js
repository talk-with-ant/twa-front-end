import React, { Component, useState, useEffect, setIsOpen, isOpen } from 'react';
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import liff from "@line/liff";
import BannerTop from './compo-banner';
import { data } from 'jquery';

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
            selection: 'รายชื่อ',
            active: [],


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
            .init({ liffId: "1655424277-LlqGOZJG" })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }

            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                // liff.closeWindow();
            });

        axios
            .get(`https://talk-with-ant-qv5fvdpzmq-de.a.run.app/api/owner/${id}/users`)
            .then((res) => {
                this.setState({ users: res.data.users, courseName: res.data.courseName, checkAttend: res.data.checkAttend });

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

    toggleContent = (event) => {
        let activeItem = [...this.state.active]
        let active = activeItem.map((val, index) => {
            return (val = false);
        });
        active[event.target.value] = true;
        this.setState({
            selection: event.target.value,
            active
        })
    }

    switchContent = (value) => {
        const { users, selection } = this.state;
        let count = 0;
        let status = "";
        let checkStatus = "";
        let countCheckStatus = 0;
        users.map((user) => {
            if (user.status === "paid") {
                count++;
            }

            if (user.checkAttend === true) {
                countCheckStatus++;
            }
        }
        )


        switch (value) {
            case 'รายชื่อ':
                if (users.length === 0) {
                    return <div className="form-group">
                        <label
                            style={{
                                marginTop: "5px",
                            }}
                        >ยังไม่มีผู้เข้าร่วม</label>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ชื่อ</th>
                                    <th scope="col">สถานะจ่ายเงิน</th>
                                </tr>
                            </thead>

                        </table>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />
                    </div>;
                } else {
                    return <div>

                        <div className="form-group">
                            <label className="text-left"
                                style={{
                                    marginTop: "5px",
                                    width: "50%"
                                }}
                            >
                                ผู้เข้าร่วมทั้งหมด {users.length} คน
                                        </label>
                            <label className="text-right"
                                style={{
                                    marginTop: "5px",
                                    width: "50%"
                                }}>
                                ผู้ที่ชำระเงิน {count}/{users.length} คน
                                        </label>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ชื่อ</th>
                                        <th scope="col">สถานะจ่ายเงิน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) =>
                                        <tr>
                                            <th scope="row">{users.indexOf(user) + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.status ? "จ่ายแล้ว" : "ยังไม่จ่าย"}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <input type="button" onClick={liff.closeWindow} value="ปิด" />
                        </div>
                    </div>;
                }

            case 'เช็คชื่อ':

                if (this.state.checkAttend === false) {
                    return <div className="form-group">
                        <label
                            style={{
                                marginTop: "5px"
                            }}
                        >ยังไม่ได้ทำการเช็คชื่อ</label>
                        <table class="table table-hover">
                            <thead>
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">ชื่อ</th>
                                    <th scope="col">สถานะเช็คชื่อ</th>
                                </tr>
                            </thead>
                        </table>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />
                    </div>;

                } else {
                    return <div className="form-group">
                        <label
                            style={{
                                marginTop: "5px"
                            }}
                        >จำนวนคนเช็คชื่อ {countCheckStatus}/{users.length} คน</label>
                        <table class="table table-hover">
                            <thead>
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">ชื่อ</th>
                                    <th scope="col">สถานะเช็คชื่อ</th>
                                </tr>
                            </thead>
                            <tbody>

                                {users.map((user) =>
                                    <tr>
                                        <th scope="row">{users.indexOf(user) + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.checkAttend === true ? "เช็คชื่อแล้ว" : "ยังไม่เช็ค"}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />
                    </div>;
                }
            default:
                return null;
        }
    }


    render() {
        const { users, selection } = this.state;
        // const tableColor = "";
        // if (users.map(user => user.checkAttend) == true) {
        //     tableColor = "table-primary";
        // } else {
        //     tableColor = "table-warning"
        // }
        return (
            <div>
                <BannerTop message="รายชื่อผู้เข้าร่วมอบรม" />
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <h2>{this.state.courseName}</h2>

                        <div>
                            <input
                                className={this.state.active['รายชื่อ'] ? 'active' : null}
                                type="button" value="รายชื่อ"
                                onClick={(event) => this.toggleContent(event)}
                                style={{
                                    width: "49%",
                                    marginRight: "1%"

                                }}
                                autoFocus
                            />
                            <input type="button"
                                value="เช็คชื่อ"
                                onClick={(e) => this.toggleContent(e)}
                                style={{
                                    width: "49%",
                                    marginleft: "1%"
                                }}
                            />
                            {this.switchContent(selection)}

                        </div>
                    </form>
                </div>
            </div>

        );
    }

}
export default withRouter(ListParticipant);