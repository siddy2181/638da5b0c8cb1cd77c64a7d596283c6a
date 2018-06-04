import React, { Component } from 'react';
import {Form,FormControl,FormGroup,Button} from 'react-bootstrap';
import makeRequest from "../api/makeRequest";

/* global $*/
var bigInt=require('big-integer');

class DisplayPosition extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.validateWorkOrder=this.validateWorkOrder.bind(this);
        this.state = {
            workRequestNumber: ' ',
            positionNumber: ' '
        };
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
            return false;
        }
    }
    getValidationState(e) {
        if(this.state.workRequestNumber==null)
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

        this.setState({ workRequestNumber: e.target.value });
    }

    getDisplayPosition(id){
        // console.log(id)
        let self = this;
        makeRequest("http://104.211.31.153/ids/" + id, 'GET')
            .then(function (result) {
                self.setState({WorkOrders : result})
            })
            .catch(function (err) {
                console.log(err)
            });
    }


    handleSubmit = event => {
        event.preventDefault();


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
            .then((parsedBody)=> {
                // POST succeeded...
            })
            .catch(function (err) {
                // POST failed...
            });
    }
    render() {
        const DisplayIdPosition=()=>
        {
            return <div><br/><hr/><h3>The position of your Work Order is: {this.state.positionNumber} </h3></div>;
        }

        return (
            <div>
                <br/><hr/>
                <Form inline onSubmit={this.getIdPosition(this.state.workRequestNumber)}>
                    <FormGroup id="workNumberGroup" controlId="formInlineName" validationState={this.getValidationState()}>
                        <FormControl type="text" placeholder="Work Request Number" value={this.state.workRequestNumber} onChange={this.handleChange}/>
                        <FormControl.Feedback />
                    </FormGroup>{' '}
                    {console.log(this.props.validationState)}
                    <Button bsStyle="primary" disabled={!this.validateWorkOrder()} type="submit">Check Position</Button>
                </Form>
            </div>
        );
    }
}

export default DisplayPosition;