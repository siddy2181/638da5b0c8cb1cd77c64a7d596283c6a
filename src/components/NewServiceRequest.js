import React, { Component } from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';

var rp = require('request-promise');
/* global $*/
var bigInt=require('big-integer');

class NewServiceRequest extends Component {
    handleSubmit = event => {

        event.preventDefault();
        var self = this;
        self.props.messageUpdate("", "");
        var options = {
            method: 'POST',
            uri: 'http://104.211.31.153/enqueue',
            body: {
                id: this.state.workRequestNumber,
                createdTime: new Date().toISOString()
            },
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then(function (parsedBody) {
                self.props.messageUpdate("success", "Successfully added work request");
                self.setState({workRequestNumber: ''});
            })
            .catch(function (err) {
                self.setState({workRequestNumber: ''});
                if (err.statusCode !== undefined) {
                    self.props.messageUpdate("error", err.error.message);
                } else {
                    self.props.messageUpdate("error", "Unknown Error occured please try again");
                }
            });
    }

    constructor(props, context) {
        super(props, context);
        let container;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateWorkOrder = this.validateWorkOrder.bind(this);

        this.state = {
            workRequestNumber: '',
        };
    }

    validateWorkOrder()
    {
        try {
            if ((bigInt(this.state.workRequestNumber).compare('9223372036854775807') <= 0) && (bigInt(this.state.workRequestNumber).compare('0') > 0)) {

                return true;

            }
            else {

                return false;

            }
        }
        catch (e) {
            return false;
        }
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

    handleChange(e) {
        e.preventDefault();

        this.setState({workRequestNumber: e.target.value});
    }

    render() {

        return (
            <div>
                <br/>
                <hr/>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormGroup id="workNumberGroup" controlId="formInlineName"
                               validationState={this.getValidationState()}>
                        <FormControl type="text" placeholder="Work Request Number" value={this.state.workRequestNumber}
                                     onChange={this.handleChange}/>
                        <FormControl.Feedback/>
                    </FormGroup>{' '}
                    {console.log(this.props.validationState)}
                    <Button bsStyle="primary" disabled={!this.validateWorkOrder()} type="submit">Add Work
                        Request</Button>
                </Form>
            </div>
        );
    }
}
export default NewServiceRequest;