import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import liff from "@line/liff";
import BannerTop from "./BannerTop";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./custom.css";
import Moment from "react-moment";
import "moment-timezone";
import Modal from 'react-modal';

class OwnerAddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            courseName: "",
            ownerId: "",
            date: "",
            location: "",
            amount: "",
            description: "",
            trainerName: "",
            maxPar: "",
            value: "",
            img: "",
            curTime: new Date().toLocaleString(),
        };
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.numChange = this.numChange.bind(this);
        this.costChange = this.costChange.bind(this);

        this.fileInput = React.createRef();
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleImgChange(event) {
        this.setState({
            img: event.target.files[0],
        });
    }

    componentDidMount() {
        liff
            .init({ liffId: "1654987039-3lvl9O4p" })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
                // Start to use liff's api
                const lineProfile = liff.getProfile();
                console.log(lineProfile);
                const idToken = liff.getIDToken();
                console.log(idToken);
                // print raw idToken object
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
                // liff.closeWindow();
            });
        axios
            .get("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses")
            .then((res) => {
                this.setState({ courses: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    closeApp(event) {
        event.preventDefault();
        liff
            .sendMessages([
                {
                    type: "text",
                    text: "Cancel Add Course",
                },
            ])
            .then(() => {
                liff.closeWindow();
            });
    }

    getProfile() {
        liff.getProfile().then((dataInfo) => {
            this.setState({
                // name: dataInfo.displayName,
                ownerId: dataInfo.userId,
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
        data.append("img", this.state.file);
        data.append("courseName", this.state.courseName);
        data.append("ownerId", this.state.ownerId);
        data.append("date", this.state.date);
        data.append("location", this.state.location);
        data.append("amount", this.state.amount);
        data.append("description", this.state.description);
        data.append("trainerName", this.state.trainerName);
        data.append("maxPar", this.state.maxPar);
        console.log(this.state);
        liff
            .sendMessages([
                {
                    type: "text",
                    text: "สร้าง อบรม " + this.state.courseName + " สำเร็จ",
                },
            ])
            .then(() => {
                console.log("message sent");
            })
            .catch((err) => {
                console.log("error", err);
            });

        axios
            .post("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses",
                data,
            )
            .then((response) => {
                console.log("response: ", response);
                // do something about response
            })
            .catch((err) => {
                console.error(err);
            });


        liff.closeWindow();
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    numChange = (e) => {
        //replace non-digits with blank
        const value = e.target.value.replace(/[^\d]/, "");

        if (parseInt(value) !== 0) {
            this.setState({ value });
        }
    };

    costChange = (e) => {
        //replace non-digits with blank
        const value = e.target.value.replace(/[^\d]/, "");

        if (parseInt(value) >= 0) {
            this.setState({ value });
        }
    };

    render() {
        const today = new Date("now");
        return (
            <div>
                <BannerTop message="Add Course" />
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <div className="form-group" id="COURSE_NAME">
                            <div className="form-group">
                                <div className="text-left">
                                    <label>ชื่องานอบรม</label>
                                </div>
                                <input
                                    name="courseName"
                                    type="text"
                                    className="form-control"
                                    id="courseName"
                                    placeholder="Enter course name"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div type="hidden">
                                {/* {(this.state.userId && this.state.userId != '')?<p>LineID: {this.state.userId}</p>:null} */}
                                <input
                                    required
                                    name="ownerId"
                                    type="hidden"
                                    onLoad
                                    className="form-control"
                                    value={this.state.ownerId}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>เวลาจัดงาน</label>
                                </div>
                                <input
                                    name="date"
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>สถานที่</label>
                                </div>
                                <input
                                    name="location"
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    placeholder="Enter location"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>ค่าเข้างานอบรม</label>
                                </div>
                                <input
                                    name="amount"
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    placeholder="(บาท)"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>คำอธิบายงานอบรม</label>
                                </div>
                                <textarea
                                    name="description"
                                    type="textarea"
                                    className="form-control"
                                    id="description"
                                    placeholder="อธิบาย.."
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>ชื่อผู้อบรม</label>
                                </div>
                                <input
                                    name="trainerName"
                                    type="text"
                                    className="form-control"
                                    id="trainerName"
                                    placeholder="Enter trainer name"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>จำนวนผู้เข้าร่วมสูงสุด</label>
                                </div>
                                <input
                                    name="maxPar"
                                    type="number"
                                    className="form-control"
                                    id="maxPar"
                                    placeholder="Enter maxinum participants"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <div >
                                    <label>รูปภาพปกงานอบรม</label>
                                </div>
                                <div >
                                    <input
                                        name="img"
                                        type="file"
                                        id="img"
                                        required
                                        onChange={this.handleImgChange}
                                    />
                                </div>

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
                                    <a class="text-decoration-none" onClick={this.handleOpenModal}
                                    >ยืนยัน ข้อตกลงและเงื่อนไข</a>

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
                                            <h3 class="text-center">Terms here</h3>
                                test test test TERM HERE test test test TERM HERE test test test TERM HERE test test test TERM HERE test test test TERM HERE

                                </div>

                                        <div>
                                            <input type="button" onClick={this.handleCloseModal} value="Close Modal" />
                                        </div>

                                    </Modal>

                                </div>
                            </div>
                            <div>
                                <input type="submit" value="Submit" />{" "}
                            </div>
                            <div>
                                <input type="button" onClick={this.closeApp} value="Close" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(OwnerAddCourse);
