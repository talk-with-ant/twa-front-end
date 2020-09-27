import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisFormAllCourses from './RegisFormAllCourses';
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';
import { withRouter } from "react-router-dom"

class SuccessPage extends React.Component {

    // closeApp(event) {
    //     event.preventDefault();
    //     liff.sendMessages([{
    //         type: 'text',
    //         text: "ลงทะเบียน " + this.props.match.params.courseName + " สำเร็จ"
    //     }]).then(() => {

    //         liff.closeWindow();
    //     });
    // }


    render() {
        // console.log(this.props.match.params.courseName)
        return (
            <div>
                <BannerTop message="Success" />
                <div className="container mw-25">
                    <h1>Register Success !</h1>
                             Thank you for enroll {this.props.match.params.courseName} course
                    <div>
                        <input type="button" onClick={liff.closeWindow} value="Close" />
                    </div>
                </div>

            </div>



        )
    }
}

export default withRouter(SuccessPage)
