import React, { Component } from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import makeRequest from "../api/makeRequest.js";

//var rp = require('request-promise');
/* global */
const bigInt = require('big-integer');

class DisplayPosition extends Component {
    handleSubmit = event => {
        event.preventDefault();

        let self = this;
        self.props.messageUpdate("", "");//clear
        makeRequest("/ids/" + this.state.workRequestNumber, 'GET')
            .then(function (result) {

                self.setState({status: result});
                self.setState({workRequestNumber: ''});
            })
            .catch(function (err) {
                self.setState({status: ''});
                self.setState({workRequestNumber: ''});
                self.props.messageUpdate("error", "Status not available for given work order");
            });
    }

    validateWorkOrder()
    {
        try{
            if((bigInt(this.state.workRequestNumber).compare('9223372036854775807')<=0) && (bigInt(this.state.workRequestNumber).compare('0')>0))
            {
                return true;
            }
            else{
                return false;
            }
        }
        catch(e)
        {
            console.exception(e);
            return false;
        }
    }

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateWorkOrder = this.validateWorkOrder.bind(this);

        this.state = {
            workRequestNumber: '',
            status: ''
        };
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({workRequestNumber: e.target.value});
    }

    getValidationState(e) {
        if (this.state.workRequestNumber === '')
            return null;
        if(this.validateWorkOrder())
        {

            return "success";
        }
        else{
            return "error";
        }
    }

    render() {

        return (
            <div>
                <br/><hr/>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup id="workNumberGroup" controlId="formInlineName" validationState={this.getValidationState()}>
                        <FormControl type="text" placeholder="Work Request Number" value={this.state.workRequestNumber} onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>{' '}
                    {console.log(this.props.validationState)}
                    <Button bsStyle="primary" disabled={!this.validateWorkOrder()} type="submit">Check Status</Button>
                </Form>
                <br/>
                <hr/>
                <h3>{this.state.status !== '' ? "ID:" + this.state.status.id + " | Position:" + this.state.status.position : null}</h3>
            </div>
        );
    }
}
export default DisplayPosition;