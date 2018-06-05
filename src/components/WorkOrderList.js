import React, {Component} from 'react'
import {Table,Button,Alert} from 'react-bootstrap'
import WorkOrder from './WorkOrder'
import makeRequest from "../api/makeRequest"


class WorkOrderList extends Component {
    constructor(){
        super();
        this.state = {
            WorkOrders : [],
            displayMessage:true
        }
    }

    /**
     * Displays All workorders when the component mounts
     */
    componentWillMount(){
        let self = this;
        makeRequest("/ids", "GET")
            .then(function (result) {
                self.setState({WorkOrders : result});
                debugger;
                if(self.state.WorkOrders.length==0)
                    self.setState({displayMessage : true});
                else
                    self.setState({displayMessage : false});
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    /**
     * This function will call the api to fetch all the available work request orders
     */
    getAllOrders(){
        let self = this;
        makeRequest("/ids", "GET")
            .then(function (result) {
                self.setState({WorkOrders : result});
                if(self.state.WorkOrders.length==0)
                    self.setState({displayMessage : true});
                else
                    self.setState({displayMessage : false});
            })
            .catch(function (err) {
                console.log(err)
            });

    }

    /**
     * DELETE Logic
     * @param id
     */
    deleteWorkOrder(id){
        let self = this;
        makeRequest("/ids/" + id, 'DELETE')
            .then(function () {
                let WO = self.state.WorkOrders.filter(function(workOrder){
                    return workOrder.id !== id;
                })
                self.setState({WorkOrders : WO});
                if(self.state.WorkOrders.length==0)
                    self.setState({displayMessage : true});
                else
                    self.setState({displayMessage : false});
            })
            .catch(function (err) {
                console.log(err)
            });
    }



    /**
     *This function will call the api to get the first
     * highest priority work reqeust order and remove it once another action is triggered
     */
    dequeueFirstOrder(){
        let self = this;
        makeRequest("/dequeue", 'GET')
            .then(function (result) {
                let WO = self.state.WorkOrders.filter(function(workOrder){
                    return workOrder.id === result.id;
                })
                self.setState({WorkOrders : WO});
                if(self.state.WorkOrders.length==0)
                    self.setState({displayMessage : true});
                else
                    self.setState({displayMessage : false});
            })
            .catch(function (err) {
                console.log(err)
            });

    }


    render() {
        console.log("render")
        let WorkOrders = this.state.WorkOrders;
        return (
            <div className="row">
                <Alert bsStyle="info" style={{display: this.state.displayMessage ? 'block' : 'none'}}>
                    <h4>Congratulations</h4>
                    <p>You have zero pending work request orders</p>
                </Alert>
                <div className="row" style={{display: !this.state.displayMessage ? 'block' : 'none'}}>
                    <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12" style={{paddingLeft: '0px'}}>
                        <Button bsStyle="primary" onClick={() => this.dequeueFirstOrder()}>
                            Highest priority Work Order
                        </Button>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                        <Button bsStyle="info" onClick={() => this.getAllOrders()}>
                            Display All Work Orders
                        </Button>
                    </div>
                </div>
                <br/>
                <div className="row" style={{display: !this.state.displayMessage ? 'block' : 'none'}}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Time of Creation</th>
                            <th>Work Order Type</th>
                            <th>Done</th>
                        </tr>
                        </thead>
                        <WorkOrder
                            orders={WorkOrders}
                            deleteWorkOrder={this.deleteWorkOrder.bind(this)}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default WorkOrderList;
