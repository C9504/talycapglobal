import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Offcanvas, Row, Table } from "react-bootstrap";
import { server } from "../../helpers/services/server";
import moment from "moment-timezone";

const Tasks = () => {

    // Estados para mostrar y ocultar los modales
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState('');

    // Estados para las tareas, prioridades y estados
    const [tasks, setTasks] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [status, setStatus] = useState([]);

    // Estados para las validaciones
    const [isValid, setIsValid] = useState(false);
    const [isValidUpdate, setIsValidUpdate] = useState(false);
    const [isValidDelete, setIsValidDelete] = useState(false);

    // Estados para las tareas y actualizaciones de tareas
    const [task, setTask] = useState({ 
        name: '', 
        description: '', 
        beginDate: moment().valueOf(), 
        endDate: moment().valueOf(), 
        status: { id: '' }, 
        priority: { id: '' } 
    });
    const [taskUpdate, setTaskUpdate] = useState({ 
        name: '', 
        description: '', 
        beginDate: moment().valueOf(), 
        endDate: moment().valueOf(), 
        status: { id: '' }, 
        priority: { id: '' } 
    });

    // Funciones para mostrar y ocultar los modales
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) =>  { 
        setId(id);
        setShowDelete(true);
    }

    // El hook useEffect se utiliza para cargar las tareas, prioridades y estados cuando el componente se monta.
    useEffect(() => {
        getTasks();
        getPriorities();
        getStatuses();
    }, []);

    // Estas funciones realizan llamadas GET a la API para obtener las tareas, prioridades y estados.
    const getTasks = async () => {
        await axios.get(`${server()}/tasks`).then((response) => {
            setTasks(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPriorities = async () => {
        await axios.get(`${server()}/priorities`).then((response) => {
            setPriorities(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getStatuses = async () => {
        await axios.get(`${server()}/status`).then((response) => {
            setStatus(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    // Esta función obtiene una tarea específica para su edición.
    const getTask = async (id) => {
        handleShow();
        await axios.get(`${server()}/tasks/${id}`).then((response) => {
            setTaskUpdate(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    // Funciones para Crear, Actualizar y Eliminar Tareas
    //Estas funciones manejan la creación, actualización y eliminación de tareas mediante llamadas a la API.
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${server()}/tasks`, task).then((response) => {
            if (response.status === 404) {
                setIsValid(false);
            } else {
                setIsValid(true);
                getTasks();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        setIsValidUpdate(true);
        await axios.put(`${server()}/tasks/${taskUpdate.id}`, taskUpdate).then((response) => {
            setIsValidUpdate(false);
            handleClose();
            getTasks();
        }).catch((error) => {
            console.log(error);
        });
    }

    const onDelete = async (e) => {
        e.preventDefault();
        setIsValidDelete(true);
        await axios.delete(`${server()}/tasks/${id}`).then((response) => {
            console.log(response.status);
            setIsValidDelete(false);
            getTasks();
            handleCloseDelete();
        }).catch((error) => {
            console.log(error);
        });
    }

    // Renderizado del Componente
    // El componente renderiza un formulario para crear tareas, una tabla para listar las tareas y modales para actualizar y eliminar tareas.
    return (
        <Container className="mt-5">
            <h1>Tasks</h1>
            <Row>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="bi bi-list-task"></i></InputGroup.Text>
                            <Form.Control type="text" aria-label="Task name" placeholder="Task name" name="name" defaultValue={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} required />
                            {' '}
                            <InputGroup.Text><i className="bi bi-calendar2-check"></i></InputGroup.Text>
                            <Form.Control type="date" title="Begin date" aria-label="Begin date" name="beginDate" defaultValue={moment(task.beginDate).format('YYYY-MM-DD')} onChange={(e) => setTask({ ...task, beginDate: moment(e.target.value).valueOf() })} required />
                            {' '}
                            <InputGroup.Text><i className="bi bi-calendar2-check-fill"></i></InputGroup.Text>
                            <Form.Control type="date" title="End date" aria-label="End date" name="endDate" defaultValue={moment(task.endDate).format('YYYY-MM-DD')} onChange={(e) => setTask({ ...task, endDate: moment(e.target.value).valueOf() })} required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Select aria-label="Status" name="status" defaultValue={task.status.id} onChange={(e) => setTask({ ...task, status: { id: e.target.value } })} required>
                                <option value="">Status</option>
                                {status.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
                            </Form.Select>

                            <Form.Select aria-label="Priority" name="priority" defaultValue={task.priority.id} onChange={(e) => setTask({ ...task, priority: { id: e.target.value } })} required>
                                <option value="1">Priority</option>
                                {priorities.map((priority) => <option key={priority.id} value={priority.id}>{priority.name}</option>)}
                            </Form.Select>
                        </InputGroup>

                        <InputGroup>
                            <Form.Control as="textarea" placeholder="Task description" defaultValue={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} aria-label="Task description" />
                        </InputGroup>

                        <Button type="submit" variant="primary" className="mt-3" disabled={isValid}>Save task</Button>
                    </Form>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Table size="sm" responsive striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Begin date</th>
                                <th>End date</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <td>{index + 1}</td>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{moment(task.beginDate).format('YYYY-MM-DD')}</td>
                                    <td>{moment(task.endDate).format('YYYY-MM-DD')}</td>
                                    <td>{task.status.name}</td>
                                    <td>{task.priority.name}</td>
                                    <td>
                                        <Button variant="outline-secondary" size="sm" onClick={() => getTask(task.id)} >Edit</Button>{' '}
                                        <Button variant="danger" size="sm" onClick={() => handleShowDelete(task.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update tasks</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={onUpdate}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="bi bi-list-task"></i></InputGroup.Text>
                            <Form.Control type="text" aria-label="Task name" placeholder="Task name" name="name" defaultValue={taskUpdate.name} onChange={(e) => setTaskUpdate({ ...taskUpdate, name: e.target.value })} required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="bi bi-calendar2-check"></i></InputGroup.Text>
                            <Form.Control type="date" title="Begin date" aria-label="Begin date" name="beginDate" defaultValue={moment(taskUpdate.beginDate).format('YYYY-MM-DD')} onChange={(e) => setTaskUpdate({ ...taskUpdate, beginDate: moment(e.target.value).valueOf() })} required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="bi bi-calendar2-check-fill"></i></InputGroup.Text>
                            <Form.Control type="date" title="End date" aria-label="End date" name="endDate" defaultValue={moment(taskUpdate.endDate).format('YYYY-MM-DD')} onChange={(e) => setTaskUpdate({ ...taskUpdate, endDate: moment(e.target.value).valueOf() })} required />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Select aria-label="Status" name="status" defaultValue={taskUpdate.status.id} onChange={(e) => setTaskUpdate({ ...taskUpdate, status: { id: e.target.value } })} required>
                                <option value="">Status</option>
                                {status.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
                            </Form.Select>

                            <Form.Select aria-label="Priority" name="priority" defaultValue={taskUpdate.priority.id} onChange={(e) => setTaskUpdate({ ...taskUpdate, priority: { id: e.target.value } })} required>
                                <option value="1">Priority</option>
                                {priorities.map((priority) => <option key={priority.id} value={priority.id}>{priority.name}</option>)}
                            </Form.Select>
                        </InputGroup>

                        <InputGroup>
                            <Form.Control as="textarea" placeholder="Task description" defaultValue={taskUpdate.description} onChange={(e) => setTaskUpdate({ ...taskUpdate, description: e.target.value })} aria-label="Task description" />
                        </InputGroup>

                        <Button type="submit" variant="success" className="mt-3" disabled={isValidUpdate}>Save changes</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas placement="end" show={showDelete} onHide={handleCloseDelete}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Confirm delete task</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Are you sure you want to delete this task?</p>
                    <Form onSubmit={onDelete}>
                        <Button type="submit" variant="danger" className="mt-3" disabled={isValidDelete}>Yes, delete</Button>{' '}
                        <Button variant="secondary" className="mt-3" onClick={handleCloseDelete}>Close</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};
export default Tasks;