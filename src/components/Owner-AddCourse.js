import React, { Component } from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';
import liff from '@line/liff';
import BannerTop from './BannerTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import './custom.css';
import Moment from 'react-moment';
import 'moment-timezone';

class OwnerAddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            ownerId: '',
            name: '',
            date: '',
            place: '',
            curTime: new Date().toLocaleString(),
        };
        this.closeApp = this.closeApp.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        liff.init({ liffId: "1654987039-3lvl9O4p" })
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

    closeApp(event) {
        event.preventDefault();
        liff.sendMessages([{
            type: 'text',
            text: "Cancel Add Course"
        }]).then(() => {
            liff.closeWindow();
        });

    }



    getProfile() {
        liff.getProfile().then(dataInfo => {
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
        console.log("ownerId ->", this.state.ownerId);
        console.log("name ->", this.state.name);
        console.log("date ->", this.state.date);
        console.log("place ->", this.state.place);

        console.log(this.state)
        liff.sendMessages([
            {
                type: 'text',
                text: "สร้าง อบรม " + this.state.name + " สำเร็จ"
            }
        ])
            .then(() => {
                console.log('message sent');

            })
            .catch((err) => {
                console.log('error', err);
            });

        axios
            .post("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses", {
                ownerId: this.state.ownerId,
                name: this.state.name,
                date: this.state.date,
                place: this.state.place
            })
            .then(response => {
                console.log("response: ", response)
                // do something about response
            })
            .catch(err => {
                console.error(err)
            })

        liff.closeWindow();
    }

    render() {
        const today = new Date('now');
        return (
            <div><BannerTop message="Add Course" />
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <div className="form-group">
                            <div type="hidden">
                                <input required
                                    name="ownerId"
                                    type="hidden"
                                    className="form-control"
                                    value={this.state.ownerId}
                                />
                            </div>
                            <div className="text-left">
                                <label>Course Name</label>
                                <input required
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    id="courseName"
                                    placeholder="Enter course name"
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="text-left" >
                                <label>date</label>
                                <input required
                                    className="form-control"
                                    name="date"
                                    type="date"
                                    placeholder="mm/dd/yyyy"
                                    id="courseDate"
                                    min={this.state.curTime}
                                    onChange={this.handlerChange}
                                />
                                {/* <label>
                                    {this.state.date}
                                </label> */}
                            </div>
                            <div className="text-left">
                                <label>place</label>
                                <input required
                                    className="form-control"
                                    name="place"
                                    type="text"
                                    id="coursePlace"
                                    placeholder="Enter course place"
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div><input type="submit" value="Submit" /> </div>
                            <div><input type="button" onClick={this.closeApp} value="Close" /></div>
                        </div>
                    </form>
                </div>

            </div>


        )
    }


}

export default withRouter(OwnerAddCourse)