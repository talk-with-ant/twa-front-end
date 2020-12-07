import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';
import { withRouter } from "react-router-dom"

class SuccessAddCoursePage extends React.Component {
    render() {

        return (
            <div>
                <BannerTop message="สำเร็จ" />
                <div className="container mw-25">
                    <h2>สร้างงานอบรมสำเร็จ</h2>
                        คุณได้สร้างงานอบรม {this.props.match.params.courseName} เรียบร้อยแล้ว
                    <div>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(SuccessAddCoursePage)
