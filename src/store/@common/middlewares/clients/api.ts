import axios from 'axios';

const baseURL = 'https://altiore.herokuapp.com/v1';
// const baseURL = 'http://localhost:3000/v1';

export const api = axios.create({
  baseURL,
  responseType: 'json',
  // withCredentials: true,
});
