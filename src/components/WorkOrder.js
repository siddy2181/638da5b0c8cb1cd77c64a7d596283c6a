import React from 'react'
import {Button} from 'react-bootstrap'

class WorkOrder extends React.Component {
    constructor() {
        super();
        this.workOrderCategory = this.workOrderCategory.bind(this)
    }

    workOrderCategory(workOrderType) {
        if (workOrderType === "MANAGEMENT") {
            return (<span className="label label-danger">{workOrderType}</span>);
        }
        if (workOrderType === "PRIORITY") {
            return (<span className="label label-warning">{workOrderType}</span>);
        }
        if (workOrderType === "NORMAL") {
            return (<span className="label label-default">{workOrderType}</span>);
        }
    }
    render() {

        const WorkOrders = this.props.orders;
        let self = this;
        const workObj = WorkOrders.map((work, i) => {

            return(
                <tr key={i}>
                    <td>{work.id}</td>
                    <td>{work.createdTime}</td>
                    <td>{this.workOrderCategory.call(this, work.workOrderType)}</td>
                    <td>
                        <Button bsStyle="danger" onClick={self.props.deleteWorkOrder.bind(self, work.id)}>
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
