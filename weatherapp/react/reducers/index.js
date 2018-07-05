import { combineReducers } from 'redux';

import  AppDataReducer  from './app_data_reducer';

const rootReducer = combineReducers({
   appDataReducer: AppDataReducer,
 });

export default rootReducer;