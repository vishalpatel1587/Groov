import { takeLatest, all } from "redux-saga/effects";
import {
  CREATE_TEAM_BEGIN,
  GET_COMPANY_BY_ID_BEGIN,
  GET_TEAMS_BY_COMPANY_ID_BEGIN,
  CREATE_RITUAL_BEGIN,
  UPDATE_RITUAL_BEGIN,
  DELETE_RITUAL_BEGIN,
  GET_RITUALS_BEGIN,
  GET_COMPANY_RITUAL_BY_COMPANY_ID_BEGIN,
  EDIT_TEAM_BEGIN,
  GET_TEAM_MEMBERS_BEGIN,
  DELETE_TEAM_MEMBER_BEGIN,
  CREATE_TEAM_MEMBER_BEGIN,
} from "../actions/actions";
import { company } from "./CompanySaga";
import {
  TeamsByCompanyId,
  CreateTeam,
  CompanyRitualByCompanyId,
  EditTeam,
  GetTeamMembers,
  DeleteTeamMember,
  CreateTeamMember,
} from "./TeamsSaga";
import {
  GetRituals,
  CreateRitual,
  UpdateRitual,
  DeleteRitual,
} from "./RitualSaga";

export default function* rootSaga() {
  yield all([
    takeLatest(CREATE_TEAM_BEGIN, CreateTeam),
    takeLatest(EDIT_TEAM_BEGIN, EditTeam),
    takeLatest(GET_TEAM_MEMBERS_BEGIN, GetTeamMembers),
    takeLatest(CREATE_TEAM_MEMBER_BEGIN, CreateTeamMember),
    takeLatest(DELETE_TEAM_MEMBER_BEGIN, DeleteTeamMember),
    takeLatest(GET_COMPANY_BY_ID_BEGIN, company),
    takeLatest(GET_TEAMS_BY_COMPANY_ID_BEGIN, TeamsByCompanyId),
    takeLatest(
      GET_COMPANY_RITUAL_BY_COMPANY_ID_BEGIN,
      CompanyRitualByCompanyId
    ),
    takeLatest(GET_RITUALS_BEGIN, GetRituals),
    takeLatest(CREATE_RITUAL_BEGIN, CreateRitual),
    takeLatest(UPDATE_RITUAL_BEGIN, UpdateRitual),
    takeLatest(DELETE_RITUAL_BEGIN, DeleteRitual),
  ]);
}
