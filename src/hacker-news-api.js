import { get } from 'axios';
const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const fetchStories = type => get(`${baseUrl}/${type}stories.json`);

export const fetchStory = id => get(`${baseUrl}/item/${id}.json`);
