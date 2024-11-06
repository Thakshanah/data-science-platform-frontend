import React from "react";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";

function HelpAndSupport() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Help and Support</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I create a new task?</Accordion.Header>
              <Accordion.Body>
                To create a new task, click on the "Create Task" button in the
                task management section. Fill in the form with the task details
                and click "Save" to create the task.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                How do I monitor student progress?
              </Accordion.Header>
              <Accordion.Body>
                To monitor student progress, navigate to the "Student Progress"
                section in the teacher dashboard. Here you will be able to see a
                list of students and their progress on the tasks assigned to
                them.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
export default HelpAndSupport;
