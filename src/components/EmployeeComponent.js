import React, { useRef, useState } from 'react'

import {
    Card, CardImg, CardBody,
    CardTitle, Col, Label, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderCard({ staffs, onClick }) {
    return (
        staffs.map((staff) => {
            return (
                <div key={staff.id} className='col-lg-2 col-md-4 col-6'>
                    <Card className={'p-2 m-2'}>
                        <Link to={`/staffs/${staff.id}`}>
                            <CardBody>
                                <CardImg src={staff.image} alt={staff.name} />
                                <CardTitle>{staff.name}</CardTitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div >
            )
        })
    );
}


function Employee(props) {

    const [searchInput, setSearchInput] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isValidate, setValidate] = useState(false);


    const inputEL = useRef();
    const [newStaff, setNewStaff] = useState({
        name: '',
        doB: '',
        salaryScale: '',
        startDate: '',
        department: '',
        annualLeave: '',
        overTime: '',
        salary: '',
        image: '/assets/images/alberto.png',
        touched: {
            name: false,
            doB: false,
            startDate: false,
            department: false,
            annualLeave: false,
            salaryScale: false,
            overTime: false,

        }
    })

    //Kiểm tra gán touched cho sư kiên click vào input
    const handlerBlur = (field) => (evt) => {
        console.log(newStaff.touched.name);
        setNewStaff({
            ...newStaff,
            touched: {
                ...newStaff.touched,
                [field]: true
            }
        })
        console.log(newStaff);

    }
    const validate = (name, doB, startDate) => {
        const errors = {
            name: '',
            salaryScale: '',


        };
        if (newStaff.touched.name && name.length < 3) {
            errors.name = "Yêu cấu lơn hơn 3 ký tự"
        } else if (newStaff.touched.name && name.length > 30)
            errors.name = "Yêu cầu ít hơn 30 ký tự"

        if (newStaff.touched.salaryScale && newStaff.salaryScale < 1 || newStaff.salaryScale > 3)
            errors.salaryScale = "Hệ số từ 1.0 -> 3.0";

        return errors;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setSearchInput(inputEL.current.value);


    }
    const toggleModal = () => {
        setModalOpen(!isModalOpen);

    }
    const checkValidate = () => {
        if (errors.name === '' && errors.salaryScale === '' && newStaff.touched.name && newStaff.touched.salaryScale) {
            console.log("valide" + isValidate);
            return true;
        } else {
            console.log("valide" + isValidate + "errors.name" + errors.name + "errors.salaryScale" + errors.salaryScale + "newStaff.touched.salaryScale" + newStaff.touched.salaryScale + "newStaff.touched.name" + newStaff.touched.name);
            return false;
        }


    }
    const addHandleSubmit = (event) => {
        event.preventDefault();

        if (checkValidate()) {
            //Nếu không chọn phòng ban thì mặc dịnh chọn phòng ban đâu tiên
            if (newStaff.department === '')
                newStaff.department = props.departments[0].name;
            //Callback tra du lieu về main

            props.parentCallbackEmployeeForm(newStaff)
            toggleModal();
            clearForm();

            console.log("adddsubmit");
        }

    }

    const clearForm = () => {

        setNewStaff({

            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: '',
            annualLeave: '',
            overTime: '',
            salary: '',
            image: '/assets/images/alberto.png',

            touched: {
                name: false,
                doB: false,
                startDate: false,
                department: false,
                annualLeave: false,
                salaryScale: false,
                overTime: false,
            }
        })


    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStaff(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    const errors = validate(newStaff.name, newStaff.doB, newStaff.startDate);



    const listSearch = props.staffs.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>

                    <form onSubmit={submitHandler}>
                        <FormGroup row>
                            <Col xs={8} md={4}>
                                <Label>Nhân viên</Label>
                            </Col>

                            <Col xs={4} md={2}>
                                <Button type="submit" onClick={toggleModal} >+</Button>
                            </Col>

                            <Col xs={8} md={4}>
                                <input ref={inputEL}

                                />
                            </Col>
                            <Col xs={4} md={2}>
                                <Button type="submit" color="primary">Tìm</Button>

                            </Col>

                        </FormGroup>
                    </form>
                </div>
            </div>
            <div className='row'>
                <RenderCard staffs={listSearch} />
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} >
                    Thêm Nhân Viên
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={addHandleSubmit}>
                        <FormGroup row>
                            <Label for="name" md={4} >Tên</Label>
                            <Col md={8}>
                                <Input type="text" id="name" name="name"
                                    placeholder="Name"
                                    value={newStaff.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={handlerBlur('name')}
                                    onChange={handleInputChange}
                                />


                                <FormFeedback>
                                    {errors.name}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="doB" md={4} >Ngày sinh</Label>
                            <Col md={8}>
                                <Input type="date" id="doB" name="doB"
                                    placeholder="Ngày Sinh"
                                    value={newStaff.doB}
                                    valid={errors.doB === ''}
                                    invalid={errors.doB !== ''}
                                    onBlur={handlerBlur('doB')}
                                    onChange={handleInputChange}
                                />


                                <FormFeedback>
                                    {errors.doB}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="startDate" md={4} >Ngày vào công ty</Label>
                            <Col md={8}>
                                <Input type="date" id="startDate" name="startDate"

                                    value={newStaff.startDate}
                                    valid={errors.startDate === ''}
                                    invalid={errors.startDate !== ''}
                                    onBlur={handlerBlur('startDate')}
                                    onChange={handleInputChange}
                                />


                                <FormFeedback>
                                    {errors.startDate}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="department" md={4} >Phòng ban</Label>
                            <Col md={8}>
                                <Input type="select" id="department" name="department"

                                    value={newStaff.department}
                                    valid={errors.department === ''}
                                    invalid={errors.department !== ''}
                                    onBlur={handlerBlur('department')}
                                    onChange={handleInputChange}
                                >
                                    {props.departments.map((department, index) => {

                                        return <option key={department.id} id={department.id}>{department.name}</option>
                                    })}


                                </Input>



                                <FormFeedback>
                                    {errors.department}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="salaryScale" md={4} >Hệ số lương</Label>
                            <Col md={8}>
                                <Input type="number" id="salaryScale" name="salaryScale"
                                    placeholder="1.0 -> 3.0"

                                    value={newStaff.salaryScale}
                                    valid={errors.salaryScale === ''}
                                    invalid={errors.salaryScale !== ''}
                                    onBlur={handlerBlur('salaryScale')}
                                    onChange={handleInputChange}
                                />


                                <FormFeedback>
                                    {errors.salaryScale}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="annualLeave" md={4} >Số ngày nghỉ còn lại</Label>
                            <Col md={8}>
                                <Input type="number" id="annualLeave" name="annualLeave"

                                    value={newStaff.annualLeave}
                                    valid={errors.annualLeave === ''}
                                    invalid={errors.annualLeave !== ''}
                                    onBlur={handlerBlur('annualLeave')}
                                    onChange={handleInputChange}
                                />
                                <FormFeedback>
                                    {errors.annualLeave}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="overTime" md={4} >Số ngày đã làm thêm</Label>
                            <Col md={8}>
                                <Input type="number" id="overTime" name="overTime"

                                    value={newStaff.overTime}
                                    valid={errors.overTime === ''}
                                    invalid={errors.overTime !== ''}
                                    onBlur={handlerBlur('overTime')}
                                    onChange={handleInputChange}
                                />


                                <FormFeedback>
                                    {errors.overTime}
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Thêm
                                </Button>
                            </Col>
                        </FormGroup>


                    </Form>
                </ModalBody>
            </Modal>

        </div >
    );
}
export default Employee;

