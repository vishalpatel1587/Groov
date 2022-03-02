import { ApiRequest } from './request';

export const companyApi = async (data) => {
  const config = {
    url: `/company/${data.id}`,
    method: 'GET'
  };
  const result = await ApiRequest(config);
  return result;
};

export const TeamsByCompanyIdApi = async ({limit,offset,orderBy,companyId}) => {
  const config = {
    url: `/company/${companyId}/teams?limit=${limit}&offset=${offset}&sortBy=name&orderBy=${orderBy}`,
    method: 'GET'
  };
  const result = await ApiRequest(config);
  return result;
};
export const CompanyRitualByCompanyIdApi = async ({limit,offset,orderBy,companyId}) => {
  const config = {
    url: `/company/${companyId}/company-rituals?active=true&limit=${limit}&offset=${offset}&sortBy=name&orderBy=${orderBy}`,
    method: 'GET'
  };
  const result = await ApiRequest(config);
  return result;
};

export const CreateTeamApi = async (data) => {
  const config = {
    url: `/team`,
    method: 'POST',
    data:data
  };
  const result = await ApiRequest(config);
  return result;
};

export const GetRitualsApi = async (teamId) => {
  const config = {
    url: `/team/${teamId}`,
    method: 'GET'
  };
  const result = await ApiRequest(config);
  return result;
};

export const CreateRitualApi = async ({trigger, action, frequency, teamId}) => {
  const dataToSend = { trigger, action, frequency, teamId };
  const config = {
    url: `/ritual`,
    method: 'POST',
    data: dataToSend
  };

  const result = await ApiRequest(config);
  return result;
};

export const UpdateRitualApi = async ({ data, id }) => {
  const config = {
    url: `/ritual/${id}`,
    method: 'PUT',
    data: data
  };
  const result = await ApiRequest(config);
  return result;
};

export const DeleteRitualApi = async (data) => {
  const config = {
    url: `/ritual/${data.id}`,
    method: 'DELETE'
  };
  const result = await ApiRequest(config);
  return result;
};
