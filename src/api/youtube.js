import axios from 'axios';
import YoutubeClient from './YoutubeClient';

export default class Youtube extends YoutubeClient {
  constructor() {
    super();
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API },
    });
  }

  async searchVideoByKeyword(keyword) {
    return this.httpClient
      .get('/search', {
        params: {
          part: 'snippet',
          q: keyword,
          maxResults: 25,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })))
      .catch((e) => console.log(`error: ${e}`));
  }

  async searchPopularVideo() {
    return this.httpClient
      .get('/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
        },
      })
      .then((res) => res.data.items)
      .catch((e) => console.log(`error: ${e}`));
  }
  async searchChannelById(channelId) {
    return this.httpClient
      .get('/channels', {
        params: { part: 'snippet', id: channelId },
      })
      .then((res) => res.data.items)
      .then((items) => items[0])
      .catch((e) => console.log(`error: ${e}`));
  }
}
