// AppRouter.js
import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/component/home';
import TracksPlaylist from './page/component/detailplaylist/[trackPlaylist_id]';
import HeaderIndex from './page/component/headerIndex';
import TracksPlay from './page/component/trackPlay';
import LyricPlaylist from './page/component/detailplaylist/[lyricPlaylist_id]';
import InforSingleTrack from './page/component/inforSingleTrack';
export const AudioContext = createContext();

const AppRouter = () => {
  const [trackAudio, setTrackAudio] = useState(null);
  const [infor, setInfor] = useState([]);
  const [openInforSingle, setOpenInforSingle] = useState(false);

  const routerApp = [
    {
      state: "home",
      url: "/",
      name: "Home",
      element: <Homepage statusInfor={openInforSingle} />
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
        value={{ trackAudio, setTrackAudio, infor, setInfor, openInforSingle, setOpenInforSingle }}
      >
        <HeaderIndex statusInfor={openInforSingle}/>

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
        {infor.length > 0 && <InforSingleTrack dataInfor={infor} />}
        <TracksPlay
          value={trackAudio}
          dataInfor={infor}
        />
      </AudioContext.Provider>
    </div>
  );
}

export default AppRouter;
