import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { responsiveFontSizes } from '@material-ui/core';


class BannerTop extends React.Component {

    render() {
        return (
            
            <nav className="navbar navbar-default"
            style={{
                
                height: "60px",
                backgroundColor: "#FF783E", 
                fontFamily: "Roboto"
            }}>
             <p className="text-center"style={{fontFamily: "Roboto",fontSize: "20px",margin: "auto", color: "white"}}>{this.props.message}</p>
            </nav>         
        )
    }

}
export default BannerTop;