import {
  GET_COMPANY_BY_ID_BEGIN,
  GET_COMPANY_BY_ID_SUCCESS,
  GET_COMPANY_BY_ID_FAILURE
} from '../actions/actions';

const initialState = {
  error: '',
  loading: false
};
const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_BY_ID_BEGIN:
      return { ...state, loading: true };
    case GET_COMPANY_BY_ID_SUCCESS:
      return {
        ...action.payload,
        loading: false
      };
    case GET_COMPANY_BY_ID_FAILURE:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export default CompanyReducer;
