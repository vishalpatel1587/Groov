import axios from 'axios';

const BASE_URL = 'http://13.234.145.170:3000/ritual-builder';
//const BASE_URL = process.env.REACT_APP_API_URL

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
