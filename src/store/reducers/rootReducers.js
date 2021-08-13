import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import TeamsReducer from './TeamsReducer';
import RitualsReducer from './RitualsReducer';
import { RESET_STORE } from '../actions/actions';

const appReducer = combineReducers({
  company: CompanyReducer,
  teams: TeamsReducer,
  rituals: RitualsReducer
});

export const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};
