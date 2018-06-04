import React,{Component} from 'react'
import NewServiceRequest from './NewServiceRequest';
import {OverlayTrigger,Button,Tooltip,Panel,PanelBody} from 'react-bootstrap';


var rp = require('request-promise');
/* global $*/
class Home extends Component{
    constructor(props) {
        
        super(props);
        this.state = { displayForm:false, displayWaitTime:false,waitTime:0 };
        this.showForm = this.showForm.bind(this);
        this.checkWaitTime=this.checkWaitTime.bind(this);
        //this.DisplayWaitTime=this.DisplayWaitTime.bind(this);
    }
    showForm()
    {
        this.setState({ displayForm: true });
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
        .then(response=>
            this.setState({ waitTime: response.averageTimeInQueueSeconds,displayWaitTime:true })
        )
        .catch(function (err) {
            // API call failed...
        });
    }
    
    render(){
        const DisplayWaitTime=()=>
        {
            return <div><br/><hr/><h3>{this.state.waitTime} seconds</h3></div>;
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
                Click to add new Work Order
            </Tooltip>
        );
        
        return(
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Panel>
                    <Panel.Heading>Work Orders</Panel.Heading>
                    <Panel.Body>
                        <OverlayTrigger placement="right" overlay={tooltip}>
                            <Button id="AddServiceRequest" onClick={this.showForm} bsStyle="primary">Add Service Request</Button>
                        </OverlayTrigger>
                        { this.state.displayForm ? <NewServiceRequest /> : null }
                    </Panel.Body>
                  </Panel>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Panel>
                        <Panel.Heading>Check Wait Time</Panel.Heading>
                        <Panel.Body>
                            <OverlayTrigger placement="right" overlay={waitTimeTooltip}>
                                <Button id="CheckWaitTimeBtn" onClick={this.checkWaitTime} bsStyle="primary">Get average wait time</Button>
                            </OverlayTrigger>
                            { this.state.displayWaitTime ?  <DisplayWaitTime/> : null }
                        </Panel.Body>
                    </Panel>
                </div>

                
            </div>


        );
    }
}

export default Home