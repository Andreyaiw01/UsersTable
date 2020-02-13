import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '../actions/UsersActions';
import PropTypes from 'prop-types';

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortUsers: this.props.users,
            sortActiveColumn: false,     
            sortIndexFname: false,
            sortIndexLname: false,
            sortIndexPhone: false,
            sortIndexGender: false,
            sortIndexAge: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.users !== prevProps.users) {
          this.setState({sortUsers: this.props.users})
        }
      }

    handleDelete = (e) => {
        this.props.deleteUser(e.target.id);       
    };
    
    handleSort = (e) => {
        let { sortIndexFname, 
            sortIndexLname, 
            sortIndexPhone, 
            sortIndexGender, 
            sortIndexAge } = this.state;

            let sortUsers = this.props.users.sort((a,b)=>{
            switch(e.target.id) {
                case 'fname':
                    if(sortIndexFname){ 
                        this.setState({sortIndexFname: !sortIndexFname});
                        return a.firstName > b.firstName ? 1 : -1;           
                    } 
                    if(!sortIndexFname){
                        this.setState({sortIndexFname: !sortIndexFname});
                        return a.firstName > b.firstName ? -1 : 1; 
                    }                
                break;
                case 'lname':
                    if(sortIndexLname){ 
                        this.setState({sortIndexLname: !sortIndexLname});
                        return a.lastName > b.lastName ? 1 : -1;           
                    } 
                    if(!sortIndexLname){
                        this.setState({sortIndexLname: !sortIndexLname});
                        return a.lastName > b.lastName ? -1 : 1; 
                    }                
                break;
                case 'phone':
                    if(sortIndexPhone){ 
                        this.setState({sortIndexPhone: !sortIndexPhone});
                        return a.phone > b.phone ? 1 : -1;           
                    } 
                    if(!sortIndexPhone){
                        this.setState({sortIndexPhone: !sortIndexPhone});
                        return a.phone > b.phone ? -1 : 1; 
                    }                
                break;
                case 'gender':
                    if(sortIndexGender){ 
                        this.setState({sortIndexGender: !sortIndexGender});
                        return a.gender > b.gender ? 1 : -1;           
                    } 
                    if(!sortIndexGender){
                        this.setState({sortIndexGender: !sortIndexGender});
                        return a.gender > b.gender ? -1 : 1; 
                    }                
                break;                                                               
                case 'age':
                    if(sortIndexAge){ 
                        this.setState({sortIndexAge: !sortIndexAge});
                        return a.age - b.age;           
                    }
                    if(!sortIndexAge){ 
                        this.setState({sortIndexAge: !sortIndexAge});
                        return b.age - a.age;           
                    }                    
                break;
                default:
                    break;
            }
            
        });
        if(sortUsers) {this.setState({sortUsers: sortUsers});}
        
    }; 

    render(){
        return (
            <>
                <hr/>
                <Row>
                    <h4>{this.props.users.length } User(s) </h4>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className='sortItemColumn' id='fname' onClick={this.handleSort}>First Name <FontAwesomeIcon icon={faSort} /></th>
                                <th className='sortItemColumn' id='lname' onClick={this.handleSort}>Last Name <FontAwesomeIcon icon={faSort} /></th>
                                <th className='sortItemColumn' id='phone' onClick={this.handleSort}>Phone <FontAwesomeIcon icon={faSort} /></th>
                                <th className='sortItemColumn' id='gender' onClick={this.handleSort}>Gender <FontAwesomeIcon icon={faSort} /></th>
                                <th className='sortItemColumn' id='age' onClick={this.handleSort}>Age <FontAwesomeIcon icon={faSort} /></th>
                                <th>Manage Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.sortUsers.length ?
                                this.state.sortUsers.map(user => {
                                    return(
                                        <tr key={user.id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender ? 'Man' : 'Woman'}</td>
                                            <td>{user.age}</td>
                                            <td><Button id={user.id} onClick={this.handleDelete} variant="danger" size="sm"><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button></td>
                                        </tr>  
                                    );
                                }) : <tr><td colSpan='6'>No data</td></tr>
                            }
                        </tbody>
                    </Table>
                </Row>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {deleteUser}, 
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

UsersList.propTypes = {
    users: PropTypes.array,
    deleteUser: PropTypes.func,
};