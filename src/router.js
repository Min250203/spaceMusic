// AppRouter.js
import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/component/home';
import TracksPlaylist from './page/component/detailplaylist/[trackPlaylist_id]';
import HeaderIndex from './page/component/headerIndex';
import TracksPlay from './page/component/trackPlay';
import LyricPlaylist from './page/component/detailplaylist/[lyricPlaylist_id]';
import InforSingleTrack from './page/component/inforSingleTrack';
import MainSearch from './page/component/detailSearch/mainSearch';
import InforSingleSearch from './page/component/detailSearch/[inforSingleSearch_id]';
export const AudioContext = createContext();

const AppRouter = () => {
  const [trackAudio, setTrackAudio] = useState(null);
  const [infor, setInfor] = useState({});
  const [openInforSingle, setOpenInforSingle] = useState(false);
  const [indexSong, setIndexSong] = useState(null);
  const [status, setStatus] = useState(false);
  const [allTracks, setAllTracks] = useState([]);
  const [dataValueSearch, setDataValueSearch] = useState({});
  const [albums, setAlbums] = useState([]);
  const [typePlaylist, setTypePlaylist] = useState("homePlaylist");

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
        value={{
          trackAudio, setTrackAudio,
          infor, setInfor,
          openInforSingle, setOpenInforSingle,
          indexSong, setIndexSong,
          status, setStatus,
          allTracks, setAllTracks,
          dataValueSearch, setDataValueSearch,
          albums, setAlbums,
          typePlaylist, setTypePlaylist
        }}
      >
        <HeaderIndex statusInfor={openInforSingle} />

        <Routes>
          {routerApp.map((router) => {
            return (
              <Route key={router.name} path={router.url} element={router.element} />
            )
          })}
          <Route path="/playlist">
            <Route path=":playlist_id" element={<TracksPlaylist
              currentIndex={indexSong}
              statusBtn={status}
              typePlaylist = {typePlaylist}
            />} />
          </Route>
          <Route path="/lyric">
            <Route path=":lyric_id" element={<LyricPlaylist />} />
          </Route>
          <Route path="/search">
            <Route path=":search_id" element={<MainSearch dataValueSearch={dataValueSearch} />} />
          </Route>
          <Route path="/artist">
            <Route path=":artist_id" element={<InforSingleSearch dataValueSearch={dataValueSearch} albums={albums} />} />
          </Route>
        </Routes>
        {Object.keys(infor).length > 0 && <InforSingleTrack dataInfor={infor} />}
        <TracksPlay
          value={trackAudio}
          dataInfor={infor}
          currentIndex={indexSong}
          dataAllTracks={allTracks}
        />
      </AudioContext.Provider>
    </div>
  );
}

export default AppRouter;
