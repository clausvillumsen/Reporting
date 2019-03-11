import { combineReducers } from 'redux';
import report from 'screens/Home/redux/reducer';
import loading from './loading.reducer';

const rootReducer = combineReducers({
  loading,
  report
});

export default rootReducer;
