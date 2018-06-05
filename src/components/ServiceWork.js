import React,{Component} from 'react'
import WorkOrderList from './WorkOrderList'

/**
 *This component will display all the work request orders and allows the functionality to fetch highest priority work request order
 * @returns {*}
 * @constructor
 */

class ServiceWork extends Component {
    render(){
        return(
            <div>
                <h1>Service Work Page</h1>
                <hr/><br/>
                <WorkOrderList/>
            </div>
        );
    }
}

export default ServiceWork;
