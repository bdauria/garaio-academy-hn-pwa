import { get } from 'axios';
const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const fetchStories = () => get(`${baseUrl}/topstories.json`);

export const fetchStory = id => get(`${baseUrl}/item/${id}.json`);
