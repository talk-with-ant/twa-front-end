import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import liff from "@line/liff";
import './custom.css';
import BannerTop from './compo-banner';
import { withRouter } from "react-router-dom"

class SuccessPage extends React.Component {
    render() {

        return (
            <div>
                <BannerTop message="สำเร็จ" />
                <div className="container mw-25">
                    <h2>สมัครงานอบรมสำเร็จ</h2>
                        ขอบคุณที่เข้าร่วมสมัครงานอบรม {this.props.match.params.courseName}
                    <div>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />

                    </div>
                </div>




            </div>

        )
    }
}

export default withRouter(SuccessPage)
