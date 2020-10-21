import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { responsiveFontSizes } from '@material-ui/core';
import { event } from 'jquery';


class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <div className="text-left">
                    <label >{this.props.label}</label>
                </div>

                <input
                    name={this.props.name}
                    type={this.props.type}
                    id={this.props.id}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    required
                    onChange={e => this.setState({ [e.target.name]: e.target.value })}
                />


            </div >
        )
    }

}
export default FormInput;