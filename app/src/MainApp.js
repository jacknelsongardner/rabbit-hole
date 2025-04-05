import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar, VideoList, Video, SquareListItem } from './SquareList.js';
import SideBar from './SideBar.js';
import BookBar from './BookBar.js';

import SearchResults from './SearchResults.js';

import Popup from './Popup.js';

import FruitPage from './FruitPage.js';

import React, { useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';



const MainApp = ({setLoggedIn}) => {


  
  const [topic, setTopic] = useState(''); // Use useState to manage page state

  const [age, setAge] = useState(18); // Use useState to manage search state

  const [threads, setThreads] = useState({
    
  });
  

  

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);

  const [bookmarks, setBookmarks] = useState(
    [
      
    ]
  );

  // Initialize cookiess
  const [cookies, setCookie] = useCookies(['topic', 'threads', 'bookmarks']);

  React.useEffect(() => {
    if (cookies.topic) setTopic(cookies.topic);
  
    // Safely parse cookies. If parsing fails, set default values
    try {
      if (cookies.threads) setThreads(JSON.parse(cookies.threads));
    } catch (e) {
      console.error('Error parsing threads cookie', e);
      setThreads({ woodworking: [] }); // Provide a fallback empty structure
    }
  
    try {
      if (cookies.bookmarks) setBookmarks(JSON.parse(cookies.bookmarks));
    } catch (e) {
      console.error('Error parsing bookmarks cookie', e);
      setBookmarks([]); // Provide a fallback empty array
    }
  }, []);  

  React.useEffect(() => {
    // Handle saving data to cookies, ensuring it's valid JSON
    try {
      setCookie('topic', topic, { path: '/' });
      setCookie('threads', JSON.stringify(threads), { path: '/' });
      setCookie('bookmarks', JSON.stringify(bookmarks), { path: '/' });
    } catch (e) {
      console.error('Error saving cookies', e);
    }
  }, [topic, threads, bookmarks]);

  const onPlusClick = (title) => {
    setPopupVisible(true);
    setPopupChildren(
      <div>
      <SearchResults 
        age={age} 
        topic={topic} 
        addItem={(item) => {
        setThreads((prevItems) => ({
          ...prevItems,
          [topic]: [...prevItems[topic], item]
        }))
        }}
      />
      </div>
    );
    };

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

  const onDeleteThreadClick = (item) => {
    setThreads((prevItems) => {
      const newItems = { ...prevItems };
      delete newItems[item];
      return newItems;
    });
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
            onDeleteClick={onDeleteThreadClick}
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
            list={Object.keys(threads).includes(topic) ? threads[topic] : []}
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