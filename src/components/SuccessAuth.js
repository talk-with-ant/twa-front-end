import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';
import { withRouter } from "react-router-dom"

class SuccessAuth extends React.Component {
    render() {

        return (
            <div>
                <BannerTop message="สำเร็จ" />
                <div className="container mw-25">
                    <h2>ยืนยันตัวตนสำเร็จ</h2>
                        ขอขอบคุณสำหรับการยืนยันตัวตน <br />
                        ตอนนี้คุณสามารถใช้งานคำสั่งบอทได้แล้ว
                    <div>
                        <input type="button" onClick={liff.closeWindow} value="ปิด" />

                    </div>
                </div>




            </div>

        )
    }
}

export default withRouter(SuccessAuth)
