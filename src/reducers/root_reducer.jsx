import { combineReducers } from 'redux';
import authReducer from './auth_reducer';

const RootReducer = combineReducers({
    auth: authReducer,
});

export default RootReducer;

