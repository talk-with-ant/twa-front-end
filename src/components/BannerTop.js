import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { responsiveFontSizes } from '@material-ui/core';


class BannerTop extends React.Component {

    render() {
        return (

            <nav className="navbar navbar-default sticky-top"
                style={{

                    height: "60px",
                    backgroundColor: "#FF783E",
                    fontFamily: "Roboto"
                }}>
                <label className="text-center"
                    style={{
                        // fontFamily: "Roboto",
                        fontSize: "20px",
                        margin: "auto",
                        color: "white"
                    }}>{this.props.message}</label></nav>
        )
    }

}
export default BannerTop;