import * as types from '../constants/ActionTypes';

const users = (state = [], action) => {
  switch (action.type) {
    case types.ADD_USER:
      return [
        ...state,
        {
          id: action.id,
          firstName: action.firstName, 
          lastName: action.lastName, 
          phone: action.phone, 
          gender: action.gender == 'true' ? true : false, 
          age: +action.age
        }
      ]
    case types.DELETE_USER:
      return state.filter(user => user.id !== action.id);       
    default:
      return state
  }
}
export default users;