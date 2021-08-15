import {
  GET_TEAMS_BY_COMPANY_ID_BEGIN,
  GET_TEAMS_BY_COMPANY_ID_SUCCESS,
  GET_TEAMS_BY_COMPANY_ID_FAILURE,
  CREATE_TEAM_BEGIN,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE
} from '../actions/actions';

const initialState = {
  loading: false,
  error: '',
  data: [],
};
const TeamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS_BY_COMPANY_ID_BEGIN:
      return { ...state, loading: true,};
    case GET_TEAMS_BY_COMPANY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_TEAMS_BY_COMPANY_ID_FAILURE:
      return { ...state, loading: false,  error: action.payload, data: []};

    // CREATE TEAM
    case CREATE_TEAM_BEGIN:
      return { ...state, loading:true, };
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default TeamsReducer;
