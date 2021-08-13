import { put, call } from 'redux-saga/effects';
import {
  GET_COMPANY_BY_ID_SUCCESS,
  GET_COMPANY_BY_ID_FAILURE
} from '../actions/actions';
import { companyApi } from '../../services/api';

export function* company(action) {
  try {
    const response = yield call(companyApi, action.payload);
    if (response) {
      yield put({
        type: GET_COMPANY_BY_ID_SUCCESS,
        payload: response.data
      });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: GET_COMPANY_BY_ID_FAILURE,
      payload: error.response.data
    });
  }
}
