import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar, VideoList, Video, SquareListItem } from './SquareList.js';
import SideBar from './SideBar.js';
import BookBar from './BookBar.js';

import Popup from './Popup.js';

import FruitPage from './FruitPage.js';

import React, { useState } from 'react';


const MainApp = ({setLoggedIn}) => {
  const [page, setPage] = useState('food'); // Use useState to manage page state
  const [threads, setThreads] = useState(['dashboard', 'food', 'map', 'ai']);
  
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);

  const [bookmarks, setBookmarks] = useState(['food', 'map', 'ai']);

  const [videoItems, setVideoItems] = useState()

  const onPlusClick = (url) => {
    console.log(url);
  }
  const onVideoClick = (item) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
        <h1>{item.title}</h1>
        <Video url={item.url} />
        <p>{item.subtitle}</p>
      </div>
    );
  };

  const logout = () => {
    setLoggedIn(false); // Set loggedIn to false when logging out
  }

  return (
    <div>
      <SideBar 
        items={threads} 
        onItemClick={(selectedPage) => setPage(selectedPage)} 
        setLoggedIn={logout} 
        setItems={setThreads}
      />

      <BookBar 
        items={bookmarks} 
        onItemClick={(selectedPage) => setPage(selectedPage)} 
        setItems={setBookmarks}
      />

      {page === "food" ? (
        <VideoList 
          list={videoItems}
          filterFunction={null}
          onVideoClick={onVideoClick}
          onPlusClick={onPlusClick}
        ></VideoList>
      ) : null}
    </div>
  );
}

export default MainApp;