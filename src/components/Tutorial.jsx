import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useState } from "react";
// import { Img } from "react-image";
// import { Video } from "react-video";
// import navigationScreenshot from `${process.env.PUBLIC_URL}/img/Tutorial/navigationScreenshot.png`;
// import agentInteractionVideo from `${process.env.PUBLIC_URL}/videos/Tutorial/donation demonstration.mp4`;
// import taskManagementScreenshot from `${process.env.PUBLIC_URL}img/Tutorial/taskmanagementScreenshot.png`;

import navigationScreenshot from "../assets/images/Tutorial/navigationScreenshot.png";
import taskManagementScreenshot from "../assets/images/Tutorial/taskmanagementScreenshot.png";
import agentInteractionVideo from "../assets/videos/Tutorial/donation demonstration.mp4";
import { Image } from "react-bootstrap";

function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Tutorial</h2>
          {currentStep === 1 && (
            <>
              <h3>Step 1: Navigating the Platform</h3>
              <p>
                In this step, we will show you how to navigate the platform and
                access different sections.
              </p>
              <p>
                To navigate the platform, use the navigation bar at the top of
                the page. From here, you can access the different sections of
                the platform, such as the task management and student progress
                sections.
              </p>
              <Container xl={12}>
                {/* <Img
                  src={require("../assets/images/Tutorial/navigationScreenshot.png")}
                  alt="An image"
                /> */}
                <Image
                  src={navigationScreenshot}
                  alt="Screenshot of platform navigation"
                  className="img-fluid img-thumbnail"
                />
              </Container>

              <Button onClick={() => setCurrentStep(2)}>Next</Button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Container sm={12}>
                <h3>Step 2: Interacting with Agents</h3>
                <p>
                  In this step, we will show you how to interact with the agents
                  and perform different actions.
                </p>
                <p>
                  To interact with the agents, click on the "Interact" button in
                  the navigation bar. Here you can type in your message and send
                  it to the agent to receive a response.
                </p>
                <video src={agentInteractionVideo} controls />
              </Container>
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
              <Button onClick={() => setCurrentStep(3)}>Next</Button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <h3>Step 3: Managing Tasks</h3>
              <p>
                In this step, we will show you how to manage tasks and monitor
                student progress.
              </p>
              <img
                src={taskManagementScreenshot}
                alt="Screenshot of task management"
              />
              <Button onClick={() => setCurrentStep(2)}>Back</Button>
              <Button onClick={() => setCurrentStep(1)}>Start Over</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default Tutorial;
