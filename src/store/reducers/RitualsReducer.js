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
  UPDATE_RITUAL_SUCCESS
} from '../actions/actions';

const initialState = {
  data: { rituals: [], loading: false, error: '' },
  create: { error: '', loading: false },
  update: { error: '', loading: false },
  delete: { error: '', loading: false }
};

const RitualsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_RITUALS
    case GET_RITUALS_BEGIN:
      return { ...state, data: { ...state.data, loading: true } };

    case GET_RITUALS_SUCCESS:
      return {
        ...state,
        data: { ...action.payload.team, loading: false }
      };

    case GET_RITUALS_FAILURE:
      return {
        ...state,
        data: { rituals: [], error: action.payload, loading: false }
      };

    // CREATE_RITUALS
    case CREATE_RITUAL_BEGIN:
      return {
        ...state,
        create: { loading: true }
      };

    case CREATE_RITUAL_SUCCESS:
      return {
        ...state,
        create: { ...state.create, ...action.payload, loading: false }
      };

    case CREATE_RITUAL_FAILURE:
      return { ...state, create: { error: action.payload, loading: false } };

    // UPDATE_RITUALS
    case UPDATE_RITUAL_BEGIN:
      return {
        ...state,
        update: { loading: true }
      };

    case UPDATE_RITUAL_SUCCESS:
      return {
        ...state,
        update: { ...state.create, ...action.payload, loading: false }
      };

    case UPDATE_RITUAL_FAILURE:
      return { ...state, update: { error: action.payload, loading: false } };

    // DELETE_RITUALS
    case DELETE_RITUAL_BEGIN:
      return {
        ...state,
        delete: { loading: true }
      };

    case DELETE_RITUAL_SUCCESS:
      const deletedData = state.data.rituals.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        data: { rituals: [...deletedData], loading: false },
        delete: { loading: false }
      };

    case DELETE_RITUAL_FAILURE:
      return { ...state, delete: { error: action.payload, loading: false } };

    default:
      return state;
  }
};

export default RitualsReducer;
