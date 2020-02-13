import * as types from '../constants/ActionTypes';
import { v4 } from 'node-uuid';

export const addUser = (firstName, lastName, phone, gender, age) => {
  return {
    type: types.ADD_USER,
    id: v4(),
    firstName, 
    lastName, 
    phone, 
    gender, 
    age
  };
}

export const deleteUser = (id) => {
  return {
    type: types.DELETE_USER,
    id
  };
}
