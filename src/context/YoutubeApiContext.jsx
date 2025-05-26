import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import FakeYoutube from '../api/fakeYoutube';
import YoutubeService from '../api/YoutubeService';

export const YoutubeApiContext = createContext();

// const client = new Youtube();
const client = new FakeYoutube();
const youtube = new YoutubeService(client);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
