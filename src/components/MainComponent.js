import React, { Component } from 'react';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Employee from './EmployeeComponent.js';
import EmployeeDetail from './EmployeeDetailComponent.js';
import SalaryEmployee from './SalaryComponent.js'
import Department from './DepartmentComponent.js'
import { STAFFS, DEPARTMENTS } from '../shared/staffs';

import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,

        };
    }

    render() {
        const EmployeePage = () => {
            return (
                <Employee staffs={this.state.staffs} departments={this.state.departments} parentCallbackEmployeeForm={callbackEmployeeForm} />
            );

        }
        const DepartmentsPage = () => {
            return (
                <Department departments={this.state.departments} />
            );
        }
        const StaffWithId = ({ match }) => {
            return (


                <EmployeeDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]} />
            )
        }
        const SalaryPage = () => {
            return (
                <SalaryEmployee staffs={this.state.staffs} />
            );

        }
        let fid;
        const callbackEmployeeForm = (newStaff) => {
            const [findDepart] = this.state.departments.filter((depart) => (depart.name === newStaff.department));
            findID();
            const staff = {
                id: fid,
                name: newStaff.name,
                doB: newStaff.doB,
                salaryScale: newStaff.salaryScale,
                startDate: newStaff.startDate,
                department: findDepart,
                annualLeave: newStaff.annualLeave,
                overTime: newStaff.overTime,
                image: '/assets/images/alberto.png'

            }
            this.state.staffs.push(staff);
        }
        const findID = () => {
            do {
                fid = Math.floor(Math.random(Date.now()) * 200);
            } while (this.state.staffs.filter((staff) => staff.id === fid).length != 0)
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/staffs/:staffId" component={StaffWithId} />
                    <Route path="/staffs" component={EmployeePage} />
                    <Route
                        exact path="/department" component={DepartmentsPage}
                    />
                    <Route path="/salary" component={SalaryPage} />
                    <Redirect to="/staffs" />

                </Switch >
                <Footer />
            </div >
        );
    }
}


export default Main;
