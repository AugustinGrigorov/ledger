import { combineReducers } from 'redux';
import user from './user';
import assets from './assets';

export default combineReducers({
  user,
  assets,
});
