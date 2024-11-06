import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', { username, password });
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully!') {
        navigate('/login');
      }
    } catch (err) {
      setMessage('Error registering user');
    }
  };

  return (
    <Container>
      <h2>Signup</h2>
      {message && <p className="text-danger">{message}</p>}
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Signup</Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
