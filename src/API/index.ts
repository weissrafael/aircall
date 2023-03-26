import axios from 'axios';

export default class Api {
  api: any;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: false,
    });
  }

  async getActivities() {
    return this.api.get('/activities');
  }
}
