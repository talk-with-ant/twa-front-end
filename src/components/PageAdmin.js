import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';
import Card from 'react-bootstrap/Card';
import { withRouter } from "react-router-dom";
import TermsModal from './TermsModal';

class PageAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            variant: "",
            idx: "",
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        // event.preventDefault();


        // const data = new FormData(event.target);
        // data.append("img", this.state.file);
        // data.append("courseName", this.state.courseName);
        // data.append("ownerId", this.state.ownerId);
        // data.append("date", this.state.date);
        // data.append("location", this.state.location);
        // data.append("amount", this.state.amount);
        // data.append("description", this.state.description);
        // data.append("trainerName", this.state.trainerName);
        // data.append("maxPar", this.state.maxPar);
        // console.log(this.state);

        // axios
        //     .post("https://us-central1-antv2-xdbgna.cloudfunctions.net/twaApi/courses",
        //         data,
        //     )
        //     .then((response) => {
        //         console.log("response: ", response);
        //         // do something about response
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });


        // this.props.history.push("/successAddCourse/" + this.state.courseName)
    }
    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const variant = ['Primary',
            'Secondary',
            'Success',
            'Danger',
            'Warning',
            'Info',
            'Light',
            'Dark'];
        const idx = this.state;

        return (
            <div>
                <nav className="navbar navbar-default sticky-top"
                    style={{

                        height: "60px",
                        backgroundColor: "#FF783E",
                    }}>
                    <label className="text-center"
                        style={{
                            fontSize: "20px",
                            margin: "auto",
                            color: "white"
                        }}>Admin Page
                    </label>
                </nav>
                <div className="container mw-25">
                    <form onSubmit={this.handleSubmit} onInput={this.getProfile}>
                        <div className="form-group" id="COURSE_NAME">
                            <div className="form-group">
                                <div className="text-left">
                                    <label>Username</label>
                                </div>
                                <input
                                    name="user"
                                    type="text"
                                    className="form-control"
                                    id="user"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="text-left">
                                    <label>Password</label>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    required
                                    onChange={this.handlerChange}
                                />
                            </div>
                            <div>
                                <input type="submit" value="Login" />{" "}
                            </div>
                            <TermsModal />
                        </div>
                    </form>

                </div>




            </div>

        )
    }
}

export default withRouter(PageAdmin)
