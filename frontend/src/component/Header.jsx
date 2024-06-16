import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Mynotes from "../MyNotes/Mynotes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetUser } from "../Store/authSlice";



const Header = () => {

  const  navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  
 
  

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Nano Notes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </nav>

          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>

            {user ? (
              <NavDropdown title={user.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">My profile </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action3"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                    dispatch(resetUser());
                  }}
                >
                  Logout{" "}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
