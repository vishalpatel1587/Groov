import { TOGGLE_USER_ADMIN_ACCESS } from "../actions/actions";

interface AccessState {
  admin: boolean;
}

const initialState: AccessState = {
  admin: false,
};

const AccessReducer = (state: AccessState = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_USER_ADMIN_ACCESS:
      return {
        ...state,
        admin: !!action?.payload?.hasAdminAccess,
      };
    default:
      return state;
  }
};

export default AccessReducer;
