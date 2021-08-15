import {
  GET_TEAMS_BY_COMPANY_ID_BEGIN,
  GET_TEAMS_BY_COMPANY_ID_SUCCESS,
  GET_TEAMS_BY_COMPANY_ID_FAILURE,
  CREATE_TEAM_BEGIN,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE
} from '../actions/actions';

const initialState = {
  data: { teams: [], loading: false, error: '' },
  team: { loading: false, error: '', rituals: [] },
  createTeam: { loading: false, error: '' }
};
const TeamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS_BY_COMPANY_ID_BEGIN:
      return { ...state, data: { ...state.data, loading: true } };
    case GET_TEAMS_BY_COMPANY_ID_SUCCESS:
      return {
        ...state,
        data: { ...action.payload, loading: false }
      };
    case GET_TEAMS_BY_COMPANY_ID_FAILURE:
      return { ...state, data: { error: action.payload, loading: false } };

    // CREATE TEAM
    case CREATE_TEAM_BEGIN:
      return { ...state, createTeam: { loading: true } };
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        createTeam: { ...action.payload, loading: false }
      };
    case CREATE_TEAM_FAILURE:
      return {
        ...state,
        createTeam: { error: action.payload, loading: false }
      };

    default:
      return state;
  }
};

export default TeamsReducer;
