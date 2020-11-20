import React, { Component, useState, useEffect, setIsOpen, isOpen } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function TermsModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <a className="text-decoration-none" onClick={handleShow}>
                ข้อตกลงและเงื่อนไข
      </a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{
                        backgroundColor: "#FF783E", justifyContent: "center"
                    }}
                >
                    <Modal.Title style={{
                        color: "white"
                    }}
                    >ข้อตกลงและเงื่อนไข</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST
                    DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST
                    DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO
                    TEST DEMO TEST DEMO TEST DEMO TEST<br />
                    DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST DEMO TEST
                </Modal.Body>
                <Modal.Footer>
                    <input type="submit" value="ปิด" onClick={handleClose} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TermsModal;