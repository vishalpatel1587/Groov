export const GET_COMPANY_BY_ID_BEGIN = "GET_COMPANY_BY_ID_BEGIN";
export const GET_COMPANY_BY_ID_SUCCESS = "GET_COMPANY_BY_ID_SUCCESS";
export const GET_COMPANY_BY_ID_FAILURE = "GET_COMPANY_BY_ID_FAILURE";

export const GET_TEAMS_BY_COMPANY_ID_BEGIN = "GET_TEAMS_BY_COMPANY_ID_BEGIN";
export const GET_TEAMS_BY_COMPANY_ID_SUCCESS =
  "GET_TEAMS_BY_COMPANY_ID_SUCCESS";
export const GET_TEAMS_BY_COMPANY_ID_FAILURE =
  "GET_TEAMS_BY_COMPANY_ID_FAILURE";

export const CREATE_TEAM_BEGIN = "CREATE_TEAM_BEGIN";
export const CREATE_TEAM_SUCCESS = "CREATE_TEAM_SUCCESS";
export const CREATE_TEAM_FAILURE = "CREATE_TEAM_FAILURE";

export const EDIT_TEAM_BEGIN = "EDIT_TEAM_BEGIN";
export const EDIT_TEAM_SUCCESS = "EDIT_TEAM_SUCCESS";
export const EDIT_TEAM_FAILURE = "EDIT_TEAM_FAILURE";

export const GET_TEAM_MEMBERS_BEGIN = "GET_TEAM_MEMBERS_BEGIN";
export const GET_TEAM_MEMBERS_SUCCESS = "GET_TEAM_MEMBERS_SUCCESS";
export const GET_TEAM_MEMBERS_FAILURE = "GET_TEAM_MEMBERS_FAILURE";

export const CREATE_TEAM_MEMBER_BEGIN = "CREATE_TEAM_MEMBER_BEGIN";
export const CREATE_TEAM_MEMBER_SUCCESS = "CREATE_TEAM_MEMBER_SUCCESS";
export const CREATE_TEAM_MEMBER_FAILURE = "CREATE_TEAM_MEMBER_FAILURE";

export const DELETE_TEAM_MEMBER_BEGIN = "DELETE_TEAM_MEMBER_BEGIN";
export const DELETE_TEAM_MEMBER_SUCCESS = "DELETE_TEAM_MEMBER_SUCCESS";
export const DELETE_TEAM_MEMBER_FAILURE = "DELETE_TEAM_MEMBER_FAILURE";

export const GET_RITUALS_BEGIN = "GET_RITUALS_BEGIN";
export const GET_RITUALS_SUCCESS = "GET_RITUALS_SUCCESS";
export const GET_RITUALS_FAILURE = "GET_RITUALS_FAILURE";

export const CREATE_RITUAL_BEGIN = "CREATE_RITUAL_BEGIN";
export const CREATE_RITUAL_SUCCESS = "CREATE_RITUAL_SUCCESS";
export const CREATE_RITUAL_FAILURE = "CREATE_RITUAL_FAILURE";

export const UPDATE_RITUAL_BEGIN = "UPDATE_RITUAL_BEGIN";
export const UPDATE_RITUAL_SUCCESS = "UPDATE_RITUAL_SUCCESS";
export const UPDATE_RITUAL_FAILURE = "UPDATE_RITUAL_FAILURE";

export const DELETE_RITUAL_BEGIN = "DELETE_RITUAL_BEGIN";
export const DELETE_RITUAL_SUCCESS = "DELETE_RITUAL_SUCCESS";
export const DELETE_RITUAL_FAILURE = "DELETE_RITUAL_FAILURE";

export const RESET_STORE = "RESET_STORE";

export const GET_COMPANY_RITUAL_BY_COMPANY_ID_BEGIN =
  "GET_COMPANY_RITUAL_BY_COMPANY_ID_BEGIN";
export const GET_COMPANY_RITUAL_BY_COMPANY_ID_SUCCESS =
  "GET_COMPANY_RITUAL_BY_COMPANY_ID_SUCCESS";
export const GET_COMPANY_RITUAL_BY_COMPANY_ID_FAILURE =
  "GET_COMPANY_RITUAL_BY_COMPANY_ID_FAILURE";

export const resetStore = () => ({
  type: RESET_STORE,
});

export const getCompanyById = (id) => ({
  type: GET_COMPANY_BY_ID_BEGIN,
  payload: { id },
});

export const getTeamsByCompanyId = (limit, offset, orderBy, companyId) => ({
  type: GET_TEAMS_BY_COMPANY_ID_BEGIN,
  payload: { limit, offset, orderBy, companyId },
});
export const getCompanyRitualByCompanyId = (
  limit,
  offset,
  orderBy,
  companyId
) => ({
  type: GET_COMPANY_RITUAL_BY_COMPANY_ID_BEGIN,
  payload: { limit, offset, orderBy, companyId },
});

export const createTeam = (data) => ({
  type: CREATE_TEAM_BEGIN,
  payload: data,
});

export const editTeam = (teamId, data) => ({
  type: EDIT_TEAM_BEGIN,
  payload: { teamId, data },
});

export const getTeamMembers = (teamId) => ({
  type: GET_TEAM_MEMBERS_BEGIN,
  payload: teamId,
});

export const createTeamMember = (teamId, data) => ({
  type: CREATE_TEAM_MEMBER_BEGIN,
  payload: { teamId, data },
});

export const deleteTeamMember = (teamId, memberId) => ({
  type: DELETE_TEAM_MEMBER_BEGIN,
  payload: { teamId, memberId },
});

export const getRituals = (teamId) => ({
  type: GET_RITUALS_BEGIN,
  payload: teamId,
});

export const createRitual = (data) => ({
  type: CREATE_RITUAL_BEGIN,
  payload: data,
});

export const updateRitual = (data, id, onClosePageCallback) => ({
  type: UPDATE_RITUAL_BEGIN,
  payload: { data, id, onClosePageCallback },
});

export const deleteRitual = (id) => ({
  type: DELETE_RITUAL_BEGIN,
  payload: { id },
});
