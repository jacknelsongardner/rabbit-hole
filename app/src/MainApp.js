import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar, VideoList, Video, SquareListItem } from './SquareList.js';
import SideBar from './SideBar.js';
import BookBar from './BookBar.js';



import Popup from './Popup.js';

import FruitPage from './FruitPage.js';

import React, { useState } from 'react';

import axios from 'axios';


const MainApp = ({setLoggedIn}) => {


  
  const [topic, setTopic] = useState('woodworking'); // Use useState to manage page state

  const [age, setAge] = useState(18); // Use useState to manage search state


  const [threads, setThreads] = useState({
    woodworking: [
      {
        id: 1,
        title: 'Overview',
        subtitle: 'System overview and main metrics',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      },
      {
        id: 2,
        title: 'Stats',
        subtitle: 'Detailed statistics and analytics',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      },
      {
        id: 3,
        title: 'Settings',
        subtitle: 'System configuration and preferences',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      }
    ]
  });
  
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);

  const [bookmarks, setBookmarks] = useState(
    [
      {
        id: 1,
        title: 'Overview',
        subtitle: 'System overview and main metrics',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      },
      {
        id: 2,
        title: 'Stats',
        subtitle: 'Detailed statistics and analytics',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      },
      {
        id: 3,
        title: 'Settings',
        subtitle: 'System configuration and preferences',
        url: 'https://www.youtube.com/embed/eqogbWHoOHs'
      }
    ]
  );



  const onPlusClick = (title) => {
    
  }

  const addBookMarkClick = (item) => {
    setBookmarks((prevItems) => [...prevItems, item]);
  }

  const deleteVideoItem = (item) => {
    setThreads((prevItems) => {
      const newItems = { ...prevItems };
      const currentThread = newItems[topic];
      newItems[topic] = currentThread.filter((i) => i.id !== item.id);
      return newItems;
    });
  }

  const onAddThreadClick = () => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
        <h2>Add New Thread</h2>
        <input 
          type="text" 
          placeholder="Enter thread name"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              addThread(e.target.value.trim());
              setPopupVisible(false);
            }
          }}
        />
        <p>Press Enter to add thread</p>
      </div>
    );
  };

  const addThread = (item) => {
    setThreads((prevItems) => ({
      ...prevItems,
      [item]: []
    }));
  };

  const onBookMarkClick = (item) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
        <h1>{item.title}</h1>
        <div className="video-container">
            <iframe 
                width="560" 
                height="300" 
                src={item.url} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            />
        </div>
        <p>{item.subtitle}</p>
      </div>
    );
    console.log('Bookmark clicked:', item, popupVisible);
  }

  const onVideoClick = (item) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
      <h1>{item.title}</h1>
      <div className="video-container">
        <iframe 
          width="840" 
          height="450" 
          src={item.url} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>
      <p>{item.subtitle}</p>
      </div>
    );
  };

  const logout = () => {
    setLoggedIn(false); // Set loggedIn to false when logging out
  }

  return (
    <div className="app-container">
      <ul>
        <li>
          {/* Only render Popup when popupVisible is true */}
          {popupVisible && (
              <Popup isVisible={popupVisible} setIsVisible={setPopupVisible}>
              {popupChildren}
              </Popup>
            )}

          <SideBar 
            items={Object.keys(threads)} 
            onItemClick={(selectedPage) => setTopic(selectedPage)} 
            setLoggedIn={logout} 
            onAddClick={onAddThreadClick}
          />
        </li>
        <li>
          <BookBar 
            items={bookmarks} 
            onItemClick={onBookMarkClick} 
            setItems={setBookmarks}
          />
        </li>
        <li>
          <VideoList 
            list={threads[topic]}
            filterFunction={null}
            onVideoClick={onVideoClick}
            onPlusClick={onPlusClick}
            onBookMarkClick={addBookMarkClick}
            onDeleteClick={deleteVideoItem}
          />
        </li>
      </ul>
    </div>
  );
}

export default MainApp;