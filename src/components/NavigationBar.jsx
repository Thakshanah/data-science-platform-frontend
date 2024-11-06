import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({ user, onLogout }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">My Game</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link" to="/Teacherdashboard">Teacher Dashboard</Link>
          <Link className="nav-link" to="/TaskManagement">Task Management</Link>
          
        </Nav>
        {user ? (
          <>
            <span className="navbar-text mr-3">Welcome, {user.username}</span>
            <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}


      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
