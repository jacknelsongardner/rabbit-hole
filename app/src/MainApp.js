import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar } from './SquareList.js';
import SideBar from './SideBar.js';
import Popup from './Popup.js';

import FruitPage from './FruitPage.js';

import React, { useState } from 'react';


const MainApp = ({setLoggedIn}) => {
  const [page, setPage] = useState('food'); // Use useState to manage page state

  const logout = () => {
    setLoggedIn(false); // Set loggedIn to false when logging out
  }

  return (


    <div>
      <SideBar 
        items={['dashboard', 'food', 'map', 'ai']} 
        onItemClick={(selectedPage) => setPage(selectedPage)} 
        setLoggedIn={logout} 
      />

      {page === "food" ? (
        <FruitPage/>
      ) : null}
    </div>
  );
}

export default MainApp;