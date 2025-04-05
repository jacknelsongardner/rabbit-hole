import logo from './logo.svg';
import './App.css';


import { SquareList, SearchBar, VideoList, Video, SquareListItem } from './SquareList.js';
import SideBar from './SideBar.js';
import BookBar from './BookBar.js';

import SearchResults from './SearchResults.js';

import Popup from './Popup.js';

import React, { useState } from 'react';

import axios from 'axios';



const MainApp = ({setLoggedIn}) => {


  const [topic, setTopic] = useState(''); // Use useState to manage page state

  const [threads, setThreads] = useState({
    
  });
  
  const [loadSafe, setLoadSafe] = useState(false);
  

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupChildren, setPopupChildren] = useState(<div></div>);

  const [bookmarks, setBookmarks] = useState(
    [
      
    ]
  );

  
  
  React.useEffect(() => {
    const savedTopic = localStorage.getItem('topic') || '';
    const savedThreads = JSON.parse(localStorage.getItem('threads')) || {};
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    console.log('Loading from localStorage:', { savedTopic, savedThreads, savedBookmarks });
    
    setTopic(savedTopic);
    setThreads(savedThreads);
    setBookmarks(savedBookmarks);

    setLoadSafe(true);
  }, []);

  React.useEffect(() => {
    if (loadSafe) {
      console.log('Saving to localStorage:', { topic, threads, bookmarks });
      localStorage.setItem('topic', topic);
      localStorage.setItem('threads', JSON.stringify(threads));
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [topic, threads, bookmarks, loadSafe]);

  const onPlusClick = () => {
    setPopupVisible(true);
    console.log(threads);
  
    const safeLast = (threads.topic && threads.topic.length > 0)
    ? threads.topic[threads.topic.length - 1]
    : "";

    console.log('Safe last:', safeLast);
  
    setPopupChildren(
      <div>
        <SearchResults 
          last={safeLast}
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
    const deepEqual = (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b);
    };

    setThreads((prevItems) => {
      const newItems = { ...prevItems };
      const currentThread = newItems[topic];
  
      newItems[topic] = currentThread.filter((i) => !deepEqual(i, item));
  
      return newItems;
    });
  };

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
    popupProxyYoutubeChoice(item);
  }

  const onVideoClick = (item) => {
    popupProxyYoutubeChoice(item);
  };

  const popupProxyYoutubeChoice = (item) => {

    setPopupVisible(true);
    setPopupChildren(
      <div>
      <h2>Choose how to watch</h2>
      <button style={{
          backgroundColor: "green",
          border: '2px solid #39ff14',
          color: 'white',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
          }} 
          className="proxy-button" 
          onClick={() => openLinkProxy(item)}>Watch via Proxy
      </button>

      <button style={{
          backgroundColor: 'red',
          border: 'none', 
          color: 'white',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
          }}
          className="youtube-button"
          onClick={() => openLinkYoutube(item)}>Watch on YouTube
      </button>

      <p>Note: YouTube will expose your IP address to Google. The proxy is more private but may be less reliable.</p>
      </div>
    );
  }

  

  const openLinkProxy = (item) => {
    window.open(
      "https://id.420129.xyz/embed/" + item.url,
      '_blank',
      'width=840,height=480,menubar=no,toolbar=no,location=no,status=no,scrollbars=no'
    );
  }

  const openLinkYoutube = (item) => {
    window.open(
      "https://www.youtube.com/embed/" + item.url,
      '_blank',
      'width=840,height=480,menubar=no,toolbar=no,location=no,status=no,scrollbars=no'
    );
  }

  const onDeleteThreadClick = (item) => {
    setThreads((prevItems) => {
      const newItems = { ...prevItems };
      delete newItems[item];
      return newItems;
    });
  }



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
            topic ={topic}
          />
        </li>
      </ul>
    </div>
  );
}

export default MainApp;