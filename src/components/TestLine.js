import React, { Component } from 'react';
// import './style.css';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import liff from "@line/liff";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { event } from 'jquery';
//const liff = window.liff;

class TestLine extends Component {

    constructor(props) {
        super(props);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.state = {
            courses: [],
            userId: '',
            name: '',
            tel: '',
            email: '',
            timestamp: ''
        };
        // this.initialize = this.initialize.bind(this);

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

    showProfile() {
        liff.getProfile()
    }

    componentDidMount() {


        liff.init({ liffId: '1654421462-oal2PRL7' })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();

                }
            })
            .catch((err) => {
                console.log(err)
            });


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

        // this.setState({
        //     languageDevice: languageDevice,
        //     versionSDK: versionSDK,
        //     client: (client === true) ? 'YES' : 'NO',
        //     isLogin: (isLogin === true) ? 'Login' : 'Not Login',
        //     os: os
        // });
    }


    // closeApp(event) {
    //     event.preventDefault();
    //     liff.sendMessages([{
    //         type: 'text',
    //         text: "Cancel Register"
    //     }]).then(() => {
    //         liff.closeWindow();
    //     });
    // }

    handlerSubmit(event) {

        event.preventDefault();

        const data = new FormData(event.target)
        const timestamp = new Date();

        var formattedTimestamp = Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        }).format(timestamp);

        // this.setState({
        //     userId: userId,
        //     languageDevice: languageDevice,
        //     versionSDK: versionSDK,
        //     client: (client === true) ? 'YES' : 'NO',
        //     isLogin: (isLogin === true) ? 'Login' : 'Not Login',
        //     os: os
        // });
        console.log(this.state);

        fetch('https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses/users/', {
            method: 'POST',
            body: JSON.stringify({
                courseName: this.state.courseName,
                userId: this.state.userId,
                name: this.state.name,
                tel: this.state.tel,
                email: this.state.email,
                timestamp: formattedTimestamp
            }),
        });

        this.props.history.push("/success")


    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { courses, userId } = this.state;

        // const userLineID = this.dataInfo.userId;
        return (
            <div className="App">
                {/* <header className="App-header"> */}

                <div className="support">
                    {
                        (this.state.pictureUrl && this.state.pictureUrl != '')
                            ?
                            <img width="25%" src={this.state.pictureUrl} />
                            :
                            null
                    }

                    {
                        (this.state.name && this.state.name != '')
                            ?
                            <p>Name: {this.state.name}</p>
                            :
                            null
                    }
                    {
                        (this.state.userLineID && this.state.userLineID != '')
                            ?
                            <p>LineID: {this.state.userLineID}</p>
                            :
                            null
                    }
                    {
                        (this.state.statusMessage && this.state.statusMessage != '')
                            ?
                            <p>statusMessage: {this.state.statusMessage}</p>
                            :
                            null
                    }
                    {
                        (this.state.languageDevice && this.state.languageDevice != '')
                            ?
                            <p>languageDevice: {this.state.languageDevice}</p>
                            :
                            null
                    }
                    {
                        (this.state.versionSDK && this.state.versionSDK != '')
                            ?
                            <p>versionSDK: {this.state.versionSDK}</p>
                            :
                            null
                    }
                    {
                        (this.state.client && this.state.client != '')
                            ?
                            <p>client: {this.state.client}</p>
                            :
                            null
                    }
                    {
                        (this.state.isLogin && this.state.isLogin != '')
                            ?
                            <p>isLogin: {this.state.isLogin}</p>
                            :
                            null
                    }
                    {
                        (this.state.os && this.state.os != '')
                            ?
                            <p>os: {this.state.os}</p>
                            :
                            null
                    }

                </div>
                {/* <div className="support">
                    <button variant="contained" onClick={this.getProfile.bind(this)} style={{ marginRight: '20px' }} color="primary">
                        Getdata INFO
            </button>
                </div> */}
                {/* </header> */}

                {/* <body> */}

                <h2 className="my-4 text-center">Register</h2>
                <form onSubmit={this.handlerSubmit} >
                    <div className="form-group">
                        <label >Name</label>
                        <input required
                            name="name"
                            type="text"
                            // value={name}
                            className="form-control"
                            placeholder="Enter name"
                            onChange={this.handlerChange}
                        />
                    </div>
                    <div className="form-group" >
                        <label >LineID</label>
                        <input required
                            name="userId"
                            type="text hidden"
                            onLoad
                            className="form-control"
                            value={this.getProfile.userId}
                        // onChange={this.handlerChange}
                        />
                    </div>
                    <div>
                        <label>Time</label>
                        <input required
                            name="timestamp"
                            type="text"
                            value={this.state.formattedTimestamp}
                            onChange={this.handlerChange}
                        />
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            // value={email}
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
                            // value={tel}
                            placeholder="0123456789"
                            pattern="[0-9]{10}"
                            required
                            onChange={this.handlerChange}
                        />
                    </div>
                    <div className="form-group">
                        <label >Course</label>
                        <select name="courseName"
                            required onChange={this.handlerChange}>
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

                            name="check"
                            required
                        />
                        <label className="form-check-label">
                            Accept term and conditions
              </label>
                    </div>


                    <div>
                        {/* <Link to="/success" className="btn btn-primary" type="submit">Sign up</Link> */}
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
                {/* </body> */}

            </div>
        );
    }
}

export default withRouter(TestLine)