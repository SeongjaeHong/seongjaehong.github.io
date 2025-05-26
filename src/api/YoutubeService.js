export default class YoutubeService {
  constructor(client) {
    this.client = client;
  }

  async searchVideo(keyword) {
    return keyword
      ? this.client.searchVideoByKeyword(keyword)
      : this.client.searchPopularVideo();
  }

  async searchChannel(channelId) {
    return this.client.searchChannelById(channelId);
  }
}
