import axios from 'axios';

const BASE_URL = 'http://44.225.108.113:3000/ritual-builder';

export const ApiRequest = async (config) => {
  const headers = {};
  const newConfig = {
    baseURL: BASE_URL,
    headers,
    ...config
  };
  return axios(newConfig).then((res) => {
    console.log('Response', res);
    return res;
  });
};
