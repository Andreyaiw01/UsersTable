import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../actions/UsersActions'
import PropTypes from 'prop-types';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            gender: '',
            age: '',
            fnameValid: false,
            lnameValid: false,
            phoneValid: false,
            genderValid: true,
            ageValid: false,
            formValid: false
        }
    }

    handleSubmit = event => {
        
        event.preventDefault();        
        this.props.addUser( 
            event.target.firstName.value,
            event.target.LastName.value,
            event.target.phone.value,
            event.target.gender.value,
            event.target.age.value
            );
        this.setState({
            fname: '',
            lname: '',
            phone: '',
            gender: '',
            age: '',
            fnameValid: false,
            lnameValid: false,
            phoneValid: false,
            genderValid: true,
            ageValid: false,
            formValid: false
        },this.validateForm);

        event.target.firstName.classList.remove("is-valid");
        event.target.LastName.classList.remove("is-valid");
        event.target.phone.classList.remove("is-valid");
        event.target.gender.classList.remove("is-valid");
        event.target.age.classList.remove("is-valid");        
    };

    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        const event = e.target;
        this.setState( 
                { [name]: value }, 
                ()=>{this.validateField(event, name, value)}
            );        
    };

    validateField(e, fieldName, value) {
        switch(fieldName) {
            case 'fname':
                if(value.match(/[^a-zA-Z]+/g) || value.length === 0) {
                    this.setState({fnameValid: false}, this.validateForm);
                    e.classList.add("is-invalid");
                    e.classList.remove("is-valid");
                } else {
                    this.setState({fnameValid: true}, this.validateForm);
                    e.classList.add("is-valid");
                    e.classList.remove("is-invalid");
                }
                break;
            case 'lname':
                if(value.match(/[^a-zA-Z]+/g) || value.length === 0) {
                    this.setState({lnameValid: false}, this.validateForm);
                    e.classList.add("is-invalid");
                    e.classList.remove("is-valid");
                } else {
                    this.setState({lnameValid: true}, this.validateForm);
                    e.classList.add("is-valid");
                    e.classList.remove("is-invalid");
                }
                break;
            case 'phone':
                if(value.match(/[^0-9]+/g) || value.length === 0) {
                    this.setState({phoneValid: false}, this.validateForm);
                    e.classList.add("is-invalid");
                    e.classList.remove("is-valid");
                } else {
                    this.setState({phoneValid: true}, this.validateForm);
                    e.classList.add("is-valid");
                    e.classList.remove("is-invalid");
                }
                break;                
            case 'age':
                if(value.length === 0 || value < 0 ) {
                    this.setState({ageValid: false}, this.validateForm);
                    e.classList.add("is-invalid");
                    e.classList.remove("is-valid");
                } else {
                    this.setState({ageValid: true}, this.validateForm);
                    e.classList.add("is-valid");
                    e.classList.remove("is-invalid");
                }
                break;             
            default:
                break;
        };
        
    };

    validateForm = () => {
        this.setState({formValid: 
            this.state.fnameValid &&
            this.state.lnameValid &&
            this.state.phoneValid &&
            this.state.ageValid 
        });
    };

    render(){
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                        required
                        value={this.state.fname}
                        onChange={this.changeHandler}
                        type="text"
                        name='fname' 
                        placeholder="Enter First name"
                    />               
                    <Form.Control.Feedback type="invalid">
                        Required field! Only latin letters are allowed.(a-zA-Z)
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="LastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required
                        value={this.state.lname}
                        onChange={this.changeHandler}
                        type="text"
                        name='lname' 
                        placeholder="Enter Last Name" 
                    />
                    <Form.Control.Feedback type="invalid">
                        Required field! Only latin letters are allowed.(a-zA-Z)
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>                    
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        required
                        value={this.state.phone}
                        onChange={this.changeHandler}
                        type="tel"
                        name='phone' 
                        placeholder="Enter Phone" 
                    />
                    <Form.Control.Feedback type="invalid">
                        Required field! Only numbers allowed (0-9)
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>                    
                </Form.Group>
                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control 
                        required
                        onChange={this.changeHandler}
                        name='gender' 
                        as="select">
                        <option value={true}>Man</option>
                        <option value={false}>Woman</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Required field!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>                     
                </Form.Group>
                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control 
                        required
                        value={this.state.age}
                        onChange={this.changeHandler}
                        type="number"
                        name='age'
                        placeholder="Enter Age" 
                    />
                    <Form.Control.Feedback type="invalid">
                        Required field! Only numbers allowed (0-9)
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>                     
                </Form.Group>
                <Button variant="primary" type='submit' disabled={!this.state.formValid}>
                    Add User
                </Button>
            </Form>
        )      
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {addUser}, 
        dispatch
    )
}

export default connect(null, mapDispatchToProps)(AddUser);

AddUser.propTypes = {
    addUser: PropTypes.func,
};