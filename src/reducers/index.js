import { combineReducers } from 'redux';
import usersRedusers  from './usersRedusers';

const reducer = combineReducers({
    users: usersRedusers
});

export default reducer;