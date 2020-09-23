import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisFormAllCourses from './RegisFormAllCourses';
import liff from "@line/liff";
// import './RegisFormAllCourses.css';

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
            <div className="container center">
                <div className="row mt-4">
                    <div className="col-12 col-md-6 offset-md-3">
                        <h1>Register Success !</h1>
                             Thank you: {this.props.name}
                        <div>
                            <input type="button-primary" onClick={this.closeLIFF.bind(this)} value="Close" />
                        </div>
                    </div>
                </div>


            </div>



        )
    }
}

export default SuccessPage
