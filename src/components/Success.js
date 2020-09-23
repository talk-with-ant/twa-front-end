import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisFormAllCourses from './RegisFormAllCourses';
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';

class SuccessPage extends React.Component {


    closeLIFF() {
        liff.closeWindow();
    }
    closeApp(event) {
        event.preventDefault();
        liff.sendMessages([{
            type: 'text',
            text: "Register Success"
        }]).then(() => {

            liff.closeWindow();
        });
    }


    render() {
        return (
            <div>
                <BannerTop message="Success" />
                <div className="container mw-25">
                    <h1>Register Success !</h1>
                             Thank you: {this.props.name}
                        <div>
                            <input type="button" onClick={this.closeLIFF.bind(this)} value="Close" />
                        </div>
                </div>
                        
                 </div>



        )
    }
}

export default SuccessPage
