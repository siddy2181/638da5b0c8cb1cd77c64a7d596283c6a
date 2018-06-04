import React from 'react'
import {Button} from 'react-bootstrap'

class WorkOrder extends React.Component {

    render() {

        const WorkOrders = this.props.orders;
        let self = this;
        const workObj = WorkOrders.map(function(work, i){
            return(
                <tr key={i}>
                    <td>{work.id}</td>
                    <td>{work.createdTime}</td>
                    <td>{work.workOrderType}</td>
                    <td>
                        <Button  onClick={self.props.deleteWorkOrder.bind(self,  work.id)}>
                            Delete
                        </Button>
                    </td>

                </tr>
            )
        })
        return (
            <tbody>
                {workObj}
            </tbody>
        );
    }
}
export default WorkOrder;
