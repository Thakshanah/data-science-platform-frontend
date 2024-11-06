import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  Button,
  Card,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
    { id: 4, name: "Task 4", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleTaskChange = (e, task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTask) {
      return;
    }
    setTasks([
      ...tasks,
      { id: tasks.length + 1, name: newTask, completed: false },
    ]);
    setNewTask("");
  };

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center mb-4">Task Management</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleNewTaskSubmit}>
              <FormControl placeholder="Task Title" className="mb-3" />
              <FormControl placeholder="Task Description" className="mb-3" />
              <Button variant="primary">Assign Task</Button>
            </Form>
          </Col>
          <Col md={6}>
            <ListGroup>
              {tasks.map((task) => (
                <ListGroupItem
                  key={task.id}
                  className={task.completed ? "completed" : ""}
                >
                  <Form.Check
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => handleTaskChange(e, task)}
                    label={task.name}
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
            <Form onSubmit={handleNewTaskSubmit}>
              <input
                type="text"
                placeholder="New task"
                value={newTask}
                onChange={handleNewTaskChange}
              />
              <Button type="submit">Add task</Button>
            </Form>
            <h4 className="text-center">Assigned Tasks</h4>
            <ul>
              <li>Task 1</li>
              <li>Task 2</li>
              <li>Task 3</li>
              <li>Task 4</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TaskManagement;
