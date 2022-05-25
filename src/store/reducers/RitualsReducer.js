/* eslint-disable no-case-declarations */
import {
  GET_RITUALS_BEGIN,
  GET_RITUALS_FAILURE,
  GET_RITUALS_SUCCESS,
  CREATE_RITUAL_BEGIN,
  CREATE_RITUAL_FAILURE,
  CREATE_RITUAL_SUCCESS,
  DELETE_RITUAL_BEGIN,
  DELETE_RITUAL_FAILURE,
  DELETE_RITUAL_SUCCESS,
  UPDATE_RITUAL_BEGIN,
  UPDATE_RITUAL_FAILURE,
  UPDATE_RITUAL_SUCCESS,
  EDIT_TEAM_BEGIN,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAILURE,
  GET_TEAM_MEMBERS_BEGIN,
  GET_TEAM_MEMBERS_SUCCESS,
  GET_TEAM_MEMBERS_FAILURE,
  DELETE_TEAM_MEMBER_BEGIN,
  DELETE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER_FAILURE,
  CREATE_TEAM_MEMBER_BEGIN,
  CREATE_TEAM_MEMBER_SUCCESS,
  CREATE_TEAM_MEMBER_FAILURE,
} from "../actions/actions";

const initialState = {
  loading: false,
  error: "",
  data: {},
};

const RitualsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_RITUALS
    case GET_RITUALS_BEGIN:
      return { ...state, loading: true };

    case GET_RITUALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload, loading: false },
      };

    case GET_RITUALS_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    // CREATE_RITUALS
    case CREATE_RITUAL_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CREATE_RITUAL_SUCCESS:
      const rituals = (state.data.rituals || []).concat(action.payload.ritual);
      return {
        ...state,
        data: {
          ...state.data,
          rituals,
        },
        loading: false,
      };

    case CREATE_RITUAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE_RITUALS
    case UPDATE_RITUAL_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_RITUAL_SUCCESS:
      const unchangedRituals = (state.data.rituals || []).filter(
        (r) => r.id !== action.payload.ritual.id
      );
      const newRitualsStore = [...unchangedRituals, action.payload.ritual];

      return {
        ...state,
        data: {
          ...state.data,
          rituals: newRitualsStore,
        },
        loading: false,
      };

    case UPDATE_RITUAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE_RITUALS
    case DELETE_RITUAL_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case DELETE_RITUAL_SUCCESS:
      const deletedData = (state.data.rituals || []).filter(
        (item) => item.id !== action.payload.id
      );
      const data = {
        ...state.data,
        rituals: deletedData,
      };

      return {
        ...state,
        loading: false,
        data,
      };

    case DELETE_RITUAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_TEAM_BEGIN:
      return { ...state, loading: true };
    case EDIT_TEAM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.team,
        },
        loading: false,
      };
    case EDIT_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_TEAM_MEMBERS_BEGIN:
      return { ...state, loading: true };
    case GET_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        loading: false,
      };
    case GET_TEAM_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TEAM_MEMBER_BEGIN:
      return { ...state, loading: true };
    case DELETE_TEAM_MEMBER_SUCCESS:
      const teamMembers = state.data.teamMembers.filter(
        (t) => t.id !== action.payload.memberId
      );
      return {
        ...state,
        data: {
          ...state.data,
          teamMembers: teamMembers,
        },
        loading: false,
      };
    case DELETE_TEAM_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_TEAM_MEMBER_BEGIN:
      return { ...state, loading: true };
    case CREATE_TEAM_MEMBER_SUCCESS:
      const members = state.data.teamMembers.concat(action.payload.teamMembers);

      return {
        ...state,
        data: {
          ...state.data,
          teamMembers: members,
        },
        loading: false,
      };
    case CREATE_TEAM_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default RitualsReducer;
