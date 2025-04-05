// FilterableSquareList.js
import React, { useState } from 'react';
import './SquareList.css';


  




const SearchBar = ({ query, onQueryChange }) => (
    <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
    />
);



const Video = ({ videoLink }) => {
    // Extract the video ID from a YouTube URL if it's a YouTube link
    
    const videoUrl = videoLink;
  
    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '400px', 
        height: '300px',
        backgroundColor: '#000', 
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <iframe
          src={videoUrl}
          title="Video Example"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    );
  };
  


const VideoList = ({ list, onVideoClick, onPlusClick, onBookMarkClick, onDeleteClick, topic}) => {
    const [query, setQuery] = useState('');
    return (
        <div className="filterable-wrapper" style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <div className="video-list">
                {list.map(item => (
                    <div key={item.id} className="video-container">
                        <div style={{ 
                            pointerEvents: 'none', 
                            width: '100%',
                            maxWidth: '600px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img src={item.img} />
                        </div>
                        <div className="button-container">
                            <button onClick={() => onVideoClick(item)}>
                                Play
                            </button>
                            <button onClick={() => onBookMarkClick(item)}>
                                Bookmark
                            </button>
                            <button onClick={() => onDeleteClick(item)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                <button 
                    className="add-button" 
                    onClick={() => onPlusClick(topic)}
                >
                    <span style={{ color: 'white', fontSize: '24px' }}>+</span>
                </button>
            </div>
        </div>
    );
};

export {  SearchBar, Video, VideoList };
