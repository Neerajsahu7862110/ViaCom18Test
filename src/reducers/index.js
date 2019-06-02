import { combineReducers } from 'redux';
import appReducer from './AppReducer';

const rootReducer = combineReducers({
  appData: appReducer
});

export default rootReducer;
