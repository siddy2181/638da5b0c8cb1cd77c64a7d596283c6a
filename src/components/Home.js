import React, {Component} from 'react';
import NewServiceRequest from './NewServiceRequest';
import {OverlayTrigger, Button, Tooltip, Panel} from 'react-bootstrap';
import DisplayPosition from './DisplayPosition';
import moment from 'moment';

const Alert = require('react-bootstrap').Alert;
const rp = require('request-promise');


/* global $*/
class Home extends Component{

    /**
     *
     * @param props
     */
    constructor(props) {

        super(props);
        this.state = {
            displayForm: false,
            displayWaitTime: false,
            waitTime: 0,
            displaySuccess: false,
            displayError: false,
            message: '',
            displayStatus: false
        };
        this.showForm = this.showForm.bind(this);
        this.showStatus = this.showStatus.bind(this);
        this.checkWaitTime=this.checkWaitTime.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }


    showForm()
    {
        this.setState({ displayForm: true });
    }

    showStatus() {
        this.setState({displayStatus: true});
    }
    checkWaitTime()
    {
        var op = {
            uri: 'http://104.211.31.153/wait-time/'+new Date().toISOString(),
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Request-Promise',
            },
            json: true // Automatically parses the JSON string in the response
        };
        rp(op)
            .then(response =>
                this.setState({waitTime: response.averageTimeInQueueSeconds, displayWaitTime: true})
            )
            .catch(function (err) {
                // API call failed...
            });
    }


    handleDismiss() {
        this.setState({displayError: false, displaySuccess: false, message: ''});
    }

    /**
     *
     * @param status
     * @param msg
     */
    displayMessage(status, msg) {
        if (status === "error") {
            this.setState({displayError: true, displaySuccess: false, message: msg});
        }
        else if (status === "success") {
            this.setState({displaySuccess: true, displayError: false, message: msg});
        }
        else {
            this.setState({displayError: false, displaySuccess: false, message: ''});
        }
    }

    render(){
        const DisplayWaitTime=()=>
        {
            return <div><br/>
                <hr/>
                <h3>{moment().startOf('day')
                    .seconds(this.state.waitTime)
                    .format('HH:mm:ss')} </h3></div>;
        }
        const tooltip = (
            <Tooltip id="tooltip">
                Click to add new Work Order
            </Tooltip>
        );
        const waitTimeTooltip=(
            <Tooltip id="waitTimeTooltip">
                Click to check average wait time
            </Tooltip>
        );
        const positionTooltip = (
            <Tooltip id="tooltip">
                Click to check work order status
            </Tooltip>
        );
        return(
            <div className="row">
                <div className="row">
                    <Alert bsStyle="warning" style={{display: this.state.displayError ? 'block' : 'none'}}
                           onDismiss={this.handleDismiss}>
                        <h4>Error</h4>
                        <p>{this.state.message}</p>
                    </Alert>

                    <Alert bsStyle="success" style={{display: this.state.displaySuccess ? 'block' : 'none'}}
                           onDismiss={this.handleDismiss}>
                        <h4>Added</h4>
                        <p>{this.state.message}</p>
                    </Alert>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Panel>
                            <Panel.Heading>Work Orders</Panel.Heading>
                            <Panel.Body>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <Button id="AddServiceRequest" onClick={this.showForm} bsStyle="primary">Add Service
                                        Request</Button>
                                </OverlayTrigger>
                                {this.state.displayForm ?
                                    <NewServiceRequest messageUpdate={this.displayMessage}/> : null}
                            </Panel.Body>
                        </Panel>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Panel>
                            <Panel.Heading>Check Wait Time</Panel.Heading>
                            <Panel.Body>
                                <OverlayTrigger placement="right" overlay={waitTimeTooltip}>
                                    <Button id="CheckWaitTimeBtn" onClick={this.checkWaitTime} bsStyle="primary">Get
                                        average wait time</Button>
                                </OverlayTrigger>
                                {this.state.displayWaitTime ? <DisplayWaitTime/> : null}
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Panel>
                            <Panel.Heading>Check the position of your work order</Panel.Heading>
                            <Panel.Body>
                                <OverlayTrigger placement="right" overlay={positionTooltip}>
                                    <Button id="WorkOrderStatusBtn" onClick={this.showStatus} bsStyle="primary">Work
                                        Order Status</Button>
                                </OverlayTrigger>
                                {this.state.displayStatus ?
                                    <DisplayPosition messageUpdate={this.displayMessage}/> : null}
                            </Panel.Body>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home