import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisFormAllCourses from './RegisFormAllCourses';
import liff from "@line/liff";
import './custom.css';
import BannerTop from './BannerTop';
import Modal from 'react-modal'
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

    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }


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
                        <input type="text"></input>
                    </div>
                    {/* test Modal */}
                    <div>
                        <a class="text-decoration-none" onClick={this.handleOpenModal}>Trigger Modal</a>
                        <Modal
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                            style={{ top: "80px" }}
                        >
                            <div>
                                test test test TERM HERE
                    </div>

                            <div>
                                <input type="button" onClick={this.handleCloseModal} value="Close Modal" />
                            </div>

                        </Modal>
                    </div>
                </div>




            </div>

        )
    }
}

export default withRouter(SuccessPage)
