import { put, call } from "redux-saga/effects";
import {
  CREATE_RITUAL_SUCCESS,
  CREATE_RITUAL_FAILURE,
  UPDATE_RITUAL_SUCCESS,
  UPDATE_RITUAL_FAILURE,
  DELETE_RITUAL_SUCCESS,
  DELETE_RITUAL_FAILURE,
  GET_RITUALS_FAILURE,
  GET_RITUALS_SUCCESS,
} from "../actions/actions";
import {
  CreateRitualApi,
  DeleteRitualApi,
  GetRitualsApi,
  UpdateRitualApi,
} from "../../services/api";
import history from "../../utils/history";
import { ToasterUtils } from "../../components/Toaster/ToasterUtils";
import { toasterPrompts } from "../../prompts/prompts";

export function* GetRituals(action) {
  try {
    const response = yield call(GetRitualsApi, action.payload);
    if (response) {
      yield put({
        type: GET_RITUALS_SUCCESS,
        payload: response.data.team,
      });
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: GET_RITUALS_FAILURE,
      payload: error.response?.data,
    });
  }
}

export function* CreateRitual(action) {
  try {
    const response = yield call(CreateRitualApi, action.payload);
    if (response) {
      yield put({
        type: CREATE_RITUAL_SUCCESS,
        payload: response.data,
      });
    } else {
      throw response;
    }
    ToasterUtils.toast(
      toasterPrompts.messages.ritual.addRitual,
      "success",
      toasterPrompts.titles.working
    );
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: CREATE_RITUAL_FAILURE,
      payload: error.response?.data,
    });
  }
}

export function* UpdateRitual(action) {
  try {
    const { data, id, onClosePageCallback } = action.payload;
    const response = yield call(UpdateRitualApi, { data, id });
    if (response) {
      yield put({
        type: UPDATE_RITUAL_SUCCESS,
        payload: response.data,
      });

      if (onClosePageCallback) {
        onClosePageCallback();
      }
      ToasterUtils.toast(
        toasterPrompts.messages.ritual.editRitual,
        "success",
        toasterPrompts.titles.working
      );
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: UPDATE_RITUAL_FAILURE,
      payload: error.response?.data,
    });
  }
}

export function* DeleteRitual(action) {
  try {
    const response = yield call(DeleteRitualApi, action.payload);
    if (response) {
      yield put({
        type: DELETE_RITUAL_SUCCESS,
        payload: action.payload,
      });
      ToasterUtils.toast(
        toasterPrompts.messages.ritual.removeRitual,
        "success",
        toasterPrompts.titles.working
      );
    } else {
      throw response;
    }
  } catch (error) {
    ToasterUtils.error(error.response?.data.message);
    yield put({
      type: DELETE_RITUAL_FAILURE,
      payload: error.response?.data,
    });
  }
}
