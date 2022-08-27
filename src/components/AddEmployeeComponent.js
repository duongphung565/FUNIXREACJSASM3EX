import React, { Component } from 'react'
import Modal from './Modal.js';
class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.newStaff = {
            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: '',
            annualLeave: '',
            overTime: '',
            salary: '',
            image: '/assets/images/alberto.png',

        }
    }
    render() {
        return (<Modal>
            <div>
                Hello
            </div>
        </Modal>
        )
    }

}
export default AddEmployee;