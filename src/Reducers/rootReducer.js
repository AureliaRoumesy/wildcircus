import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import artistReducer from './artistReducer';

const rootReducer = combineReducers({
  artist: artistReducer,
  token: tokenReducer,
});

export default rootReducer;
