import axios from 'axios';
import YoutubeClient from './YoutubeClient';

export default class FakeYoutube extends YoutubeClient {
  constructor() {
    super();
    this.mockKeywordFile = '/videos/videos.json';
    this.mockPopularFile = '/videos/popular.json';
    this.mockChannelFile = '/videos/channelInfo.json';
  }

  async searchVideoByKeyword(keyword) {
    return axios
      .get(this.mockKeywordFile)
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })))
      .catch((e) => console.log(`error: ${e}`));
  }

  async searchPopularVideo() {
    return axios
      .get(this.mockPopularFile)
      .then((res) => res.data.items)
      .catch((e) => console.log(`error: ${e}`));
  }

  async searchChannelById(channelId) {
    return axios
      .get(this.mockChannelFile)
      .then((res) => res.data.items)
      .then((items) => items[0])
      .catch((e) => console.log(`error: ${e}`));
  }
}
