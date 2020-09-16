import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisFormAllCourses from './RegisFormAllCourses';

const liff = window.liff;
class SuccessPage extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             courses: [],
//             userId: '',
//             name: '',
//             tel: '',
//             email: '',
//             timestamp: '',
//         };
//         this.initialize = this.initialize.bind(this);
//         this.closeApp = this.closeApp.bind(this);
        
//         }

// comment = {
//     data: {
//         name: <RegisFormAllCourses name={this.state}/>

//     },
// };

    // }

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
                <h1>Register Success !</h1>
                Thank you: {this.props.name}
                <button onClick={this.closeApp} className="btn btn-warning">
                    Close
            </button>
            </div>



        )
    }
}

export default SuccessPage