import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import AddUser from '../containers/AddUser';

function UserForm (){
        return (
            <Row>
                <Col>
                    <h2>Users Form</h2>
                    <AddUser />
                </Col>
                <Col>
                <Jumbotron>
                    <h3>Hello!</h3>
                    <p>
                        You can add a user to the table, please fill all fields
                    </p>
                </Jumbotron>
                </Col>
            </Row>
        )
    
}

export default UserForm;