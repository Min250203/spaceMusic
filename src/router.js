// AppRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/home';
import TracksPlaylist from './page/component/detailplaylist/[trackPlaylist_id]';
import LyricPlaylist from './page/component/detailplaylist/[lyricPlaylist_id]';

const AppRouter = () => {
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
    </div>
  );
}

export default AppRouter;
