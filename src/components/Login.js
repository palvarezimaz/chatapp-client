import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
// import { Socket as socket } from 'socket.io-client';
import io from 'socket.io-client';

function Login({ onUserNameSubmit }) {
  const socket = io('http://localhost:3002');
  socket.on('connect', () => console.log(`Hola ${socket.id}`));

  const userName = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUserNameSubmit(userName.current.value);

    const loggedUser = userName.current.value;
    socket.auth = { userName };
    // socket.auth = { loggedUser };
    socket.connect();
    socket.emit('Welcome Message', loggedUser);

    socket.on('disconnect', () => 'server disconnected');
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
