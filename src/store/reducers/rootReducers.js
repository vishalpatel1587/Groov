import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import expireIn from "redux-persist-transform-expire-in";
import CompanyReducer from "./CompanyReducer";
import TeamsReducer from "./TeamsReducer";
import RitualsReducer from "./RitualsReducer";
import AccessReducer from "./AccessReducer";
import { RESET_STORE } from "../actions/actions";

const expiresIn = 30 * 60 * 1000; // 30 minutes
const key = "access";

const persistConfig = {
  key,
  storage,
  transforms: [expireIn(expiresIn, key, false)],
};

const appReducer = combineReducers({
  company: CompanyReducer,
  teams: TeamsReducer,
  rituals: RitualsReducer,
  access: persistReducer(persistConfig, AccessReducer),
});

export const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};
