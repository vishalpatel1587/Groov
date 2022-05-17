import { put, call } from "redux-saga/effects";
import {
  GET_TEAMS_BY_COMPANY_ID_SUCCESS,
  GET_TEAMS_BY_COMPANY_ID_FAILURE,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  CREATE_RITUAL_BEGIN,
  GET_COMPANY_RITUAL_BY_COMPANY_ID_FAILURE,
  GET_COMPANY_RITUAL_BY_COMPANY_ID_SUCCESS,
  EDIT_TEAM_SUCCESS,
  EDIT_TEAM_FAILURE,
} from "../actions/actions";
import {
  TeamsByCompanyIdApi,
  CreateTeamApi,
  CompanyRitualByCompanyIdApi,
  EditTeamApi,
} from "../../services/api";
import { ToasterUtils } from "../../components/Toaster/ToasterUtils";
import history from "../../utils/history";

export function* TeamsByCompanyId(action) {
  try {
    const response = yield call(TeamsByCompanyIdApi, action.payload);
    if (response) {
      yield put({
        type: GET_TEAMS_BY_COMPANY_ID_SUCCESS,
        payload: response.data,
      });
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data);
    yield put({
      type: GET_TEAMS_BY_COMPANY_ID_FAILURE,
      payload: error.response?.data,
    });
  }
}

export function* CreateTeam(action) {
  try {
    const response = yield call(CreateTeamApi, action.payload);
    if (response) {
      yield put({
        type: CREATE_TEAM_SUCCESS,
        payload: response.data,
      });
      const { team } = response.data;
      history.push(`${history.location.pathname}/success?id=${team.id}`);
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: CREATE_TEAM_FAILURE,
      payload: error.response?.data,
    });
  }
}
export function* CompanyRitualByCompanyId(action) {
  try {
    const response = yield call(CompanyRitualByCompanyIdApi, action.payload);
    if (response) {
      yield put({
        type: GET_COMPANY_RITUAL_BY_COMPANY_ID_SUCCESS,
        payload: response.data,
      });
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data);
    yield put({
      type: GET_COMPANY_RITUAL_BY_COMPANY_ID_FAILURE,
      payload: error.response?.data,
    });
  }
}

export function* EditTeam(action) {
  try {
    const response = yield call(EditTeamApi, action.payload);
    if (response) {
      yield put({
        type: EDIT_TEAM_SUCCESS,
        payload: response.data,
      });
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: EDIT_TEAM_FAILURE,
      payload: error.response?.data,
    });
  }
}
