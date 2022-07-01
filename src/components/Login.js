import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Login({ onUserNameSubmit }) {
  const userName = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUserNameSubmit(userName.current.value);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '120vh' }}
    >
      <h1> Welcome to ChatApp</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select your username</Form.Label>
          <Form.Control type="text" ref={userName} required />
        </Form.Group>

        <Button type="submit" className="mr-2">
          Join
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
