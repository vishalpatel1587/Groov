import { takeLatest, all } from 'redux-saga/effects';
import {
  CREATE_TEAM_BEGIN,
  GET_COMPANY_BY_ID_BEGIN,
  GET_TEAMS_BY_COMPANY_ID_BEGIN,
  CREATE_RITUAL_BEGIN,
  UPDATE_RITUAL_BEGIN,
  DELETE_RITUAL_BEGIN,
  GET_RITUALS_BEGIN
} from '../actions/actions';
import { company } from './CompanySaga';
import { TeamsByCompanyId, CreateTeam } from './TeamsSaga';
import {
  GetRituals,
  CreateRitual,
  UpdateRitual,
  DeleteRitual
} from './RitualSaga';

export default function* rootSaga() {
  yield all([
    takeLatest(CREATE_TEAM_BEGIN, CreateTeam),
    takeLatest(GET_COMPANY_BY_ID_BEGIN, company),
    takeLatest(GET_TEAMS_BY_COMPANY_ID_BEGIN, TeamsByCompanyId),
    takeLatest(GET_RITUALS_BEGIN, GetRituals),
    takeLatest(CREATE_RITUAL_BEGIN, CreateRitual),
    takeLatest(UPDATE_RITUAL_BEGIN, UpdateRitual),
    takeLatest(DELETE_RITUAL_BEGIN, DeleteRitual)
  ]);
}
