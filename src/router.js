// AppRouter.js
import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/component/home';
import TracksPlaylist from './page/component/detailplaylist/[trackPlaylist_id]';
import HeaderIndex from './page/component/headerIndex';
import TracksPlay from './page/component/trackPlay';
import LyricPlaylist from './page/component/detailplaylist/[lyricPlaylist_id]';
export const AudioContext = createContext();

const AppRouter = () => {
  const [trackAudio, setTrackAudio] = useState(null);
  console.log("trackAudio:::", trackAudio)

  const routerApp = [
    {
      state: "home",
      url: "/",
      name: "Home",
      element: <Homepage />
    },
    // {
    //   state: "Track playlist",
    //   url: "/tracks-playlist",
    //   name: "Tracks playlist",
    //   element: <TracksPlaylist />
    // }
  ]
  return (
    <div className="app">
      <AudioContext.Provider
        value={{ trackAudio, setTrackAudio }}
      >
        <HeaderIndex />

        <Routes>
          {routerApp.map((router) => {
            return (
              <Route key={router.name} path={router.url} element={router.element} />
            )
          })}
          <Route path="/tracks-playlist">
            <Route path=":trackPlaylist_id" element={<TracksPlaylist />} />
          </Route>
          <Route path="/lyric-playlist">
            <Route path=":lyricPlaylist_id" element={<LyricPlaylist />} />
          </Route>
        </Routes>
        <TracksPlay
          value={trackAudio}
        />
      </AudioContext.Provider>
    </div>
  );
}

export default AppRouter;
