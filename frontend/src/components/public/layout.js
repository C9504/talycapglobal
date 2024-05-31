import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <Navbar collapseOnSelect expand="lg" data-bs-theme="light" className="custom-navbar bg-body-tertiary p-3" sticky="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src="/logo.png"
                            width="40"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        TalycapGlobal Test
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link as={Link} to={"/"} href="#">Home</Nav.Link> */}
                            <Nav.Link as={Link} to={"/tasks"} href="#">Tasks</Nav.Link>
                        </Nav>
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-3"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to={"/shopping"} href="#">{/*<i className="bi bi-bag" style={{ fontSize: '20px', alignContent: 'center' }}></i>*/} Shopp</Nav.Link>
                            {/* <Nav.Link as={Link} to={"/my-purchases"} href="#">My purchases</Nav.Link> */}
                            <Nav.Link as={Link} to={"/cart"} href="#" className="btn-light btn-sm position-relative" disabled={true}>
                                <i className="bi bi-person-circle"></i>{' '}
                                Account
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <Outlet />
            </main>
        </>
    );

}
export default Layout;