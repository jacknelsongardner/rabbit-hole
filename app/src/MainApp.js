import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar } from './SquareList.js';
import SideBar from './SideBar.js';
import BookBar from './BookBar.js';

import Popup from './Popup.js';

import FruitPage from './FruitPage.js';

import React, { useState } from 'react';


const MainApp = ({setLoggedIn}) => {
  const [page, setPage] = useState('food'); // Use useState to manage page state
  const [threads, setThreads] = useState(['dashboard', 'food', 'map', 'ai']);

  const [two, setTwo] = useState(['hahahaha', 'food', 'map', 'ai']);


  const [bookmarks, setBookmarks] = useState(['food', 'map', 'ai']);

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
        items={threads} 
        onItemClick={(selectedPage) => setPage(selectedPage)} 
        setLoggedIn={logout} 
        setItems={setThreads}
      />

      {page === "food" ? (
        <FruitPage/>
      ) : null}

      

    </div>
  );
}

export default MainApp;