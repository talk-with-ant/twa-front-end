import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import liff from "@line/liff";
import BannerTop from "./compo-banner";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./custom.css";
import "moment-timezone";
import TermsModal from './compo-terms-modal';
import { Form } from "react-bootstrap";

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
            file: null,
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
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    componentDidMount() {
        liff
            .init({ liffId: "1654378227-YyWNaWKe" })
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
            .get("https://talk-with-ant-qv5fvdpzmq-de.a.run.app/api/courses")
            .then((res) => {
                this.setState({ courses: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendMessageFunction(event) {
        event.preventDefault();
        liff
            .sendMessages([
                {
                    type: "text",
                    text: "ยกเลิกสร้างคอส",
                },
            ])
            ;
    }

    closeApp(event) {
        event.preventDefault();
        liff
            .sendMessages([
                {
                    type: "text",
                    text: "ยกเลิกสร้างคอส",
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
        // new Intl.DateTimeFormat("en-GB", {
        //     year: "numeric",
        //     month: "numeric",
        //     day: "2-digit"
        // }).format(this.state.date)
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


        liff.sendMessages([
            {
                type: "text",
                text: "ลงทะเบียนจัดอบรมเสร็จสิ้นด้วยชื่อ " + this.state.courseName
            },
        ])
            .then(() => {
                console.log("message sent");
            })
            .catch((err) => {
                console.log("error", err);
            });

        axios
            .post("https://talk-with-ant-qv5fvdpzmq-de.a.run.app/api/courses",
                data,
            )
            .then((response) => {
                console.log("response: ", response);
                // do something about response
            })
            .catch((err) => {
                console.error(err);
            });


        this.props.history.push("/successAddCourse/" + this.state.courseName)
    }


    numChange = (e) => {
        //replace non-digits with blank
        const value = e.target.value.replace(/[^\d]/, "");

        if (parseInt(value) > 0) {
            this.setState({ [e.target.name]: e.target.value });
        } else {
            window.alert("sometext");
            return;
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
                <BannerTop message="สร้างงานอบรม" />
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
                                    required
                                    // pattern="([A-z0-9À-ž\s]){2,}"
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div type="hidden">
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
                                    placeholder=""
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
                                    placeholder=""
                                    required
                                    min="0"

                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>คำอธิบาย</label>
                                </div>
                                <textarea
                                    name="description"
                                    type="textarea"
                                    className="form-control"
                                    id="description"
                                    placeholder=""
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>ชื่อวิทยากร</label>
                                </div>
                                <input
                                    name="trainerName"
                                    type="text"
                                    className="form-control"
                                    id="trainerName"
                                    placeholder=""
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
                                    placeholder=""
                                    required
                                    min="1"
                                    max="100"
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <div >
                                    <label>รูปภาพปกงานอบรม</label>
                                </div>
                                <div>
                                    <input
                                        name="img"
                                        type="file"
                                        id="img"
                                        required
                                        onChange={this.handleImgChange}
                                    />
                                    <img src={this.state.file} width="330" />
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
                                ยืนยัน <TermsModal />
                            </div>
                            <div>
                                <input type="submit" value="ยืนยัน" />
                            </div>
                            <div>
                                <input type="button" onClick={liff.closeApp} value="ปิด" />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default withRouter(OwnerAddCourse);
