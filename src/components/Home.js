import React, {Component} from 'react';
import NewServiceRequest from './NewServiceRequest';
import {OverlayTrigger, Button, Tooltip, Panel,Collapse} from 'react-bootstrap';
import DisplayPosition from './DisplayPosition';
import moment from 'moment';
import makeRequest from '../api/makeRequest'

const Alert = require('react-bootstrap').Alert;

        /* global */

        /**
         * This component will provide the functionality to Add new work request order,
         * check average waiting time and status of given work request order
         */
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
                this.setState({ displayForm: !this.state.displayForm });
            }

            showStatus() {


                this.setState({displayStatus: !this.state.displayStatus});
            }

            /**
             * This function will call the api method to retrieve
             * average wait time for the work request orders
             */
            checkWaitTime()
            {
                makeRequest("/wait-time/"+new Date().toISOString(), "GET")
                    .then(response =>
                        this.setState({waitTime: response.averageTimeInQueueSeconds, displayWaitTime: !this.state.displayWaitTime})
                    )
                    .catch(function (err) {
                        console.log(err);
                        // API call failed...
                    });
            }



            handleDismiss() {
                this.setState({displayError: false, displaySuccess: false, message: ''});
            }



            /**
             * Method: This method will be called from child components
             * to display respective success/error notification
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
                    this.setState({displayError: false, displaySuccess: false, message: ' '});
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

                                        <Collapse in={this.state.displayForm}>
                                            <div>
                                                {this.state.displayForm ?
                                                    <NewServiceRequest messageUpdate={this.displayMessage}/> : null}
                                            </div>
                                        </Collapse>

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

                                        <Collapse in={this.state.displayWaitTime}>
                                            <div>
                                                {this.state.displayWaitTime ? <DisplayWaitTime/> : null}
                                            </div>
                                        </Collapse>

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
                                        <Collapse in={this.state.displayStatus}>
                                            <div>
                                                {this.state.displayStatus ?
                                                    <DisplayPosition messageUpdate={this.displayMessage}/> : null}
                                            </div>

                                        </Collapse>
                                    </Panel.Body>
                                </Panel>
                            </div>
                        </div>
                    </div>
                );
            }
        }

export default Home