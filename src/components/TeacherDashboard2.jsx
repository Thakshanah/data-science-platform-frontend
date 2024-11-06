import React, { useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
import HelpAndSupport from "./HelpAndSupport";

const TeacherDashboard2 = () => {
  const [activeTab, setActiveTab] = useState("home");

  const [agentCount, setAgentCount] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [agentParams, setAgentParams] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // send agentCount, stepCount, and agentParams to the backend to update the simulation
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [agentsData, setAgentsData] = useState([
    { id: 1, name: "John Doe", role: "Agent", behavior: "Aggressive" },
    { id: 2, name: "Jane Smith", role: "Agent", behavior: "Passive" },
    { id: 3, name: "Bob Johnson", role: "Agent", behavior: "Neutral" },
  ]);
  return (
    <div>
      <Tabs activeKey={activeTab} onSelect={handleTabChange}>
        <Tab eventKey="home" title="Home">
          <h2>Welcome to the Teacher Dashboard</h2>
          <p>
            Here you can manage and change the behavior of the agents in the
            game
          </p>
        </Tab>
        <Tab eventKey="manage" title="Manage Agents">
          <h3>Manage Agents</h3>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Behavior</th>
              </tr>
            </thead>
            <tbody>
              {agentsData.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.name}</td>
                  <td>{agent.role}</td>
                  <td>{agent.behavior}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>
            Use this tab to add, edit, and remove agents in the game. You can
            also change their parameters and behaviors.
          </p>
        </Tab>
        <Tab eventKey="analytics" title="View Analytics">
          <h3>View Analytics</h3>
          <p>Use this tab to view statistics and analytics</p>
        </Tab>
        <Tab eventKey="help" title="Help">
          <HelpAndSupport />
        </Tab>
      </Tabs>

      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Control Panel</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formAgentCount">
                    <Form.Label>Number of Agents</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of agents"
                    />
                  </Form.Group>
                  <Form.Group controlId="formStepCount">
                    <Form.Label>Number of Steps</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of steps"
                    />
                  </Form.Group>
                  <Form.Group controlId="formAgentParams">
                    <Form.Label>Agent Parameters</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter agent parameters"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Agent Visualization</Card.Header>
              <Card.Body>
                <div>Add Agent Visualization Component Here</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Control Panel</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formAgentCount">
                    <Form.Label>Number of Agents</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of agents"
                      value={agentCount}
                      onChange={(e) => setAgentCount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formStepCount">
                    <Form.Label>Number of Steps</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of steps"
                      value={stepCount}
                      onChange={(e) => setStepCount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAgentParams">
                    <Form.Label>Agent Parameters</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter agent parameters"
                      value={agentParams}
                      onChange={(e) => setAgentParams(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default TeacherDashboard2;
