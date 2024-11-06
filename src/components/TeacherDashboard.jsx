import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const TeacherDashboard = () => {
  // State to store student performance data
  const [studentData, setStudentData] = useState([]);

  // State to store teacher-controlled parameters
  const [parameters, setParameters] = useState({});

  // Fetch student data and parameters from the server
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/student-data");
      const data = await res.json();
      setStudentData(data);
    };

    const fetchParameters = async () => {
      const res = await fetch("/api/parameters");
      const params = await res.json();
      setParameters(params);
    };

    fetchData();
    fetchParameters();
  }, []);

  // Function to handle updates to the parameters
  const handleParameterChange = (event) => {
    const { name, value } = event.target;
    setParameters({ ...parameters, [name]: value });
  };

  // Function to handle submission of updated parameters to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/api/update-parameters", {
      method: "POST",
      body: JSON.stringify(parameters),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Teacher Dashboard</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Agent speed</Form.Label>
              <Form.Control
                type="number"
                name="agentSpeed"
                value={parameters.agentSpeed || ""}
                onChange={handleParameterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Agent density</Form.Label>
              <Form.Control
                type="number"
                name="agentDensity"
                value={parameters.agentDensity || ""}
                onChange={handleParameterChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Student Performance</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDashboard;
