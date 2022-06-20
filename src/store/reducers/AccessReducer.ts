import { TOGGLE_USER_ADMIN_ACCESS } from "../actions/actions";

interface AccessState {
  admin: boolean;
  emailAddress: string;
}

const initialState: AccessState = {
  admin: false,
  emailAddress: "",
};

const AccessReducer = (state: AccessState = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_USER_ADMIN_ACCESS:
      return {
        ...state,
        admin: Boolean(action?.payload?.hasAdminAccess),
        emailAddress: action?.payload?.emailAddress,
      };
    default:
      return state;
  }
};

export default AccessReducer;
