import { get } from 'axios';
const baseUrl = 'https://node-hnapi.herokuapp.com';

export const fetchStories = (type, page) =>
  get(`${baseUrl}/${type}?page=${page}`);
