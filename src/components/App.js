import React from 'react';
import UserForm from './UserForm';
import { Container } from 'react-bootstrap';
import UsersList from '../containers/UsersList';

function App() {
  return (
    <div className="App">
      <Container>
        <UserForm />
        <UsersList />
      </Container>    
    </div>
  );
}

export default App;
