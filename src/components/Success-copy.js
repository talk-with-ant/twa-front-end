import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// import RegisFormAllCourses from './RegisFormAllCourses'
// import RegisFormAllCourses from '/RegisFormAllCourses';

const liff = window.liff;
class SuccessPage extends React.Component {

    closeApp(event) {
        event.preventDefault();
        liff.sendMessages([{
            type: 'text',
            text: "Register Success"
        }]).then(() => {
            liff.closeWindow();
        });
    }


    // handleSumbit(event){


    //     this.props.closeWindows;
    // }

    render() {
        return (
            <div>
                <h1>Register Success !
            </h1>
                <button onClick={this.closeApp} className="btn btn-warning">
                    Close
            </button>
            </div>



        )
    }
}

export default SuccessPage