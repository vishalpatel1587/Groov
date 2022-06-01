import axios from "axios";

 const BASE_URL = 'https://ritualsapi.test.groovnow.com/ritual-builder';
//const BASE_URL = process.env.REACT_APP_API_URL;

export const ApiRequest = async (config) => {
  const headers = {};
  const newConfig = {
    baseURL: BASE_URL,
    headers,
    ...config,
  };
  return axios(newConfig).then((res) => {
    return res;
  });
};
